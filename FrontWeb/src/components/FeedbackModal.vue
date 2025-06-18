<template>
    <Teleport to="body">
        <div class="modal-overlay" @click.self="close">

            <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
                {{ errorMessage }}
                <button type="button" class="btn-close" @click="errorMessage = ''" aria-label="Close"></button>
            </div>

            <div class="modal-content">

                <header class="modal-header">
                    <slot name="header" v-if="feedbacks.length > 0">
                        <h2>Feedback per la lezione di {{ materia }} del {{ formatItalianDate(data) }}</h2>
                    </slot>
                    <slot name="header" v-else>
                        <h2>Nessun feedback lasciato per questa lezione</h2>
                    </slot>
                </header>

                <section class="modal-body">
                    <slot>
                        <div class="comment-style" v-for="feedback in feedbacks" :key="feedback.Id">
                            <header class="comment-header">
                                <span class="username">{{ feedback.Nome }} {{ feedback.Cognome }}</span>
                            </header>
                            <section class="comment-body">
                                <p>Valutazione: {{ feedback.Rating }}</p>
                                <p>Motivo: {{ feedback.Descrizione }}</p>
                            </section>
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
import { defineEmits, defineProps, onMounted, ref } from 'vue';
import globalVariables from '../../../globalVariables';

const emit = defineEmits(['close']);
const props = defineProps(['lesson']);
const feedbacks = ref([]);
const materia = ref('');
const data = ref('');
const errorMessage = ref('');

const close = () => {
    emit('close');
};

onMounted(async () => {
    try {
        const res = await fetch(`${globalVariables.API_URL}fetchFeedbacksByLesson:${props.lesson}`);
        if (!res.ok) throw new Error('Errore nel caricamento dei feedback');
        const dataFetch = await res.json();
        feedbacks.value = dataFetch;

        if (feedbacks.value.length > 0) {
            materia.value = feedbacks.value[0].Materia;
            data.value = feedbacks.value[0].Data;
        }
    } catch (err) {
        errorMessage.value = err.message || 'Errore sconosciuto';
    }
});
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.modal-content {
    background: #fff9f0;
    border-radius: 1em;
    padding: 1.5em 2em;
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

.comment-style {
    margin-bottom: 1rem;
    border: 1.5px solid #ffd664;
    border-radius: 12px;
    padding: 0.8rem 1rem;
    background: #fff7df;
}

.comment-header .username {
    font-weight: 600;
    color: #b35e00;
    margin-bottom: 0.3rem;
    display: block;
}

.comment-body p {
    margin: 0.15rem 0;
    color: #5c3a00;
}

.modal-footer {
    display: flex;
    justify-content: flex-end;
}

.modal-footer button {
    background: linear-gradient(45deg, #ffc691, #ffa341);
    border: none;
    border-radius: 12px;
    font-weight: 600;
    color: white;
    padding: 0.5rem 1.2rem;
    cursor: pointer;
    font-size: 1rem;
    transition: box-shadow 0.2s ease-in-out;
}

.modal-footer button:hover {
    box-shadow: 0 0 10px rgba(255, 145, 0, 0.7);
}

.modal-body::-webkit-scrollbar {
    width: 8px;
}

.modal-body::-webkit-scrollbar-thumb {
    background: #ff9100;
    border-radius: 8px;
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
