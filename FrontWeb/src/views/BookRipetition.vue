<script setup>
import RipetitionCard from '@/components/RipetitionCard.vue';
import globalVariables from '../../../globalVariables';
import { onMounted, ref, inject } from 'vue';
const list = ref()
const subjects = inject('subjects');

onMounted(async () => {
    const response = await fetch(
        `${globalVariables.API_URL}seeAllRipetition`
    )
    if (response.status == 200) {
        // const data = await response.json()
        // list.value = data
        list.value = await response.json()
    }

    else
        alert('errore nel recupero delle ripetizioni')
})
</script>

<template>

    <div>
        <div class="d-flex flex-wrap gap-3">
            <div id="filterBox">
                <label for="subjectFilter">Filtra per materia:</label>
                <select v-model="selectedSubject" id="subjectFilter" class="form-select w-auto d-inline-block ms-2">
                    <option>Tutte le materie</option>
                    <option v-for="subject in subjects" :key="subject.Id" :value="subject.Id" value="">{{ subject.Nome }}</option>                    
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