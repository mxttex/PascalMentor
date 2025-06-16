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
            console.dir(pastLessons)
        })
        .catch(err => console.error('Error fetching subjects:', err));
})



</script>

<template>
    <div class="container ss">
        <h1 class="mainTitle">Le tue Ripetizioni</h1>

        <!-- Lezioni Future -->
        <section class="mb-5">
            <h2 class="subTitle">Prossime Lezioni</h2>
            <div class="row g-3">
                <div class="col-md-6 col-lg-4" v-for="lesson in futureLessons" :key="lesson.id">
                    <div class="cardBg">
                        <RipetionCardForInfo :lesson="lesson" />
                    </div>
                </div>
            </div>
        </section>

        <!-- Lezioni Frequentate -->
        <section>
            <h2 class="subTitle">Lezioni Frequentate</h2>
            <div class="row g-3">
                <div class="col-md-6 col-lg-4" v-for="lesson in pastLessons" :key="lesson.id">
                    <div class="cardBg">
                        <RipetionCardForInfo :lesson="lesson" />
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<style scoped>
.ss {
    background: linear-gradient(135deg, #ff9100, #ffd664);
    border-radius: 1em;
    padding: 1.5em;
    align-self: center;
    margin-top: 2em;
}

.mainTitle {
    text-align: center;
    color: white;
    font-size: 3.5em;
    font-weight: bold;
}

.subTitle {
    text-align: left;
    color: white;
    font-size: 2em;
}

.cardBg {
    background: white;
    border-radius: 1em;
    padding: 1em;
}
</style>