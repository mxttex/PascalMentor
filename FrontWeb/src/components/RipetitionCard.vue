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
        if (response.ok) {
            alert('Ripetizione Prenotate con Successo')
        }
        else {
            const errorMessage = await response.text()
            alert(errorMessage)
        }
    } catch (error) {
        alert(error)
    }
}
</script>

<template>
    <div class="card" style="width: 18rem;">
        <div class="text-center mt-3">
            <i class="bi bi-mortarboard" style="font-size: 3rem; color: #ff9100"></i>
        </div>
        <div class="card-body" style="justify-items: center;">
            <h5 class="card-title mainTitle">{{ ripetition.Materia }}</h5>
            <p class="card-text subTitle">
                Insegnante: {{ ripetition.Nome + " " + ripetition.Cognome }} <br>
                Data: {{ date }}<br>
                Ora: {{ ripetition.OraInizio.split('T')[1].substring(0, 5) }} - {{
                    ripetition.OraFine.split('T')[1].substring(0, 5) }}<br>
                Note: {{ ripetition.Note }}
            </p>
            <button class="btn btn-primary defaultButton" @click="PrenotaRipetizione()">Prenota</button>
        </div>
    </div>
</template>

<style scoped>
.mainTitle {
    text-align: center;
    font-size: 2em;
    font-weight: bold;
}

.subTitle {
    text-align: center;
    font-size: 1em;
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