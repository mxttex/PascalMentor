<script setup>
import { inject, onMounted, ref } from 'vue';
import globalVariables from '../../../globalVariables';
import router from '@/router';
import { formatItalianDate } from '@/common/commonMethods';

const user = ref({})
const type = inject('userType')

const alert = ref({
    show: false,
    message: '',
    type: 'danger' // bootstrap alert types: success, danger, warning, info...
});

function showAlert(message, type = 'danger', timeout = 3000) {
    alert.value.message = message;
    alert.value.type = type;
    alert.value.show = true;
    setTimeout(() => {
        alert.value.show = false;
    }, timeout);
}

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
    try {
        const response = await fetch(`${globalVariables.API_URL}/logout`, {
            credentials: 'include'
        });
        if (response.status === 200) {
            router.push('/')
        }
        else {
            showAlert('Errore nel logout');
        }
    } catch (error) {
        showAlert(error);

    }
}
</script>

<template>
    <div class="container">
        <div class="card shadow-lg border-0">
            <div class="card-body">

                <!-- ALERT Bootstrap semplice -->
                <div v-if="alert.show" :class="`alert alert-${alert.type} alert-dismissible fade show`" role="alert">
                    {{ alert.message }}
                    <button type="button" class="btn-close" aria-label="Close" @click="alert.show = false"></button>
                </div>

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
</template>
<style scoped>
.container {
    padding: 2rem 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
    height: 80vh
}

.card {
    border-radius: 20px;
    background: #fff9f0;
    box-shadow:
        0 4px 12px rgba(255, 145, 0, 0.15),
        0 12px 24px rgba(255, 145, 0, 0.3);
    padding: 2.5rem 3rem;
    max-width: 400px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-align: left;
}

.card:hover {
    transform: translateY(-8px);
    box-shadow:
        0 8px 16px rgba(255, 145, 0, 0.25),
        0 16px 32px rgba(255, 145, 0, 0.45);
}

h2 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #b35e00;
    margin-bottom: 1.5rem;
    text-align: center;
    white-space: nowrap;
}

.list-group-item {
    font-size: 1.1rem;
    border: none;
    padding-left: 0;
    padding-right: 0;
    color: #5c3a00;
    border-bottom: 1px solid #ffd664;
    white-space: normal;
    word-break: break-word;
}

.list-group-item:last-child {
    border-bottom: none;
}

.list-group-item strong {
    color: #6b4b00;
}

.btn-danger {
    background: linear-gradient(45deg, #ff9100, #ffbf33);
    border: none;
    border-radius: 12px;
    font-weight: 600;
    color: #fff;
    transition: background 0.3s ease, box-shadow 0.2s ease;
    padding: 0.75rem;
    width: 100%;
    cursor: pointer;
    text-align: center;
}

.btn-danger:hover {
    background: linear-gradient(45deg, #ff7a00, #ffbf33);
    box-shadow: 0 6px 15px rgba(255, 145, 0, 0.5);
}
</style>
