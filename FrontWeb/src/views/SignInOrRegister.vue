<script setup>
import { ref } from 'vue';
import LoginForm from '@/components/LoginForm.vue';
import RegisterStudentForm from '../components/RegisterStudentForm.vue'
import RegisterTeacherForm from '../components/RegisterTeacherForm.vue'

const action = ref('registerStudent')
function changeState(whatToView)
{
    action.value = whatToView
}
</script>

<template>
    <RegisterStudentForm v-if="action == 'registerStudent'" @change-state="changeState" />
    <RegisterTeacherForm v-if="action == 'registerTeacher'" @change-state="changeState" />
    <LoginForm v-if="action == 'log'" @change-state="changeState" />
</template>