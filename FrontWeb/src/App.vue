<script setup>
import { provide, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from './components/Navbar.vue';
import globalVariables from '../../globalVariables';

const userType = ref('');
const userId = ref('');
provide('userType', userType);
provide('userId', userId);

const router = useRouter();

const fetchUserData = async () => {
  console.log('Fetching user data...');
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

onMounted(fetchUserData);
router.afterEach(() => {
  fetchUserData();
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
