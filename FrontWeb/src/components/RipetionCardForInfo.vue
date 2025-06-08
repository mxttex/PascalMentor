<template>
    <div class="card h-100 shadow-sm border-0" v-if="type == 'S'">
        <div class="card-body">
            <h5 class="card-title">{{ lesson.Materia }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
                Con: {{ lesson.NomeInsegnante }} {{ lesson.CognomeInsegnante }}
            </h6>
            <p class="card-text mb-0"><i class="bi bi-calendar-event"></i> {{ formatItalianDate(lesson.Data) }}</p>
            <button v-if="new Date(lesson.Data) < Date.now() && lesson.FeedbackGiaLasciato == 0" @click="ShowLeaveFeedback(lesson.Id)">Lascia Feedback</button>
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
            <button @click="ShowIscrittiModal(lesson.Id)">Visualizza Partecipanti</button>
            <button v-if="new Date(lesson.Data) < Date.now()" @click="ShowFeedbackModal(lesson.Id)">Visualizza i Feedback</button>
        </div>
    </div>

    <FeedbackModal v-if="showFeedback" @close="CloseModal('')" :lesson="ripetitionId"></FeedbackModal>
    <PartecipantsModal v-if="showPartecipants" :ripetition="ripetitionId" @close="CloseModal('seePartecipants')"/>
    <LeaveFeedback :ripetition-id="ripetitionId" @close="CloseModal('leavefeedback')" v-if="showLeaveFeedback" />
</template>


<script setup>
import { defineProps, inject, ref } from 'vue';
import { formatItalianDate } from '@/common/commonMethods';
const props = defineProps(['lesson'])

import FeedbackModal from './FeedbackModal.vue';
import PartecipantsModal from './PartecipantsModal.vue';
import LeaveFeedback from './LeaveFeedback.vue';

const showFeedback = ref(false)
const showPartecipants = ref(false)
const showLeaveFeedback = ref(false)
const ripetitionId = ref(undefined)
const type = inject('userType')

const ShowFeedbackModal = (id) => {
    ripetitionId.value = id
    showFeedback.value = showFeedback.value ?  false :  true
}
const ShowIscrittiModal = (id) => {
    ripetitionId.value = id
    showPartecipants.value =  showPartecipants.value ?  false :  true
}

const ShowLeaveFeedback = (id) => {
    ripetitionId.value = id
    showLeaveFeedback.value = true
} 

const CloseModal = (whichModal) => {
    switch(whichModal){
        case 'leavefeedback':
            showLeaveFeedback.value = false;
            ripetitionId.value = undefined
            break
        case 'seePartecipants':
            showPartecipants.value = false;
            ripetitionId.value = undefined
            break
        default:
            showFeedback.value = false;
            ripetitionId.value = undefined
            break
    }
}

</script>