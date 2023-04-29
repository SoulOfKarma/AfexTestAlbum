<template>
  <div>
    <label>Añadir nuevo video</label>
    <n-input-group>
      <n-input placeholder="Añadir" v-model:value="link" />
      <n-button type="info" @click="getDataVideo()"> Añadir </n-button>
    </n-input-group>
  </div>
</template>
<script>
import axios from 'axios';
import { firebaseApp } from "@/main";
import { getFirestore, collection,addDoc,getDocs } from 'firebase/firestore';
import bus from '@/eventBus';
import moment from 'moment';
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      title: '',
      description: '',
      thumbnailUrl: '',
      idyt:'',
      link:"",
      duration:""
    }
  },
  methods: {
    async getDataVideo() {

      //Se formatea y obtiene ID del video de Youtube
      const YOUTUBE_URL_PATTERN =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
      const match = this.link.match(YOUTUBE_URL_PATTERN)

      let res = ''

      if (match && match[7].length === 11) {
        res = match[7]
      } else {
        // En caso de que no se pueda extraer el ID del video, retorna null o arroja una excepción.
        Swal.fire({
          title: 'Error!',
          text: 'El ID de YouTube no es válido',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
        return null
      }

      //Se obtienen datos para guardarlos en Firebase
      
      const key = import.meta.env.VITE_API_KEY

      axios
        .get(`https://www.googleapis.com/youtube/v3/videos?part=id&id=${res}&key=${key}&part=snippet,contentDetails`)
        .then((response) => {
          this.title = response.data.items[0].snippet.title
          this.description = response.data.items[0].snippet.description
          this.thumbnailUrl = `https://i.ytimg.com/vi/${res}/sddefault.jpg`
          this.idyt = res
          const time = response.data.items[0].contentDetails.duration;
          const duration = moment.duration(time);
          const hours = duration.hours()
          const minutes = duration.minutes()
          const seconds = duration.seconds()
          let formatted = ""
          if (hours > 0) {
            formatted += hours + ":"
          }
          formatted += minutes.toString().padStart(2, "0") + ":"
          formatted += seconds.toString().padStart(2, "0")
          this.duration = formatted
          this.validarVideoExistente()
        })
        .catch((error) => {
          Swal.fire({
              title: 'Error!',
              text: 'Error al agregar Video o ID no es correcto',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
          console.log(error)
        })
      
    },
    async setDataFirebase(validarId){
         //Se preparan los datos y se guardan en Firebase.
        const db = getFirestore(firebaseApp);
        const videosRef = collection(db, 'videos');
        try {
          if(validarId==false){
            await addDoc(videosRef, {
                idyt: this.idyt,
                title: this.title,
                description: this.description,
                thumbnailUrl: this.thumbnailUrl,
                linkyt: this.link,
                duration: this.duration
            // ...
            });
            Swal.fire({
              title: 'Finalizado',
              text: 'Video agregado correctamente',
              icon: 'success',
              confirmButtonText: 'Ok'
            })          
            bus.emit('datosGuardados');
          }else{         
              Swal.fire({
              title: 'Error!',
              text: 'Video ya fue ingresado',
              icon: 'warning',
              confirmButtonText: 'Ok'
            })
          }            
        } catch (error) {
            Swal.fire({
              title: 'Error!',
              text: 'Error al agregar Video o ID no es correcto',
              icon: 'error',
              confirmButtonText: 'Ok'
            })
            console.error("Error al agregar Video:", error);
        }
    },
    async validarVideoExistente(){
        //Se Validan datos para que no sean repetidos
        const db = getFirestore(firebaseApp);
        const videosRef = collection(db, 'videos');
        const videosRes = await getDocs(videosRef);
        let validar = false
        videosRes.forEach((doc) => {
            const data = doc.data();
            if(this.idyt == data.idyt){
              validar = true
            }
        })

        if(validar){
          this.setDataFirebase(true)
        }else{
          this.setDataFirebase(false)
        }
    }
  }
}
</script>
<style scoped></style>
