<template>
    <div class="card h-100 shadow-sm border-0" v-if="type == 'S'">
        <div class="card-body">
            <h5 class="card-title">{{ lesson.Materia }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
                Con: {{ lesson.NomeInsegnante }} {{ lesson.CognomeInsegnante }}
            </h6>
            <p class="card-text mb-0"><i class="bi bi-calendar-event"></i> {{ formatItalianDate(lesson.Data) }}</p>
        </div>
    </div>
    <div v-else>
        <div class="card-body">
            <h5 class="card-title">{{ lesson.Materia }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
                Argomenti: {{ lesson.Note }}
            </h6>
            <h6 class="card-subtitle mb-2 text-muted">Massimo Partecipanti: {{ lesson.NumeroMassimoPartecipanti }}</h6>
            <h6 class="card-subtitle mb-2 text-muted">Iscritti: {{ lesson.NumeroIscritti }}</h6>
            <p class="card-text mb-0"><i class="bi bi-calendar-event"></i> {{ formatItalianDate(lesson.Data) }}</p>
            <button @click="ShowIscrittiModal()">Visualizza Partecipanti</button>
            <button v-if="Date(lesson.Data) < Date.now()"  @click="ShowFeedbackModal()">Visualizza Partecipanti</button>
        </div>
    </div>

    <FeedbackModal v-if="showFeedback"/>
    <PartecipantsModal v-if="showPartecipants"/>
</template>


<script setup>
import { defineProps, ref } from 'vue';
import { formatItalianDate } from '@/common/commonMethods';
defineProps(['lesson','type'])

import FeedbackModal from './FeedbackModal.vue';
import PartecipantsModal from './PartecipantsModal.vue';

const showFeedback = ref(false)
const showPartecipants = ref(false)

const ShowFeedbackModal = () => {
    showFeedback.value = showFeedback.value ?  false :  true
}
const ShowIscrittiModal = () => {
    showPartecipants.value =  showPartecipants.value ?  false :  true
}

</script>