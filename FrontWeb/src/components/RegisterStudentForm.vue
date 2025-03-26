<template>
    <div class="container mt-5">
        <h1 class="text-center">Studente</h1>
        <form @submit.prevent="handleSubmit" class="mt-4">
            <div class="mb-3">
                <label for="nome" class="form-label">Nome</label>
                <input type="text" class="form-control" id="nome" name="nome" v-model="formData.nome" required />
            </div>

            <div class="mb-3">
                <label for="cognome" class="form-label">Cognome</label>
                <input type="text" class="form-control" id="cognome" name="cognome" v-model="formData.cognome" required />
            </div>

            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" name="email" v-model="formData.email" required />
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" v-model="password" required />
            </div>

            <div class="mb-3">
                <label for="confermaPassword" class="form-label">Conferma Password</label>
                <input type="password" class="form-control" id="confermaPassword" name="confermaPassword" v-model="confermaPassword" required />
            </div>

            <div class="mb-3">
                <label for="indirizzo" class="form-label">Indirizzo di studio</label>
                <select id="indirizzo" name="indirizzo" class="form-select" v-model="formData.indirizzo">
                    <option value="info">Informatica</option>
                    <option value="auto">Automazione</option>
                    <option value="bio">Biotecnologie</option>
                </select>
            </div>

            <div class="mb-3">
                <label for="dataNascita" class="form-label">Data di Nascita</label>
                <input type="date" class="form-control" id="dataNascita" name="dataNascita" v-model="formData.dataNascita" required />
            </div>

            <button type="submit" class="btn btn-transparent">Registrati</button>
            <button type="button" class="btn btn-transparent" @click="$emit('change-state', 'registerTeacher')">Sei un insegnante?</button>
            <button type="button" class="btn btn-transparent" @click="$emit('change-state', 'log')">Sei già registrato? Loggati!</button>
        </form>
        
    </div>
</template>

<script>
    import CryptoJS from 'crypto-js'
    import globalVariables from '../../globalVariables.js'
    export default{
    name: 'RegistrationPage',
    data() {
        return {
            formData: {
                nome: '',
                cognome: '',
                email: '',
                password: '',
                indirizzo: 'info',
                dataNascita: ''
            },
            endpoint: `${globalVariables.API_URL}registerStudent`,
            confermaPassword: '',
            password : ''
        }
    },
    methods: {
        async handleSubmit() {
            try {
                if (this.password !== this.confermaPassword) {
                    alert('Le password non coincidono!');
                    return;
                }

                this.formData.password = CryptoJS.SHA1(this.password).toString();
                let result = await fetch(this.endpoint, {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(this.formData)
                });

                if (result.status === 200) {
                    alert("Registrazione avvenuta con successo");
                }
            } catch {
                alert('Errore nella registrazione');
            }
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 500px;
    margin: auto;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>