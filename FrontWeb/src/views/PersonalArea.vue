<script setup>
import { onMounted, ref } from 'vue';
import globalVariables from '../../globalVariables';
import router from '@/router';

const user = ref({})


onMounted(async () => {
    try {
        const response = await fetch(`${globalVariables.API_URL}/seePersonalData`, {
            credentials: 'include'
        });

        if (response.status == 401) 
            router.push('/sign-in');
        else{
            user.value = await response.json()
            console.log('done')
        }
    } catch (error) {
        console.error('Errore nel caricamento dei dati:', error);
    }
});

async function logout() {
    const response = await fetch(`${globalVariables.API_URL}/logout`, {
        credentials: 'include'
    });
    if(response.status === 200){
        router.push('/')
    }
    else{
        alert('errore nel logout')
    }
}
</script>

<template>

    <div class="container d-flex justify-content-center align-items-center vh-80">
        <div class="card p-4 shadow-lg">
            <h2 class="text-center">Benvenuto, {{ user?.Nome }}</h2>
            <p><strong>Email:</strong> {{ user?.Mail }}</p>
            <p><strong>Indirizzo:</strong> {{ user?.Indirizzo }}</p>
            <p><strong>Data di nascita:</strong> {{ new Date(user?.DataDiNascita) }}</p>

            <button @click="logout" class="btn btn-danger w-100 mt-3">Logout</button>
        </div>
    </div>

</template>