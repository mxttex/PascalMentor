import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import SignInOrRegister from '@/views/SignInOrRegister.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/',
      name: 'sign-in',
      component: SignInOrRegister,
    }
  ],
})

export default router
