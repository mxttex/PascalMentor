<template>
  <div class="home-box">
    <h2 class="title">Prof. {{ professor.Nome }} {{ professor.Cognome }}</h2>

    <div class="text mb-4">
      <p><strong>Email:</strong> {{ professor.Mail }}</p>
      <p><strong>Data di nascita:</strong> {{ formatItalianDate(professor.DataDiNascita) }}</p>
    </div>


    <div class="text mb-4" v-if="feedback.length">
      <p><strong>⭐ Valutazione media:</strong> {{ professor.RatingMedio }} / 5</p>

      <p><strong>Ultimi feedback:</strong></p>
      <ul>
        <ul v-for="(fb, index) in feedback.slice(0, 5)" :key="index">
          "{{ fb.comment }}" – <em>{{ fb.date }}</em> ({{ fb.rating }}★)
        </ul>
      </ul>
    </div>

    <div class="button-group">
      <a :href="`mailto:${professor.Mail}`" class="defaultButton secondary">Contatta</a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { formatItalianDate } from '@/common/commonMethods';

// Dati professore
const professor = ref({
  Nome: 'Marco',
  Cognome: 'Rossi',
  Mail: 'marco.rossi@example.com',
  DataDiNascita: '1980-03-12',
  RatingMedio: 4.5
});

// Simulazione feedback (di solito vengono da API)
const feedback = ref([
  { rating: 5, comment: 'Spiegazioni chiarissime!', date: '01/06/2025' },
  { rating: 4, comment: 'Molto preparato e disponibile', date: '30/05/2025' },
  { rating: 5, comment: 'Ottimo approccio didattico', date: '28/05/2025' },
  { rating: 3, comment: 'Buona lezione, ma un po\' veloce', date: '25/05/2025' },
  { rating: 5, comment: 'Il top dei prof!', date: '20/05/2025' },
  { rating: 4, comment: 'Professionale e chiaro', date: '18/05/2025' },
]);


function prenota() {
  alert('Funzione prenotazione non ancora implementata.');
}
</script>

<style scoped>
.home-box {
  background: linear-gradient(135deg, #ff9100, #ffd664);
  padding: 2.5rem 2rem;
  margin: 3rem auto;
  max-width: 800px;
  border-radius: 20px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  text-align: center;
  animation: fadeIn 0.6s ease;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.subtitle {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #555;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.primary {
  background-color: #007bff;
  color: white;
}

.primary:hover {
  background-color: #0056b3;
}

.secondary {
  background-color: white;
  color: #007bff;
  border: 2px solid #007bff;
}

.secondary:hover {
  background-color: #007bff;
  color: white;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
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

.defaultButton:not([disabled]):focus,
.defaultButton:not([disabled]):hover {
  box-shadow: 0 0 .25rem rgba(0, 0, 0, 0.5),
              -.125rem -.125rem 1rem rgba(239, 71, 101, 0.5),
              .125rem .125rem 1rem rgba(255, 154, 90, 0.5);
}

.star {
  font-size: 1.5rem;
  color: gold;
}
</style>
