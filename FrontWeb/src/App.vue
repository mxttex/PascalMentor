<script setup>
import { provide, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from './components/Navbar.vue';
import globalVariables from '../../globalVariables';

const userType = ref('');
const userId = ref('');
const subjects = ref([])
provide('userType', userType);
provide('userId', userId);
provide('subjects', subjects)

const router = useRouter();

const fetchUserData = async () => {
  try {
    const response = await fetch(`${globalVariables.API_URL}`, {
      credentials: 'include'
    });

    if (response.ok) {
      const data = await response.json();
      userType.value = data.type;
      userId.value = data.userId;
    } else {
      console.log('Errore nel recupero dati utente');
    }
  } catch (error) {
    console.error('Errore di rete:', error);
  }
};

const fetchAll = async () => {
  await fetchAllSubjects();
  await fetchUserData();
}

const fetchAllSubjects = async () => {
  fetch(`${globalVariables.API_URL}getSubjects`, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json())
    .then(data => { subjects.value = data; })
    .catch(err => console.error('Error fetching subjects:', err));
}
onMounted(fetchAll);
router.afterEach(() => {
  fetchAll();
});
window.addEventListener('popstate', fetchUserData);
</script>

<template>
  <header class="h-20">
    <Navbar />
  </header>
  <RouterView class="h-80"/>
</template>

<style scoped>
</style>
