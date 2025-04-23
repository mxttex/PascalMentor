<script setup>
import { ref } from 'vue';
import LoginForm from '@/components/LoginForm.vue';
import RegisterUser from '@/components/RegisterUser.vue';
const action = ref('register')
function changeState(whatToView) {
    action.value = whatToView
}
</script>

<template>
    <div class="eighty-percent">
        <RegisterUser v-if="action == 'register'" @change-state="changeState" />
        <LoginForm v-if="action == 'log'" @change-state="changeState" />
    </div>
</template>