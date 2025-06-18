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
            <button type="submit" class="defaultButton">Invia</button>
            <button type="button" class="btn-close" @click="close">×</button>
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
import { ref, defineProps, defineEmits, inject } from 'vue';
import globalVariables from '../../../globalVariables';

const props = defineProps(['ripetitionId']);
const emit = defineEmits(['close']);

const feedback = ref({ rating: 0, message: '' });
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
  padding: 20px 30px;
  position: relative;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  font-family: -apple-system, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
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
  resize: vertical;
  font-family: inherit;
  font-size: 1rem;
}

.modal-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 15px;
  align-items: center;
}

.defaultButton {
  background: linear-gradient(to bottom right, #ffc691, #ffa341);
  border: none;
  border-radius: 12px;
  color: #FFFFFF;
  cursor: pointer;
  font-family: -apple-system, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 2.5;
  padding: 0 1.5rem;
  text-align: center;
  user-select: none;
  transition: box-shadow .2s ease-in-out;
  white-space: nowrap;
  min-width: 100px;
}

.defaultButton:not([disabled]):focus,
.defaultButton:not([disabled]):hover {
  box-shadow:
    0 0 .25rem rgba(0, 0, 0, 0.5),
    -.125rem -.125rem 1rem rgba(239, 71, 101, 0.5),
    .125rem .125rem 1rem rgba(255, 154, 90, 0.5);
}

.btn-close {
  background: #ccc;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 40px;
  text-align: center;
  padding: 0;
  color: #555;
  user-select: none;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-close:hover {
  background: #bbb;
  color: #333;
}

.stars {
  display: flex;
  justify-content: center;
  gap: 8px;
  user-select: none;
}

.star-container {
  position: relative;
  cursor: pointer;
  width: 28px;
}

.star {
  font-size: 28px;
  color: #ccc;
  pointer-events: none;
  transition: color 0.3s ease;
  user-select: none;
}

.star.full {
  color: #ffcc00;
  filter: drop-shadow(0 0 3px #ffb900);
}

.star.half {
  background: linear-gradient(90deg, #ffcc00 50%, #ccc 50%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 2px #ffb900);
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
