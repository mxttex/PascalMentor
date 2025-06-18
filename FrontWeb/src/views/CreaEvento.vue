<script setup>
import { ref, inject } from 'vue';
import globalVariables from '../../../globalVariables';
import router from '@/router';

const teacherId = inject('userId');

const form = ref({
  subject: null,
  date: "",
  startTime: "",
  endTime: "",
  notes: "",
  nrMaxPartecipants: 1,
  teacher: teacherId.value
});

const subjects = inject('subjects');

const alert = ref({
  show: false,
  message: '',
  type: 'success' // success, danger, warning...
});

function showAlert(message, type = 'success', timeout = 3000) {
  alert.value.message = message;
  alert.value.type = type;
  alert.value.show = true;
  setTimeout(() => {
    alert.value.show = false;
  }, timeout);
}

async function submitForm() {
  const payload = {
    Materia: form.value.subject,
    Data: form.value.date,
    OraInizio: form.value.startTime,
    OraFine: form.value.endTime,
    NumeroMassimoPartecipanti: form.value.nrMaxPartecipants,
    Note: form.value.notes,
    Insegnante: form.value.teacher
  };

  console.log('Payload:', payload);

  try {
    const response = await fetch(`${globalVariables.API_URL}createEvent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      showAlert('Ripetizione creata con successo', 'success');
      setTimeout(() => router.push('/'), 1500); // aspetta 1.5 sec prima del redirect
    } else {
      showAlert('Errore durante la creazione della ripetizione', 'danger');
    }
  } catch (error) {
    showAlert('Errore di rete durante la creazione della ripetizione', 'danger');
    console.error(error);
  }
}
</script>

<template>
  <div class="container my-5 ss">
    <h2 class="mb-4 title">Crea una Nuova Ripetizione</h2>

    <div v-if="alert.show" :class="`alert alert-${alert.type} alert-dismissible fade show`" role="alert">
      {{ alert.message }}
      <button type="button" class="btn-close" @click="alert.show = false" aria-label="Close"></button>
    </div>

    <form @submit.prevent="submitForm">
      <!-- ... il resto del form rimane uguale ... -->
      <div class="mb-3">
        <label for="subject" class="form-label text">Materia</label>
        <select v-model="form.subject" class="form-select" id="subject" required>
          <option disabled value="" class="text">Seleziona una materia</option>
          <option v-for="subject in subjects" :key="subject.Id" :value="subject.Id">
            {{ subject.Nome }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="date" class="form-label text">Data</label>
        <input v-model="form.date" type="date" class="form-control" id="date" required />
      </div>

      <div class="mb-3">
        <label for="startTime" class="form-label text">Ora di inizio:</label>
        <input v-model="form.startTime" type="time" class="form-control" id="startTime" required />
      </div>

      <div class="mb-3">
        <label for="endTime" class="form-label text">Ora di fine:</label>
        <input v-model="form.endTime" type="time" class="form-control" id="endTime" required />
      </div>

      <div class="mb-3">
        <label for="maxPartecipants" class="form-label text">Numero massimo di partecipanti:</label>
        <input v-model.number="form.nrMaxPartecipants" type="number" class="form-control" id="maxPartecipants" required />
      </div>

      <div class="mb-3">
        <label for="notes" class="form-label text">Argomenti:</label>
        <textarea v-model="form.notes" class="form-control" id="notes" rows="3" placeholder="Inserire gli argomenti" required></textarea>
      </div>

      <button type="submit" class="btn btn-primary defaultButton">Crea Ripetizione</button>
    </form>
  </div>
</template>

<style scoped>
.ss {
  background: linear-gradient(135deg, #ff9100, #ffd664);
  border-radius: 1em;
  padding: 1.5em;
}

.text {
  color: white;
  font-size: 1.04em;
}

.title {
  color: white;
  font-size: 2em;
}

.defaultButton {
  /* EF4765 FF9A5A */
  background: linear-gradient(to bottom right, #ffc691, #ffa341);
  border: 20px;
  border-radius: 12px;
  color: #FFFFFF;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 2.5;
  outline: transparent;
  padding: 0 1rem;
  text-align: center;
  text-decoration: none;
  transition: box-shadow .2s ease-in-out;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
}

.defaultButton:not([disabled]):focus {
  box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(239, 71, 101, 0.5), .125rem .125rem 1rem rgba(255, 154, 90, 0.5);
}

.defaultButton:not([disabled]):hover {
  box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5), -.125rem -.125rem 1rem rgba(239, 71, 101, 0.5), .125rem .125rem 1rem rgba(255, 154, 90, 0.5);
}
</style>