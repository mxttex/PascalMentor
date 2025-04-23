<template>
    <div class="container mt-5">
        <h1 class="text-center">Login</h1>
        <form @submit.prevent="handleLogin" class="mt-4">
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" name="email" v-model="email" required />
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" v-model="password" required />
            </div>

            <button type="submit" class="btn btn-transparent" :disabled="loading">
                {{ loading ? 'Accesso in corso...' : 'Accedi' }}
            </button>
            <button type="button" class="btn btn-transparent" @click="$emit('change-state', 'register')">
                Non sei registrato? Iscriviti Subito
            </button>
        </form>

        <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
    </div>
</template>

<script setup>
import router from '@/router/index.js';
import globalVariables from '../../../globalVariables.js';
import { SHA1 } from 'crypto-js';
import { inject, ref } from 'vue';

const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');
const endpoint = `${globalVariables.API_URL}log`;
const type = inject('userType');
const id = inject('userId')

async function handleLogin() {
    loading.value = true;
    errorMessage.value = '';

    try {
        const formData = {
            'email': email.value,
            'password': SHA1(password.value).toString()
        };

        let result = await fetch(endpoint, {
            method: "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData),
            credentials: 'include'
        });

        if (!result.ok) throw new Error('Credenziali errate');

        const data = await result.json();
        console.log(data)
        type.value = data.type;
        id.value = data.userId;
        console.log(id.value)
        router.push('/');
    } catch (error) {
        errorMessage.value = error.message || 'Errore nel login';
    } finally {
        loading.value = false;
    }
}
</script>

<style scoped>
.container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
