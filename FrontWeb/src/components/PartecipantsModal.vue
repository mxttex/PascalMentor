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
                <h5> {{ partecipant.Nome }} -  {{ partecipant.Cognome }}</h5>
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
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease;
}

.modal-header,
.modal-body,
.modal-footer {
  margin-bottom: 1rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
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
