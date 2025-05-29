import { createRouter, createWebHistory } from 'vue-router'
import SignInOrRegister from '@/views/SignInOrRegister.vue'
import Home from '@/views/Home.vue'
import PersonalArea from '@/views/PersonalArea.vue'
import CreaEvento from '@/views/CreaEvento.vue'
import BookRipetition from '@/views/BookRipetition.vue'
import SeeFollowedRipetitions from '@/views/SeeFollowedRipetitions.vue'
import SeeCreatedRipetition from '@/views/SeeCreatedRipetition.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignInOrRegister,
    },
    {
      path: '/create-event',
      name: 'create-event',
      component: CreaEvento,
    },
    {
      path: '/book-ripetition',
      name: 'book-ripetition',
      component: BookRipetition,
    },
    {
      path: '/personal-area',
      name: 'personal-area',
      component: PersonalArea,
    },
    {
      path: '/followed-rip',
      name: 'followed-ripetition',
      component: SeeFollowedRipetitions,
    },
    {
      path: '/created-rip',
      name: 'created-ripetition',
      component: SeeCreatedRipetition,
    },
    
  ],
})

export default router
