<template>
    <div class="container d-flex justify-content-center align-items-center eighty-percent">
        <div class="text-center">
            <h1>PascalMentor will soon be available...</h1>
            <div v-if="!renderUser">REGISTER NOW!!!</div>
            <!-- <div v-else>CIAO IUSER {{ renderUser.Nome }}</div> -->
        </div>
    </div>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';

const user = inject('user'); 
const renderUser = ref(null);

// onMounted(() => {
//     if (user.value) {
//         renderUser.value = user.value; 
//     }
// });
</script>

<style scoped>

</style>
