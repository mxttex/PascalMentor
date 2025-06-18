<script setup>
import RipetitionCard from '@/components/RipetitionCard.vue';
import globalVariables from '../../../globalVariables';
import { onMounted, ref, inject } from 'vue';

const list = ref([])
const subjects = inject('subjects') || []
const selectedSubject = ref('')

const alert = ref({
    show: false,
    message: '',
    type: 'success' // 'success', 'danger', 'warning', etc.
})

function showAlert(message, type = 'success', timeout = 3000) {
    alert.value.message = message
    alert.value.type = type
    alert.value.show = true
    setTimeout(() => {
        alert.value.show = false
    }, timeout)
}

const loadAllSubjects = async () => {
    try {
        const response = await fetch(`${globalVariables.API_URL}seeAllRipetition`)
        if (response.status === 200) {
            list.value = await response.json()
        } else {
            showAlert('Errore nel recupero delle ripetizioni', 'danger')
        }
    } catch (error) {
        showAlert('Errore di rete durante il recupero delle ripetizioni', 'danger')
        console.error(error)
    }
}

const loadByFilter = async () => {
    if (selectedSubject.value === '') {
        await loadAllSubjects()
    } else {
        try {
            const response = await fetch(`${globalVariables.API_URL}getEventsBySubject:${selectedSubject.value}`, {
                method: "GET",
                headers: { 'Content-Type': 'application/json' }
            })
            if (response.ok) {
                list.value = await response.json()
            } else {
                showAlert('Errore nel recupero delle ripetizioni filtrate', 'danger')
            }
        } catch (error) {
            showAlert('Errore di rete durante il filtro', 'danger')
            console.error(error)
        }
    }
}

onMounted(async () => {
    await loadAllSubjects()
})
</script>

<template>
    <div>
        <div id="filterBox" class="mb-3">
            <label for="subjectFilter">Filtra per materia:</label>
            <select v-model="selectedSubject" id="subjectFilter" class="form-select w-auto d-inline-block ms-2"
                @change="loadByFilter">
                <option value="">Tutte le materie</option>
                <option v-for="subject in subjects" :key="subject.Id" :value="subject.Id">{{ subject.Nome }}</option>
            </select>
        </div>

        <div v-if="alert.show" :class="`alert alert-${alert.type} alert-dismissible fade show`" role="alert">
            {{ alert.message }}
            <button type="button" class="btn-close" @click="alert.show = false" aria-label="Close"></button>
        </div>

        <div class="containers">
            <RipetitionCard v-for="book in list" :key="book.Id" :ripetition="book" />
        </div>
    </div>
</template>

<style scoped>
.containers {
    display: flex;
    justify-content: center;
    flex-flow: row wrap;
    gap: 30px;
    margin: 10px;
}

#filterBox {
    margin-left: 5.75em;
    margin-top: 0.7em;
    font-size: 1.5em;
    justify-items: center;
}
</style>
