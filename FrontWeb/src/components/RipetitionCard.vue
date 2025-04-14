<script setup>
import { inject } from 'vue';
import globalVariables from '../../../globalVariables';
const props = defineProps({
    ripetition: {
        type: Object,
        required: true
    }
})

const userId = inject('userId')

async function PrenotaRipetizione() {
    //alert(`Ripetizione nr ${Id}`)
    const response = await fetch(
        `${globalVariables.API_URL}bookSpecificRipetition`,
        {
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                studentId: userId.value,
                ripetitionId: ripetition.Id
            }),
        }
    )
}
</script>

<template>
    <div class="card" style="width: 18rem;">
        <div class="text-center mt-3">
            <i class="bi bi-mortarboard" style="font-size: 3rem; color: #0d6efd;"></i>
        </div>
        <div class="card-body">
            <h5 class="card-title">{{ ripetition.Materia }}</h5>
            <p class="card-text">
                Data: {{ ripetition.Data }}<br>
                Ora: {{ ripetition.OraInizio }} - {{ ripetition.OraFine }}<br>
                Note: {{ ripetition.Note }}
            </p>
            <button class="btn btn-primary" @click="PrenotaRipetizione()">Prenota</button>
        </div>
    </div>
</template>
