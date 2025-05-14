<script setup>
import { onMounted, ref } from 'vue';
import RipetitionCard from './RipetitionCard.vue';
import { inject } from 'vue';
const userId = inject('userId')
const userType = inject('userType')
import globalVariables from '../../../globalVariables';
const ripetitions = ref({})
onMounted(async () => {
    let response = await fetch(
        `${globalVariables.API_URL}getAllUserRipetition`,
        {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                type : userType.value,
                id : userId.value
            })
        }
    )
    let data = response.json()
    ripetitions.value = data
    console.log(data)
})
</script>

<template>
    <v-for >
        <RipetitionCard v-for="ripetition in list" :key="ripetition.Id" :ripetition="book" />
    </v-for>
</template>