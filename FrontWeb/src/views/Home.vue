<template>
  <section class="home-box">
    <h2 v-if="type === null">Benvenuto su PascalMentor</h2>
    <h2 v-else-if="type === 'S'">Bentornato Studente 👨‍🎓</h2>
    <h2 v-else-if="type === 'I'">Bentornato Insegnante 👩‍🏫</h2>

    <p class="subtitle">
      <template v-if="type === ''">
        Per accedere ai contenuti, effettua il login.
      </template>
      <template v-else-if="type === 'S'">
        Clicca per gestire le tue ripetizioni o prenotarne di nuove.
      </template>
      <template v-else-if="type === 'I'">
        Clicca per creare nuove ripetizioni o vedere quelle esistenti.
      </template>
    </p>

    <div class="button-group">
      <template v-if="type === ''">
        <button class="primary" @click="goTo('sign-in')">Accedi</button>
      </template>

      <template v-else-if="type === 'S'">
        <button class="primary" @click="goTo('see-ripetitions')">Le mie Ripetizioni</button>
        <button class="secondary" @click="goTo('book-ripetition')">Prenota una Lezione</button>
      </template>

      <template v-else-if="type === 'I'">
        <button class="primary" @click="goTo('create-event')">Crea Evento</button>
        <button class="secondary" @click="goTo('see-ripetitions')">Le mie Ripetizioni</button>
      </template>
    </div>
  </section>
</template>

<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const type = inject('userType') // null | 'S' | 'I'
const router = useRouter()

const goTo = (routeName) => {
  router.push({ name: routeName })
}
</script>

<style scoped>
.home-box {
  background: linear-gradient(135deg, #f8f9fa, #e3f2fd);
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

button {
  font-size: 1rem;
  padding: 0.8rem 1.6rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
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
</style>
