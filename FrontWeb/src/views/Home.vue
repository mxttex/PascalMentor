<template>
  <section class="presentation-box" v-if="visible">
    <div class="header">
      <h2 v-if="type === null">Benvenuto su PascalMentor!</h2>
      <h2 v-else-if="type === 'S'">Bentornato Studente 👨‍🎓</h2>
      <h2 v-else-if="type === 'I'">Bentornato Insegnante 👩‍🏫</h2>
    </div>

    <div class="content">
      <transition name="fade" mode="out-in">
        <template v-if="type === 'S'">
          <div key="student">
            <p>
              📚 Esplora i prossimi eventi, scopri insegnanti con ottime recensioni e partecipa attivamente!
            </p>
            <button class="primary" @click="navigateTo('events')">Vai agli eventi</button>
          </div>
        </template>

        <template v-else-if="type === 'I'">
          <div key="teacher">
            <p>
              ✍️ Crea eventi formativi, gestisci le iscrizioni e ricevi feedback dai tuoi studenti.
            </p>
            <button class="primary" @click="navigateTo('dashboard')">Vai al pannello</button>
          </div>
        </template>

        <template v-else>
          <div key="guest">
            <p>
              ✨ PascalMentor è la piattaforma ideale per imparare, insegnare e crescere insieme.
              Scopri lezioni, eventi e recensioni autentiche.
            </p>
            <div class="button-group">
              <button class="secondary" @click="navigateTo('register-student')">Registrati Studente</button>
              <button class="secondary" @click="navigateTo('register-teacher')">Registrati Insegnante</button>
            </div>
          </div>
        </template>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { inject, ref } from 'vue'
import { useRouter } from 'vue-router'

const type = inject('userType') // 'S' | 'I' | null
const visible = ref(true)
const router = useRouter()

const navigateTo = (routeName) => {
  router.push({ name: routeName })
}
</script>

<style scoped>
.presentation-box {
  background: linear-gradient(135deg, #e3f2fd, #fce4ec);
  padding: 2.5rem 2rem;
  margin: 2rem auto;
  max-width: 900px;
  border-radius: 20px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: fadeIn 0.6s ease;
}

.header h2 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 1rem;
}

.content p {
  font-size: 1.2rem;
  color: #444;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  flex-wrap: wrap;
}

/* Pulsanti */
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
  background-color: #ffffff;
  color: #007bff;
  border: 2px solid #007bff;
}

.secondary:hover {
  background-color: #007bff;
  color: white;
}

/* Animazioni */
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
