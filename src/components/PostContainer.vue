<template>
  <div>
    <n-table :bordered="true" :single-line="false">
      <tbody>
        <tr v-for="row in chunkedVideos">
            <td v-for="video in row" :key="video.id">
                <n-card>
                    <template #cover>
                        <img :src="video.thumbnailUrl" @click="abrirDescripcion(video.id,video.thumbnailUrl,video.title,video.description,video.linkyt,video.idyt,video.duration)">
                        <n-button type="error" class="btn-top-right-eliminar" @click="eliminarVideo(video.id)">X</n-button>
                        <div class="duration-container">
                          <p>{{ video.duration }}</p>
                        </div>
                    </template>
                </n-card>            
            </td>
        </tr>
      </tbody>
    </n-table>
    <n-modal
        v-model:show="eliminar"
        preset="dialog"
        content="¿Seguro que quieres eliminar este video?"
        positive-text="Eliminar"
        negative-text="Cancelar"
        @positive-click="onPositiveClick"
        @negative-click="onNegativeClick"
    />
    <n-modal v-model:show="cerrarDescripcion" :style="{background: 'white'}">      
      <div class="modal-container">
        <n-button type="error" class="btn-top-right-eliminar" @click="cerrarDescripcion = false">X</n-button>
        <div class="thumbnail-container">
          <a :href="`https://www.youtube.com/watch?v=${idyt}`" target="_blank">
            <img :src="thumbnailUrl" class="thumbnail" />
            <div class="button-container">
              <font-awesome-icon :icon="['fab', 'youtube']" style="font-size: 3em;"/>
            </div>
          </a>
          <div class="duration-container">
            <p>{{ duration }}</p>
          </div>
        </div>
        <div class="modal-text">
          <h2>{{ title }}</h2>
          <p>{{ descripcion }}</p>
        </div>
      </div>
    </n-modal>
  </div>
</template>
<script>
import { firebaseApp } from "@/main";
import { getFirestore, collection, getDocs} from 'firebase/firestore';
import { doc, deleteDoc } from "firebase/firestore";
import _ from "lodash";
import bus from '@/eventBus';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import Swal from 'sweetalert2'
export default {
  data() {
    return {
      list: [],
      thumbnailUrl:"",
      title:"",
      descripcion:"",
      linkyt:"",
      eliminar:false,
      cerrarDescripcion:false,
      id:"",
      idyt:"",
      duration: ""
    }
  },
  components: {
    FontAwesomeIcon
  },
  computed:{
    chunkedVideos() {
      return _.chunk(this.list, 3);
    }
  },
  methods: {
    //Se crea lista de videos
    async listAlbum(){
        const db = getFirestore(firebaseApp);
        const videosRef = collection(db, 'videos');
        const videosRes = await getDocs(videosRef);
        //this.list = videosRes.docs.map(doc => doc.data());
        videosRes.forEach((doc) => {
            const data = doc.data();
            this.list.push({ id: doc.id, ...data });
        })
    },
    //funcion temporal para abrir modal y confirmar eliminacion
    eliminarVideo(id){
        this.id = id
        this.eliminar = true
    },
    //confirmacion de la eliminacion del video
    async onPositiveClick() {// ...
        const db = getFirestore(firebaseApp);
        const videoRef = doc(db, 'videos', this.id);

        deleteDoc(videoRef)
        .then(() => {
            Swal.fire({
                title: 'Finalizado!',
                text: 'Video eliminado correctamente',
                icon: 'success',
                confirmButtonText: 'Ok'
            })
        })
        .catch((error) => {
            Swal.fire({
                title: 'Error!',
                text: 'Hubo un error al intentar borrar el video, intentelo nuevamente',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
            console.error('Error al eliminar Video: ', error);
        });
        this.eliminar = false;
        setTimeout(() => {
          this.list = []
          this.listAlbum();
      }, 2000);
      },
      //se cancela la eliminacion del video y showModal eliminar pasa a ser false
      onNegativeClick() {
        this.eliminar = false;
      },
      //se cierra ventana de showModal de descripcion
      cerrarVentana(){
        this.cerrarDescripcion = false;
      },
      //se carga la descripcion con sus datos y el modal se cambia a true
      abrirDescripcion(idDoc,thumburl,titulo,descripcion,linkyt,idyt,duration){
        this.id = idDoc
        this.title = titulo
        this.thumbnailUrl = thumburl
        this.descripcion = descripcion
        this.linkyt = linkyt
        this.cerrarDescripcion = true
        this.idyt = idyt
        this.duration = duration
      }
  },
  created() {
    // escucha el evento de datosGuardados
    bus.on("datosGuardados", () => {
      this.list = []
      this.listAlbum();
    });
    
    // llama al método para actualizar la lista de registros al inicio
    this.listAlbum();
  },
  mounted(){
    //se monta icono de youtube
    library.add(faYoutube);
  }
}
</script>
<style scoped>
.n-card {
  max-width: 500px;
}
.btn-top-right-eliminar {
  position: absolute;
  top: 10px;
  right: 10px;
}
.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  border: 1px solid black;
  max-width: 1000px;
}

.modal-image {
  width: 500px;
  max-width: 100% !important;
  height: 150px !important;
  margin-right: 5px;
  margin-top: 30px;
  margin-left: 20px;
  margin-bottom: 30px;
}

.modal-text {
  flex-grow: 1;
  font-size: 10px;
  margin-left: 30px;
  margin-right: 20px;
}
a:focus {
  outline: none;
}
.thumbnail-container {
  position: relative;
  display: inline-block;
  width: 2300px;
  height: 200px;
  margin-right: 5px;
  margin-top: 30px;
  margin-left: 20px;
  margin-bottom: 30px;
}

.button-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.thumbnail {
  width: 100%;
  height: 100%;
  max-width: 900px;
  max-height: 300px;
}

.youtube-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
}

.youtube-button i {
  font-size: 48px;
  color: red;
}
.duration-container {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 4px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 12px;
}
</style>