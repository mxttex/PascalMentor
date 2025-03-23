import React, { useState } from 'react';

function RegistrationModal() {
    const [formData, setFormData] = useState({
        nome: '',
        cognome: '',
        email: '',
        password: '',
        confermaPassword: '',
        indirizzo: 'info',
        dataNascita: ''
    });

    const [type, setType] = useState('studente')

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confermaPassword) {
            alert('Le password non coincidono!');
            return;
        }
        console.log('Dati inviati:', formData);
        alert('Registrazione completata!');
    };

    return (
        <div>
            <button 
                type="button" 
                className="btn btn-primary" 
                data-bs-toggle="modal" 
                data-bs-target="#exampleModal"
            >
                Registrati
            </button>

            {/* Modale */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Registrazione</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Form di registrazione */}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="nome" className="form-label">Nome</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="nome" 
                                        name="nome"
                                        value={formData.nome} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="cognome" className="form-label">Cognome</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="cognome" 
                                        name="cognome"
                                        value={formData.cognome} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        id="email" 
                                        name="email"
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        id="password" 
                                        name="password"
                                        value={formData.password} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="confermaPassword" className="form-label">Conferma Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        id="confermaPassword" 
                                        name="confermaPassword"
                                        value={formData.confermaPassword} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="indirizzo" className="form-label">Indirizzo di studio</label>
                                    <select 
                                        id="indirizzo" 
                                        name="indirizzo" 
                                        className="form-select" 
                                        value={formData.indirizzo} 
                                        onChange={handleChange}
                                    >
                                        <option value="info">Informatica</option>
                                        <option value="auto">Automazione</option>
                                        <option value="bio">Biotecnologie</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="dataNascita" className="form-label">Data di Nascita</label>
                                    <input 
                                        type="date" 
                                        className="form-control" 
                                        id="dataNascita" 
                                        name="dataNascita"
                                        value={formData.dataNascita} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                                    <button type="submit" className="btn btn-primary">Registrati</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistrationModal;
