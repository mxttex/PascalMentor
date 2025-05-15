<script setup>
import RipetitionCard from '@/components/RipetitionCard.vue';
import globalVariables from '../../../globalVariables';
import { onMounted, ref, inject } from 'vue';
const list = ref()
const subjects = inject('subjects');
const selectedSubject = ref('')

onMounted(async () => { await loadAllSubjects() })

const loadAllSubjects = async () => {
    const response = await fetch(
        `${globalVariables.API_URL}seeAllRipetition`
    )
    if (response.status == 200)
        list.value = await response.json()
    else
        alert('errore nel recupero delle ripetizioni')

}

const loadByFilter = async () => {
    if (selectedSubject.value == ``)
        loadAllSubjects()
    else {
        console.log(selectedSubject.value)
        fetch(
            `${globalVariables.API_URL}getEventsById:${selectedSubject.value}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        }
        )
            .then(res => res.json())
            .then(data => { list.value = data; })
            .catch(err => console.error('Error fetching subjects:', err));
    }
}
</script>

<template>

    <div>
        <div>
            <div id="filterBox">
                <label for="subjectFilter">Filtra per materia:</label>
                <select v-model="selectedSubject" id="subjectFilter" class="form-select w-auto d-inline-block ms-2"
                    @change="loadByFilter()">
                    <option value="">Tutte le materie</option>
                    <option v-for="subject in subjects" :key="subject.Id" :value="subject.Id" value="">{{ subject.Nome
                        }}</option>
                </select>
            </div>
            <br>
            <div class="containers">
                <RipetitionCard v-for="book in list" :key="book.Id" :ripetition="book" />
            </div>

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
}
</style>