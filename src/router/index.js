import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Album/Album.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
    /* {
      path: '/album',
      name: 'album',
      component: () => import('../views/Album/album2.vue')
    } */
  ]
})

export default router
