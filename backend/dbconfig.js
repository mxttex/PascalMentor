const config = {
    user:"sa",
    password:"ForzaNapoli",
    server: `PC-DI-MATTEO\\SQLEXPRESS`,
    database:"PascalMentor",
    options:{
        trustConnection: true,
        trustServerCertificate: true,
    },
    port:1433
  }
  
  module.exports = config