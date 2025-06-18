<template>
  <div class="home-box">
    <h2 class="title">Prof. {{ professor.Nome }} {{ professor.Cognome }}</h2>

    <div class="text mb-4">
      <p><strong>Email:</strong> {{ professor.Mail }}</p>
      <p><strong>Data di nascita:</strong> {{ formatItalianDate(professor.DataDiNascita) }}</p>
      <p><strong>Data di iscrizione:</strong> {{ formatItalianDate(professor.DataIscrizione) }}</p>
    </div>

    <div class="text mb-4" v-if="feedback.length">
      <p><strong>⭐ Valutazione media:</strong> {{ professor.Ratingmedio }} / 5</p>
      <p><strong>Ultimi feedback:</strong></p>
      <ul>
        <p v-for="(fb, index) in feedback.slice(0, 5)" :key="index">
          "{{ fb.Descrizione }}" – ({{ fb.Rating }}★)
      </p>
      </ul>
    </div>

    <div class="button-group">
      <a :href="`mailto:${professor.Mail}`" class="defaultButton secondary">Contatta</a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { formatItalianDate } from '@/common/commonMethods';
import globalVariables from '../../../globalVariables';
import { useRoute } from 'vue-router';

const route = useRoute();
const teacherId = route.params.id;

const professor = ref({});
const feedback = ref([]);

onMounted(async () => {
  try {
    const response = await fetch(`${globalVariables.API_URL}fetchUserData:${teacherId}`);
    if (response.ok) {

      const data = await response.json();
      console.log(data)
      
      professor.value = data.userData[0];
      console.dir(professor.value)
      if(data.lastFeedbacks.length>0)
        feedback.value = data.lastFeedbacks;
    } else {
      const errorText = await response.text();
      console.error('Errore:', errorText);
    }
  } catch (error) {
    console.error('Errore di rete:', error);
  }
});
</script>

<style scoped>
.home-box {
  background: linear-gradient(135deg, #ff8c00, #ffb347);
  padding: 3rem 2rem;
  margin: 3rem auto;
  max-width: 750px;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  text-align: center;
  animation: fadeIn 0.5s ease-out;
  color: #ffffff;
}

h2.title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #ffffff;
}

.text {
  font-size: 1.05rem;
  line-height: 1.6;
  color: #ffffff;
}

.text p {
  margin: 0.5rem 0;
}

ul {
  list-style: none;
  padding-left: 0;
  margin-top: 0.5rem;
}

ul p {
  background: rgba(0, 0, 0, 0.3);
  border-left: 4px solid #ffffff;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  margin: 0.4rem auto;
  font-style: italic;
  font-size: 0.95rem;
  color: #ffffff;
  text-align: left;
}

.button-group {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
}

.defaultButton {
  background: linear-gradient(to bottom right, #ff6f00, #ff3d00);
  border: none;
  border-radius: 10px;
  padding: 0.75rem 1.5rem;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.defaultButton.secondary {
  background: transparent;
  border: 2px solid #ffffff;
  color: #ffffff;
}

.defaultButton:hover {
  transform: scale(1.04);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>
