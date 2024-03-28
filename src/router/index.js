import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Profile from '../components/Profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profile/:id',
      name: 'Profile',
      component:Profile
    }
  ]
})

export default router
