<script setup>
import { inject, onMounted, ref } from 'vue';
import globalVariables from '../../../globalVariables';
import router from '@/router';
import { formatItalianDate } from '@/common/commonMethods';
import SeeFollowedRipetitions from '@/views/SeeRipetitions.vue';
const user = ref({})
const type = inject('userType')


onMounted(async () => {
    try {
        console.log(type.value)
        const response = await fetch(`${globalVariables.API_URL}/seePersonalData`, {
            credentials: 'include'
        });

        if (response.status == 401)
            router.push('/sign-in');
        else {
            const data = await response.json()
            user.value = data.user
            console.log(type.value)
        }
    } catch (error) {
        console.error('Errore nel caricamento dei dati:', error);
    }
});

async function logout() {
    const response = await fetch(`${globalVariables.API_URL}/logout`, {
        credentials: 'include'
    });
    if (response.status === 200) {
        router.push('/')
    }
    else {
        alert('errore nel logout')
    }
}
</script>

<template>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">
                <div class="card shadow-lg border-0">
                    <div class="card-body">
                        <h2 class="text-center mb-4">Benvenuto, {{ user?.Nome }}</h2>
                        <ul class="list-group list-group-flush mb-3">
                            <li class="list-group-item"><strong>Email:</strong> {{ user?.Mail }}</li>
                            <li v-if="type != 'I'" class="list-group-item"><strong>Indirizzo:</strong> {{
                                user?.IndirizzoDiStudio }}</li>
                            <li class="list-group-item"><strong>Data di nascita:</strong> {{
                                formatItalianDate(user?.DataDiNascita) }}</li>
                        </ul>
                        <button @click="logout" class="btn btn-danger w-100 mb-3">Logout</button>
                        
                    </div>
                </div>
            </div>
        </div>
        <SeeFollowedRipetitions v-if="type == 'S'" />
    </div>
</template>
