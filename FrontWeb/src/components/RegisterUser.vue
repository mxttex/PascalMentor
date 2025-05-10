<template>
    <div class="container mt-5">
        <h1 class="text-center">{{ isTeacher ? 'Insegnante' : 'Studente' }}</h1>

        <div class="text-center mb-4">
            <button class="btn btn-outline-primary me-2" :class="{ active: !isTeacher }"
                @click="isTeacher = false">Studente</button>
            <button class="btn btn-outline-secondary" :class="{ active: isTeacher }"
                @click="isTeacher = true">Insegnante</button>
        </div>

        <form @submit.prevent="handleSubmit" class="mt-3">
            <div class="mb-3">
                <label for="nome" class="form-label">Nome</label>
                <input type="text" class="form-control" id="nome" v-model="nome" required />
            </div>

            <div class="mb-3">
                <label for="cognome" class="form-label">Cognome</label>
                <input type="text" class="form-control" id="cognome" v-model="cognome" required />
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="email" required />
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" required />
            </div>

            <div class="mb-3">
                <label for="confermaPassword" class="form-label">Conferma Password</label>
                <input type="password" class="form-control" id="confermaPassword" v-model="confermaPassword" required />
            </div>

            <div v-if="!isTeacher" class="mb-3">
                <label for="indirizzo" class="form-label">Indirizzo di studio</label>
                <select id="indirizzo" class="form-select" v-model="indirizzo">
                    <option value="Informatica">Informatica</option>
                    <option value="Automazione">Automazione</option>
                    <option value="Biotecnologie">Biotecnologie</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="dataNascita" class="form-label">Data di Nascita</label>
                <input type="date" class="form-control" id="dataNascita" v-model="dataNascita" required />
            </div>

            <button type="submit" class="btn btn-primary w-100">Registrati</button>
            <a @click="$emit('change-state', 'log')">Sei gia' registrato? Loggati!</a>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHA256 } from 'crypto-js'
import globalVariables from '../../../globalVariables.js'

const isTeacher = ref(false)

const nome = ref('')
const cognome = ref('')
const email = ref('')
const password = ref('')
const confermaPassword = ref('')
const indirizzo = ref('Informatica')
const dataNascita = ref('')

async function handleSubmit() {
    if (password.value !== confermaPassword.value) {
        alert('Le password non coincidono!')
        return
    }

    const formData = {
        nome: nome.value,
        cognome: cognome.value,
        email: email.value,
        password: SHA256(password.value).toString(),
        dataNascita: dataNascita.value
    }

    if (!isTeacher.value) {
        formData.indirizzo = indirizzo.value
        formData.type = 'S'
    }
    else {
        formData.type = 'I'
    }

    const endpoint = `${globalVariables.API_URL}register`

    try {
        const result = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData)
        })

        if (result.status === 200) {
            alert('Registrazione avvenuta con successo!')
            location.reload()
        } else {
            alert('Errore durante la registrazione.')
        }
    } catch (err) {
        alert('Errore nella richiesta al server.')
        console.error(err)
    }
}
</script>

<style scoped>
.container {
    max-width: 500px;
    margin: auto;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

button.active {
    font-weight: bold;
    background-color: #0d6efd;
    color: white;
}
</style>