<script setup>
import { inject, ref, onMounted } from 'vue';
import globalVariables from '../../../globalVariables';
import { formatItalianDate } from '@/common/commonMethods';
const props = defineProps({
    ripetition: {
        type: Object,
        required: true
    }
})

const userId = inject('userId')
const date = ref()

onMounted(() => {
    date.value = formatItalianDate(props.ripetition.Data)
    console.log(props.ripetition)
})
async function PrenotaRipetizione() {
    //alert(`Ripetizione nr ${Id}`)
    try {
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
    } catch (error) {
        alert('errore')
    }
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
                Insegnante: {{ ripetition.Nome + " " + ripetition.Cognome }} <br>
                Data: {{ date }}<br>
                Ora: {{ ripetition.OraInizio }} - {{ ripetition.OraFine }}<br>
                Note: {{ ripetition.Note }}
            </p>
            <button class="btn btn-primary" @click="PrenotaRipetizione()">Prenota</button>
        </div>
    </div>
</template>
