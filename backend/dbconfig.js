//cambia questo file con i dati per connetterti al tuo db

const config = {
    user:"sa",
    password:"ForzaNapoli",
    server: `PC-DI-Matteo//SQLEXPRESS`,
    database:"PascalMentor",
    options:{
        trustConnection: true,
        trustServerCertificate: true,
    },
    port:1433
}

module.exports = config