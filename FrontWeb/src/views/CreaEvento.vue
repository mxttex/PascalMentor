<script setup>
import { ref } from 'vue';
import globalVariables from '../../globalVariables';

const form = ref({
  subject: "",
  date: "",
  startTime: "",
  endTime: "",
  notes: "",
  nrMaxPartecipants: 1
})

async function submitForm() {
  const result = await fetch(
    `${globalVariables}createEvent`,
    {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(form.value)
    }
  )

  if(result.status == 200){
    alert("ripetizione creata con successo")
  }
  else{
    alert("errore")
  }
}

</script>

<template>
  <div class="container my-5">
    <h2 class="mb-4">Crea una Nuova Ripetizione</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="subject" class="form-label">Materia</label>
        <input v-model="form.subject" type="text" class="form-control" id="subject" placeholder="Inserisci la materia"
          required />
      </div>
      <div class="mb-3">
        <label for="date" class="form-label">Data</label>
        <input v-model="form.date" type="date" class="form-control" id="date" required>
      </div>
      <div class="mb-3">
        <label for="time" class="form-label">Ora di inizio:</label>
        <input v-model="form.startTime" type="time" class="form-control" id="time" required />
      </div>
      <div class="mb-3">
        <label for="time" class="form-label">Ora di fine:</label>
        <input v-model="form.endTime" type="time" class="form-control" id="endtime" required />
      </div>
      <div class="mb-3">
        <label for="maxPartecipants" class="form-label">Numero massimo di partecipanti:</label>
        <input v-model="form.nrMaxPartecipants" type="number" class="form-control" id="maxPartecipants" required />
      </div>
      <div class="mb-3">
        <label for="notes" class="form-label">Note</label>
        <textarea v-model="form.notes" class="form-control" id="notes" rows="3"
          placeholder="Inserisci eventuali note"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Crea Ripetizione</button>
    </form>
  </div>
</template>