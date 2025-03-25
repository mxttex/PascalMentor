<script>
import RegistrationModalStudent from '../components/RegistrationModalStudent.vue'
import RegistrationModalTeacher from '../components/RegistrationModalTeacher.vue'
import LoginModal from '@/components/LoginModal.vue';

export default {
    components: {
        RegistrationModalStudent,
        LoginModal,
        RegistrationModalTeacher
    },
    data() {
        return {
            action: 'registerStudent'
        }
    }
}
</script>

<template>
    <div class="mb-3">
        <select id="indirizzo" name="indirizzo" class="form-select" v-model="this.action">
            <option value="registerStudent">Registra Studente</option>
            <option value="registerTeacher">Registra Insegnante</option>
            <option value="log">Loggati</option>
        </select>
    </div>
    <RegistrationModalStudent v-if="this.action == 'registerStudent'" />
    <RegistrationModalTeacher v-if="this.action == 'registerTeacher'" />
    <LoginModal v-if="this.action == 'log'" />
</template>