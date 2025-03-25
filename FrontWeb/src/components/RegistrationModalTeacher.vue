<template>
    <div>
        <button type="button" class="btn btn-transparent" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <p>Registrati</p>
        </button>

        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Registrazione</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="handleSubmit">
                            <div class="mb-3">
                                <label for="nome" class="form-label">Nome</label>
                                <input type="text" class="form-control" id="nome" name="nome"
                                    v-model="this.formData.nome" required />
                            </div>

                            <div class="mb-3">
                                <label for="cognome" class="form-label">Cognome</label>
                                <input type="text" class="form-control" id="cognome" name="cognome"
                                    v-model="this.formData.cognome" required />
                            </div>

                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" name="email"
                                    v-model="this.formData.email" required />
                            </div>

                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" name="password"
                                    v-model="this.formData.password" required />
                            </div>

                            <div class="mb-3">
                                <label for="confermaPassword" class="form-label">Conferma Password</label>
                                <input type="password" class="form-control" id="confermaPassword"
                                    name="confermaPassword" v-model="this.confermaPassword" required />
                            </div>

                            <div class="mb-3">
                                <label for="dataNascita" class="form-label">Data di Nascita</label>
                                <input type="date" class="form-control" id="dataNascita" name="dataNascita"
                                    v-model="this.formData.dataNascita" required />
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                                <button type="submit" class="btn btn-primary">Registrati</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
    name: 'RegistrationModal',
    data() {
        return {
            formData: {
                nome: '',
                cognome: '',
                email: '',
                password: '',
                dataNascita: ''
            },
            endpoint: 'http://localhost:8089/api/registerTeacher',
            confermaPassword: ''
        }
    },
    methods: {
        async handleSubmit() {
            try {
                if (this.formData.password !== this.confermaPassword) {
                    alert('Le password non coincidono!');
                    return;
                }

                this.formData.password = CryptoJS.SHA1(this.formData.password)

                let result = await fetch(this.endpoint,
                    {
                        method: "POST",
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify(this.formData)
                    }
                )

                console.log(result)

                if (result.status === 200) {
                    alert("ok")
                }
            }
            catch{
                alert('Errore nella registrazione')
            }
        }

    }
}
</script>

<style scoped>
/* @import "../styles/Navbar.css"; */
button>p {
    background-color: transparent;
    font-size: 23px;
    color: white;
}
</style>