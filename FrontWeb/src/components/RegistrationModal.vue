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
                                <input type="text" class="form-control" id="nome" name="nome" v-model="this.nome"
                                    required />
                            </div>

                            <div class="mb-3">
                                <label for="cognome" class="form-label">Cognome</label>
                                <input type="text" class="form-control" id="cognome" name="cognome"
                                    v-model="this.cognome" required />
                            </div>

                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" name="email" v-model="this.email"
                                    required />
                            </div>

                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" name="password"
                                    v-model="this.password" required />
                            </div>

                            <div class="mb-3">
                                <label for="confermaPassword" class="form-label">Conferma Password</label>
                                <input type="password" class="form-control" id="confermaPassword"
                                    name="confermaPassword" v-model="this.confermaPassword" required />
                            </div>

                            <div class="mb-3">
                                <label for="indirizzo" class="form-label">Indirizzo di studio</label>
                                <select id="indirizzo" name="indirizzo" class="form-select" v-model="this.indirizzo">
                                    <option value="info">Informatica</option>
                                    <option value="auto">Automazione</option>
                                    <option value="bio">Biotecnologie</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label for="dataNascita" class="form-label">Data di Nascita</label>
                                <input type="date" class="form-control" id="dataNascita" name="dataNascita"
                                    v-model="this.dataNascita" required />
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
export default {
    name: 'RegistrationModal',
    data() {
        return {
            nome: '',
            cognome: '',
            email: '',
            password: '',
            confermaPassword: '',
            indirizzo: 'info',
            dataNascita: '',
            type: 'studente'
        }
    },
    methods: {
        handleSubmit() {
            if (this.formData.password !== this.formData.confermaPassword) {
                alert('Le password non coincidono!');
                return;
            }
            console.log('Dati inviati:', this.formData);
            alert('Registrazione completata!');
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