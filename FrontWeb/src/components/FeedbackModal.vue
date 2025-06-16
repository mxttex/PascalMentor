<template>
    <Teleport to="body">
        <div class="modal-overlay" @click.self="close">
            <div class="modal-content">
                <header class="modal-header">
                    <slot name="header">
                        <h2>Feedback per la lezione di {{ materia }} del {{ formatItalianDate(data) }}
                        </h2>
                    </slot>
                </header>

                <section class="modal-body">
                    <slot>
                        <div class="comment-style">
                            <div class="modal-content comment-style" v-for="feedback in feedbacks" :key="feedback.Id">
                                <header class="comment-header">
                                    <span class="username">{{ feedback.Nome }} {{ feedback.Cognome }}</span>
                                </header>

                                <section class="comment-body">
                                    <p>{{ feedback.Rating }}</p>
                                    <p>{{ feedback.Descrizione }}</p>
                                </section>
                            </div>
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
const props = defineProps(['lesson'])
const feedbacks = ref([])
const materia = ref('')
const data = ref('')

const close = () => {
    emit('close');
};

onMounted( async () => {
    await fetch(`${globalVariables.API_URL}fetchFeedbacksByLesson:${props.lesson}`)
    .then(res => res.json())
    .then(data => {feedbacks.value = data})
    .then(console.log(feedbacks.value))
    .catch(err => alert(err))

    if(feedbacks.value.length > 0
    ){
        materia.value = feedbacks.value[0].Materia
    data.value = feedbacks.value[0].Data
    }
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
