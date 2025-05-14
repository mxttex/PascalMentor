<script setup>
import RipetitionCard from '@/components/RipetitionCard.vue';
import globalVariables from '../../../globalVariables';
import { onMounted, ref } from 'vue';
const list = ref()

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
    <div class="d-flex flex-wrap gap-3">
        <div class="mb-3">
            <label for="subjectFilter">Filtra per materia:</label>
            <select v-model="selectedSubject" id="subjectFilter" class="form-select w-auto d-inline-block ms-2">
                <option value="">Tutte le materie</option>
                <option v-for="subject in availableSubjects" :key="subject" :value="subject">
                    {{ subject }}
                </option>
            </select>
        </div>
        <br>
        <RipetitionCard v-for="book in list" :key="book.Id" :ripetition="book" />
    </div>
</template>