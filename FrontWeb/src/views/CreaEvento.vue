<script setup>
import { ref, inject, onMounted } from 'vue';
import globalVariables from '../../../globalVariables';

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

  const response = await fetch(`${globalVariables.API_URL}createEvent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    alert('Ripetizione creata con successo');
  } else {
    alert('Errore durante la creazione della ripetizione');
  }
}
</script>

<template>
  <div class="container my-5">
    <h2 class="mb-4">Crea una Nuova Ripetizione</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="subject" class="form-label">Materia</label>
        <select v-model="form.subject" class="form-select" id="subject" required>
          <option disabled value="">Seleziona una materia</option>
          <option v-for="subject in subjects" :key="subject.Id" :value="subject.Id">
            {{ subject.Nome }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label for="date" class="form-label">Data</label>
        <input v-model="form.date" type="date" class="form-control" id="date" required />
      </div>

      <div class="mb-3">
        <label for="startTime" class="form-label">Ora di inizio:</label>
        <input v-model="form.startTime" type="time" class="form-control" id="startTime" required />
      </div>

      <div class="mb-3">
        <label for="endTime" class="form-label">Ora di fine:</label>
        <input v-model="form.endTime" type="time" class="form-control" id="endTime" required />
      </div>

      <div class="mb-3">
        <label for="maxPartecipants" class="form-label">Numero massimo di partecipanti:</label>
        <input v-model.number="form.nrMaxPartecipants" type="number" class="form-control" id="maxPartecipants" required />
      </div>

      <div class="mb-3">
        <label for="notes" class="form-label">Note</label>
        <textarea v-model="form.notes" class="form-control" id="notes" rows="3" placeholder="Inserisci eventuali note"></textarea>
      </div>

      <button type="submit" class="btn btn-primary">Crea Ripetizione</button>
    </form>
  </div>
</template>
