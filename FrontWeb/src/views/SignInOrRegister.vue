<script>
import LoginForm from '@/components/LoginForm.vue';
import RegisterStudentForm from '../components/RegisterStudentForm.vue'
import RegisterTeacherForm from '../components/RegisterTeacherForm.vue'

export default {
    components: {
        RegisterStudentForm,
        LoginForm,
        RegisterTeacherForm
    },
    data() {
        return {
            action: 'registerStudent'
        }
    },
    methods:{
        changeState(whatToView){
            this.action = whatToView
        }
    }
}
</script>

<template>
    <RegisterStudentForm v-if="this.action == 'registerStudent'" @change-state="changeState" />
    <RegisterTeacherForm v-if="this.action == 'registerTeacher'" @change-state="changeState" />
    <LoginForm v-if="this.action == 'log'" @change-state="changeState" />
</template>