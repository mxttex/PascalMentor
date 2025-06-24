<template>
    <div class="container mt-5">
        <h1 class="text-center title">{{ isTeacher ? 'Insegnante' : 'Studente' }}</h1>

        <div class="button-toggle-container">
            <button class="defaultButton" :class="{ active: !isTeacher }" @click="isTeacher = false">
                Studente
            </button>
            <button class="defaultButton" :class="{ active: isTeacher }" @click="isTeacher = true">
                Insegnante
            </button>
        </div>


        <div v-if="alert.show" :class="['alert', `alert-${alert.type}`, 'mt-3']" role="alert">
            {{ alert.message }}
            <button type="button" class="btn-close" aria-label="Close" @click="alert.show = false"></button>
        </div>

        <form @submit.prevent="handleSubmit" class="mt-3">
            <div class="mb-3">
                <label for="nome" class="form-label text">Nome</label>
                <input type="text" class="form-control" id="nome" v-model="nome" required />
            </div>

            <div class="mb-3">
                <label for="cognome" class="form-label text">Cognome</label>
                <input type="text" class="form-control" id="cognome" v-model="cognome" required />
            </div>

            <div class="mb-3">
                <label for="email" class="form-label text">Email</label>
                <input type="email" class="form-control" id="email" v-model="email" required />
            </div>

            <div class="mb-3">
                <label for="password" class="form-label text">Password</label>
                <input type="password" class="form-control" id="password" v-model="password" required />
            </div>

            <div class="mb-3">
                <label for="confermaPassword" class="form-label text">Conferma Password</label>
                <input type="password" class="form-control" id="confermaPassword" v-model="confermaPassword" required />
            </div>

            <div v-if="!isTeacher" class="mb-3">
                <label for="indirizzo" class="form-label text">Indirizzo di studio</label>
                <select id="indirizzo" class="form-select" v-model="indirizzo">
                    <option value="Informatica">Informatica</option>
                    <option value="Automazione">Automazione</option>
                    <option value="Biotecnologie">Biotecnologie</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="dataNascita" class="form-label text">Data di Nascita</label>
                <input type="date" class="form-control" id="dataNascita" v-model="dataNascita" required />
            </div>

            <button type="submit" class="defaultButton w-100">Registrati</button>
            <a @click="$emit('change-state', 'log')" class="text d-block mt-3 text-center" style="cursor:pointer;">Sei
                già registrato? Loggati!</a>
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

const alert = ref({ show: false, type: '', message: '' })
const emit = defineEmits(['change-state'])
const resetForm = () => {
    nome.value = ''
    cognome.value = ''
    email.value = ''
    password.value = ''
    confermaPassword.value = ''
    indirizzo.value = 'Informatica'
    dataNascita.value = ''
}

async function handleSubmit() {
    alert.value.show = false

    if (password.value !== confermaPassword.value) {
        alert.value = { show: true, type: 'danger', message: 'Le password non coincidono!' }
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
    } else {
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
            alert.value = { show: true, type: 'success', message: 'Registrazione avvenuta con successo!' }
            resetForm()
            emit('change-state', 'log')
        } else {
            alert.value = { show: true, type: 'danger', message: 'Errore durante la registrazione.' }
        }
    } catch (err) {
        alert.value = { show: true, type: 'danger', message: 'Errore nella richiesta al server.' }
        console.error(err)
    }
}
</script>

<style scoped>
.container {
    max-width: 500px;
    margin: auto;
    padding: 20px;
    background: linear-gradient(135deg, #ff9100, #ffd664);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.button-toggle-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.defaultButton {
  background: linear-gradient(to bottom right, #ffc691, #ffa341);
  border: none;
  border-radius: 12px;
  color: #fff;
  cursor: pointer;
  font-family: -apple-system, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 2.5;
  padding: 0 1rem;
  text-align: center;
  transition: all 0.3s ease-in-out;
  user-select: none;
  white-space: nowrap;
  width: auto; /* meglio auto per bottoni affiancati */
  min-width: 120px;
}

.defaultButton:not([disabled]):focus,
.defaultButton:not([disabled]):hover {
  box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5),
              -.125rem -.125rem 1rem rgba(239, 71, 101, 0.5),
              .125rem .125rem 1rem rgba(255, 154, 90, 0.5);
}

.defaultButton.active {
  background: linear-gradient(to bottom right, #ff9933, #ff6600);
  box-shadow: 0 0 .4rem rgba(0, 0, 0, 0.6),
              0 0 1rem rgba(255, 255, 255, 0.4);
  transform: scale(1.05);
}


.text {
    color: white;
    font-size: 1.04em;
}

.title {
    color: white;
    font-size: 3em;
}
</style>
