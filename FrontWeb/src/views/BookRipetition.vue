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
    <div class="containers">
        <RipetitionCard v-for="book in list" :key="book.Id" :ripetition="book" />
    </div>
</template>

<style scoped>
.containers {
    display: flex;
    justify-content:center;
    flex-flow: row wrap;
    gap: 30px;
    margin: 10px;
}
</style>