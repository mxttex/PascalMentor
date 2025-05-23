<template>
    <div class="card h-100 shadow-sm border-0">
        <div class="card-body">
            <h5 class="card-title">{{ lesson.Materia }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
                Con: {{ lesson.NomeInsegnante }} {{ lesson.CognomeInsegnante }}
            </h6>
            <p class="card-text mb-0"><i class="bi bi-calendar-event"></i> {{ formatItalianDate(lesson.Data) }}</p>
        </div>
    </div>
</template>


<script setup>
import { defineProps } from 'vue';
import { formatItalianDate } from '@/common/commonMethods';
defineProps(['lesson'])
</script>