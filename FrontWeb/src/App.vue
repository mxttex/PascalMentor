<script setup>
  import { provide, ref, onMounted} from 'vue';
  import Navbar from './components/Navbar.vue'
  const userType = ref('')
  const userId = ref('')
  provide('userType', userType)
  provide('userId', userId)

  onMounted(() => {
    
  })
</script>

<template>
  <header class="h-20">
    <Navbar />
  </header>
  <RouterView class="h-80"/>
</template>

<style scoped>

</style>
