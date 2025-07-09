<script setup lang="ts">
import { provide, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from './components/Navbar.vue'


const userType = ref<UserType>('')  
const userId = ref<string>('')  
const subjects = ref<Subject[]>([])

const API_URL = 'http://localhost:8089/api/'

provide('userType', userType)
provide('userId', userId)
provide('subjects', subjects)

const router = useRouter()

const fetchUserData = async (): Promise<void> => {
  try {
    const response = await fetch(API_URL, { credentials: 'include' })
    if (response.ok) {
      const data = await response.json() as { type: UserType; userId: string }
      userType.value = data.type
      userId.value = data.userId
    } else {
      console.warn('Errore nel recupero dati utente')
    }
  } catch (error) {
    console.error('Errore di rete:', error)
  }
}

const fetchAllSubjects = async (): Promise<void> => {
  try {
    const res = await fetch(`${API_URL}getSubjects`, {
      headers: { 'Content-Type': 'application/json' }
    })
    const data = await res.json() as Subject[]
    subjects.value = data
  } catch (err) {
    console.error('Errore nel caricamento delle materie:', err)
  }
}

const fetchAll = async (): Promise<void> => {
  await fetchAllSubjects()
  await fetchUserData()
}

onMounted(fetchAll)

router.afterEach(fetchAll)

window.addEventListener('popstate', fetchUserData)
</script>

<template>
  <header class="h-20">
    <Navbar />
  </header>
  <RouterView class="h-80" />
</template>

<style scoped>
</style>
