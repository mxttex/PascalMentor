<script setup>
import RipetionCardForInfo from '@/components/RipetionCardForInfo.vue';
import { inject, onMounted, ref } from 'vue';
const userType = inject('userType')
const userId = inject('userId')
const pastLessons = ref([])
const futureLessons = ref([])
import globalVariables from '../../../globalVariables';

onMounted(async () => {
    fetch(`${globalVariables.API_URL}getAllUserRipetition`, {
        method: "POST",
        body: JSON.stringify({ id: userId.value, type: userType.value }),
        headers: { 'Content-Type': 'application/json' },
    })
        .then(res => res.json())
        .then(data => {
            data.forEach(ripetition => {
                new Date(ripetition.Data) <= Date.now() ? pastLessons.value.push(ripetition) : futureLessons.value.push(ripetition)
            });
            console.log(pastLessons)
        })
        .catch(err => console.error('Error fetching subjects:', err));
})



</script>

<template>
        <div class="container py-5">
            <h1 class="mb-4">Le tue Ripetizioni</h1>

            <!-- Lezioni Future -->
            <section class="mb-5" >
                <h2 class="h5 mb-3">Prossime Lezioni</h2>
                <div class="row g-3">
                    <div class="col-md-6 col-lg-4" v-for="lesson in futureLessons" :key="lesson.id">
                        <RipetionCardForInfo :lesson="lesson" />
                    </div>
                </div>
            </section>

            <!-- Lezioni Frequentate -->
            <section>
                <h2 class="h5 mb-3">Lezioni Frequentate</h2>
                <div class="row g-3">
                    <div class="col-md-6 col-lg-4" v-for="lesson in pastLessons" :key="lesson.id">
                        <RipetionCardForInfo :lesson="lesson" />
                    </div>
                </div>
            </section>

        </div>
</template>