import { createApp } from 'vue'
import router from './router'
import Album from './views/Album/Album.vue'
import naive from 'naive-ui'
import AddLinkVideo from '@/components/AddLinkVideo.vue'
import PostContainer from '@/components/PostContainer.vue'

import './assets/album.css'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcoBa9Mma8DYJln9bmeU085aK5JsvbUF8",
  authDomain: "prueba-84a94.firebaseapp.com",
  databaseURL: "https://prueba-84a94.firebaseio.com",
  projectId: "prueba-84a94",
  storageBucket: "prueba-84a94.appspot.com",
  messagingSenderId: "599455740465",
  appId: "1:599455740465:web:6105727e703d79c4d81b10"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
const app = createApp(Album)
const firebaseApp = initializeApp(firebaseConfig);
app.use(naive)
app.component('AddLinkVideo', AddLinkVideo)
app.component('PostContainer', PostContainer)
app.use(router)

app.mount('#app')
// Exportar la instancia de Firebase para poder utilizarla en otros archivos
export { firebaseApp };