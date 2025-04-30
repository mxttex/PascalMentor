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
})
async function PrenotaRipetizione() {
    try {
        const response = await fetch(
        `${globalVariables.API_URL}bookSpecificRipetition`,
        {
            headers: { 'Content-type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                studentId: userId.value,
                ripetitionId: props.ripetition.Id
            }),
        }
    )
    if(response.ok){
        alert('Ripetizione Prenotate con Successo')
    }
    else{
        alert(response.errorMessage)
    }
    } catch (error) {
        alert(error)
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
                Ora: {{ ripetition.OraInizio.split('T')[1].substring(0, 5) }} - {{ ripetition.OraFine.split('T')[1].substring(0, 5) }}<br>
                Note: {{ ripetition.Note }}
            </p>
            <button class="btn btn-primary" @click="PrenotaRipetizione()">Prenota</button>
        </div>
    </div>
</template>
