<template>
    <div class="container mt-5">
        <h1 class="text-center title">Login</h1>
        <form @submit.prevent="handleLogin" class="mt-4">
            <div class="mb-3">
                <label for="email" class="form-label text">Email</label>
                <input type="email" class="form-control" id="email" name="email" v-model="email" required />
            </div>

            <div class="mb-3">
                <label for="password" class="form-label text">Password</label>
                <input type="password" class="form-control" id="password" name="password" v-model="password" required />
            </div>

            <button type="submit" class="btn btn-transparent" :disabled="loading">
                <p class="text">{{ loading ? 'Accesso in corso...' : 'Accedi' }}</p>
            </button>
            <button type="button" class="btn btn-transparent" @click="$emit('change-state', 'register')">
                <p class="text">Non sei registrato? Iscriviti Subito</p>
            </button>
        </form>

        <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import {SHA256} from 'crypto-js'
import { inject, ref } from 'vue';

const email = ref<string>('')
const password = ref<string>('');
const loading = ref<boolean>(false);
const errorMessage = ref<string>('');
const endpoint = `http://localhost:8089/api/log`;
const type = inject<UserType>('userType') ;
const id = inject<string>('userId')

const handleLogin = async (): Promise<void> => {
   loading.value = true;
    errorMessage.value = '';

    try {
        const formData = {
            'email': email.value,
            'password': SHA256(password.value).toString()
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
        type!.valueOf = data.type;
        id!.valueOf = data.userId;
        console.log(id!.valueOf)
        router.push('/');
    } catch (error:any) {
        errorMessage.value = error.message || 'Errore nel login';
    } finally {
        loading.value = false;
    }
}
</script>