<template>
    <div class="card h-100 shadow-sm border-0" v-if="type == 'S'">
        <div class="card-body">
            <h5 class="card-title mainTitle">{{ lesson.Materia }}</h5>
            <h6 class="card-subtitle mb-2 text-muted sub">
                <router-link class="normalText" :to="`/teacherInfo:${lesson.Insegnante}`">Con: {{ lesson.NomeInsegnante }} {{
                    lesson.CognomeInsegnante }}</router-link>
            </h6>
            <p class="card-text mb-2 sub"><i class="bi bi-calendar-event"></i> {{ formatItalianDate(lesson.Data) }}</p>
            <button v-if="new Date(lesson.Data) < Date.now() && lesson.FeedbackGiaLasciato == 0"
                @click="ShowLeaveFeedback(lesson.Id)" class="defaultButton">Lascia Feedback</button>
        </div>
    </div>
    <div v-else>
        <div class="card-body">
            <h5 class="card-title mainTitle">{{ lesson.Materia }}</h5>
            <h6 class="card-subtitle mb-2 text-muted sub">
                Argomenti: {{ lesson.Note }}
            </h6>
            <h6 class="card-subtitle mb-2 text-muted sub">Massimo Partecipanti: {{ lesson.NumeroMassimoPartecipanti }}
            </h6>
            <h6 class="card-subtitle mb-2 text-muted sub">Iscritti: {{ lesson.NumeroIscritti }}</h6>
            <p class="card-text mb-2 sub"><i class="bi bi-calendar-event"></i> {{ formatItalianDate(lesson.Data) }}</p>
            <div style="display: flex; justify-content: space-between;">
                <button @click="ShowIscrittiModal(lesson.Id)" class="defaultButton sub">Visualizza Partecipanti</button>
                <button v-if="new Date(lesson.Data) < Date.now()" @click="ShowFeedbackModal(lesson.Id)"
                    class="defaultButton sub">Visualizza i Feedback</button>
            </div>
        </div>
    </div>

    <FeedbackModal v-if="showFeedback" @close="CloseModal('')" :lesson="ripetitionId"></FeedbackModal>
    <PartecipantsModal v-if="showPartecipants" :ripetition="ripetitionId" @close="CloseModal('seePartecipants')" />
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
    showFeedback.value = showFeedback.value ? false : true
}
const ShowIscrittiModal = (id) => {
    ripetitionId.value = id
    showPartecipants.value = showPartecipants.value ? false : true
}

const ShowLeaveFeedback = (id) => {
    ripetitionId.value = id
    showLeaveFeedback.value = true
}

const CloseModal = (whichModal) => {
    switch (whichModal) {
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

<style scoped>
.mainTitle {
    font-size: 1.4em;
    font-weight: bold;
    text-align: center;
    margin-top: 0.2em;
    margin-bottom: 0.2em;
}

.sub {
    margin-top: 0.2em;
    margin-bottom: 0.2em;
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

.normalText{
    text-decoration: none;
    color: black;
}
</style>