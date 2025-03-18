import '../styles/RegistrationModal.css'
function RegistrationModal() {
    return (
        <div className="model-dialog model-dialog-centred">
            <button type="button" class="btn btn-transparent nice-text" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Registrati
            </button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Registrazione</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <label htmlFor="studentNamePicker">Nome dello studente:</label>
                            <input type="text" className='rounded-3' placeholder="Nome" id="studentNamePicker"/>
                            <input type="text" className='rounded-3' placeholder="Cognome" id="studentSurnamePicker" />
                            <input type="email" className='rounded-3' placeholder="Email" id="studentEmailPicker" />
                            <input type="password" className='rounded-3' placeholder="Password" id="studentPasswordPicker" />
                            <input type="password"  className='rounded-3' placeholder="Conferma Password" id="studentConfirmPassword" />
                            <br />
                            <select name="indirizzo" id="indirizzo" className='rounded-3'>
                                <option value="info">Informatica</option>
                                <option value="auto">Automazione</option>
                                <option value="bio">Biotecnologie</option>
                            </select>
                            <br />
                            <input type="date" className='rounded-3' placeholder="Data Di Nascita" id="studentBirthPicker" />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegistrationModal