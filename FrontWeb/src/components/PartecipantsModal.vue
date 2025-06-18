<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <header class="modal-header">
          <slot name="header">
            <h2>Visualizza i partecipanti</h2>
          </slot>
        </header>

        <section class="modal-body">
          <slot>
            <div v-for="partecipant in partecipants" :key="partecipant.Id">
                <h5> {{ partecipant.Nome }} {{ partecipant.Cognome }}</h5>
                <h6>Data di Nascita: {{ formatItalianDate(partecipant.DataDiNascita) }}</h6>
                <h6>Indirizzo: {{ partecipant.Indirizzo }}</h6>
            </div>
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer">
            <button @click="close">Chiudi</button>
          </slot>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { formatItalianDate } from '@/common/commonMethods';
import { defineEmits, onMounted, ref } from 'vue';
import globalVariables from '../../../globalVariables';

const partecipants = ref([])
const emit = defineEmits(['close']);

const props = defineProps(['ripetition'])
const close = () => {
  emit('close');
};

onMounted(async () => {
    console.log(props.ripetition)
    await fetch(
        `${globalVariables.API_URL}fetchPartecipantsToCertainRipetition:${props.ripetition}`
    )
    .then(res => res.json())
    .then(data => { partecipants.value = data })
    .catch(error => console.log(error))
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: #fff9f0;
  border-radius: 1em;
  padding: 2rem 2.5rem;
  width: 90%;
  max-width: 520px;
  box-shadow:
    0 4px 12px rgba(255, 145, 0, 0.15),
    0 12px 24px rgba(255, 145, 0, 0.3);
  animation: fadeIn 0.3s ease;
  color: #5c3a00;
  font-family: -apple-system, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.modal-header {
  border-bottom: 2px solid #ffd664;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
}

.modal-header h2 {
  font-size: 1.6rem;
  font-weight: 700;
  color: #b35e00;
  margin: 0;
  white-space: normal;
}

.modal-body {
  max-height: 320px;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.modal-body div {
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  background: #fff7df;
  border: 1.5px solid #ffd664;
}

.modal-body h5 {
  margin: 0 0 0.3rem 0;
  font-weight: 700;
  color: #b35e00;
}

.modal-body h6 {
  margin: 0;
  font-weight: 500;
  color: #5c3a00;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.modal-footer button {
  background: linear-gradient(45deg, #ff9100, #ffbf33);
  border: none;
  border-radius: 12px;
  font-weight: 600;
  color: white;
  padding: 0.6rem 1.3rem;
  cursor: pointer;
  font-size: 1rem;
  transition: box-shadow 0.2s ease-in-out;
}

.modal-footer button:hover {
  box-shadow: 0 0 10px rgba(255, 145, 0, 0.7);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>
