<template>
  <Teleport to="body">
    <div class="modal-overlay" @click.self="close">
      <div class="modal-content">
        <h2>Lascia un Feedback</h2>
        <form @submit.prevent="submitFeedback">
          <div class="form-group">
            <label for="rating">Valutazione:</label>
            <div class="stars" @mousemove="handleHover" @mouseleave="clearHover">
              <div v-for="star in 5" :key="star" class="star-container" @click="setRating($event, star)">
                <span class="star" :class="getStarClass(star)">★</span>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="message">Feedback:</label>
            <textarea id="message" v-model="feedback.message" placeholder="Scrivi il tuo feedback" required></textarea>
          </div>

          <div class="modal-buttons">
            <button type="submit">Invia</button>
            <button type="button" class="btn-close" @click="close">Annulla</button>
          </div>
        </form>

        <div v-if="submitted" class="thank-you">
          <p>Grazie per il tuo feedback! Hai dato una valutazione di {{ feedback.rating }} stelle.</p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits, inject } from 'vue';
import globalVariables from '../../../globalVariables';

const props = defineProps(['ripetitionId']);
const emit = defineEmits(['close']);

const feedback = ref({ rating: 0, message: '' });
const hoverRating = ref(0);
const submitted = ref(false);
const userId = inject('userId')

const setRating = (event, starIndex) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const width = rect.width;
  const isHalf = clickX < width / 2;
  feedback.value.rating = isHalf ? starIndex - 0.5 : starIndex;
};

const getStarClass = (starIndex) => {
  if (feedback.value.rating >= starIndex) return 'full';
  if (feedback.value.rating >= starIndex - 0.5) return 'half';
  return 'empty';
};

const submitFeedback = async () => {
  //console.log('Feedback inviato:', feedback.value);
  console.log(props.ripetitionId)
  await fetch(`${globalVariables.API_URL}addFeedback`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({
      voto: feedback.value.rating,
      descrizione: feedback.value.message,
      studenteId: userId.value,
      ripetitionId: props.ripetitionId
    })
  })
    .then(res => {
      if (res.ok) {
        submitted.value = true;
      }
    })
    .catch(err => alert(err))
};

const close = () => {
  emit('close');
  feedback.value = { rating: 0, message: '' };
  submitted.value = false;
};
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
  background-color: #f9f9f9;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  padding: 20px;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  animation: fadeIn 0.3s ease;
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

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-close {
  background-color: #ccc;
}

button:hover {
  opacity: 0.9;
}

.stars {
  display: flex;
  justify-content: center;
  gap: 5px;
  user-select: none;
}

.star-container {
  position: relative;
  cursor: pointer;
  width: 24px;
}

.star {
  font-size: 24px;
  color: #ccc;
  transition: color 0.3s;
  pointer-events: none;
}

.star.full {
  color: #ffcc00;
}

.star.half {
  background: linear-gradient(90deg, #ffcc00 50%, #ccc 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.star.empty {
  color: #ccc;
}

.thank-you {
  margin-top: 20px;
  color: green;
  font-weight: bold;
}
</style>
