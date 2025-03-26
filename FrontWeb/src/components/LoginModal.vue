<template>
    <div class="container mt-5">
        <h1 class="text-center">Login</h1>
        <form @submit.prevent="handleSubmit" class="mt-4">
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" name="email" v-model="formData.email" required />
            </div>

            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password" name="password" v-model="formData.password" required />
            </div>

            <button type="submit" class="btn btn-primary">Accedi</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'LoginPage',
    data() {
        return {
            formData: {
                email: '',
                password: ''   
            },
            endpoint: 'http://localhost:8089/api/log'
        }
    },
    methods: {
        async handleSubmit() {
            try {
                let result = await fetch(this.endpoint, {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(this.formData)
                });

                if (result.status === 200) {
                    alert("Login effettuato con successo");
                } else {
                    alert("Credenziali errate");
                }
            } catch {
                alert('Errore nel login');
            }
        }
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
