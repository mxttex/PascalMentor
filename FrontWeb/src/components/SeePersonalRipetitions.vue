<script setup>
import { inject, onMounted, ref } from 'vue';
const userType = inject('userType')
const userId = inject('userId')
const pastLessons = ref([])
const futureLessons = ref([])
import globalVariables from '../../../globalVariables';
import { formatItalianDate } from '@/common/commonMethods';

onMounted(async () => {
    fetch(`${globalVariables.API_URL}getAllUserRipetition`, {
    method: "POST",
    body: JSON.stringify({id: userId.value}),
    headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(data => { data.forEach(ripetition => {
        ripetition.Data <= Date.now() ? pastLessons.value.push(ripetition) : futureLessons.value.push(ripetition)
    }); })
    .catch(err => console.error('Error fetching subjects:', err));
})

</script>

<template>
<div v-if="userType === `S`">
        <div class="container py-5">
        <h1 class="mb-4">Le tue Ripetizioni</h1>

        <!-- Lezioni Future -->
        <section class="mb-5">
            <h2 class="h5 mb-3">Prossime Lezioni</h2>
            <div class="row g-3">
                <div class="col-md-6 col-lg-4" v-for="lesson in futureLessons" :key="lesson.id">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">{{ lesson.Materia }}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Con: {{ lesson.Insegnante }}</h6>
                            <p class="card-text">Data: {{ formatItalianDate(lesson.Data) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Lezioni Frequentate -->
        <section>
            <h2 class="h5 mb-3">Lezioni Frequentate</h2>
            <div class="row g-3">
                <div class="col-md-6 col-lg-4" v-for="lesson in pastLessons" :key="lesson.id">
                    <div class="card h-100 bg-light border-secondary">
                        <div class="card-body">
                            <h5 class="card-title">{{ lesson.Materia }}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">Con: {{ lesson.Insegnante }}</h6>
                            <p class="card-text">Data: {{ formatItalianDate(lesson.Data) }}</p>
                            <span class="badge bg-success">Completata</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</div>
</template>