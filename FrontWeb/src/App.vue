<script setup>
  import { provide, ref } from 'vue';
  import Navbar from './components/Navbar.vue'
  const user = ref('')
  provide('user', user)
</script>

<template>
  <header class="h-20">
    <Navbar />
  </header>

  <RouterView class="h-80"/>
</template>

<style scoped>

</style>
