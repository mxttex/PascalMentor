<template>
  <section class="home-box">
    <h2 v-if="type === null">Benvenuto su PascalMentor</h2>
    <h2 class="title" v-else-if="type === 'S'">Bentornato Studente</h2>
    <h2 class="title" v-else-if="type === 'I'">Bentornato Insegnante</h2>

    <p class="subtitle">
      <template v-if="type === ''">
        <p class="blueBoxText">Per accedere ai contenuti, effettua il login.</p>
      </template>
      <template v-else-if="type === 'S'">
        <p class="text">Clicca per gestire le tue ripetizioni o prenotarne di nuove.</p>
      </template>
      <template v-else-if="type === 'I'">
        <p class="text">Clicca per creare nuove ripetizioni o vedere quelle esistenti.</p>
      </template>
    </p>

    <div class="button-group">
      <template v-if="type === ''">
        <button class="defaultButton" @click="goTo('sign-in')">Accedi</button>
      </template>

      <template v-else-if="type === 'S'">
        <button class="primary defaultButton" @click="goTo('see-ripetitions')">Le mie Ripetizioni</button>
        <button class="secondary defaultButton" @click="goTo('book-ripetition')">Prenota una Lezione</button>
      </template>

      <template v-else-if="type === 'I'">
        <button class="primary defaultButton" @click="goTo('create-event')">Crea Evento</button>
        <button class="secondary defaultButton" @click="goTo('see-ripetitions')">Le mie Ripetizioni</button>
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
/* f8f9fa */
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

.blueBoxText {
  font-size: 1.4em;
  font-weight: bold;
  color:rgb(255, 254, 250);
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
