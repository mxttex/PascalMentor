const config = require('./dbconfig.js')
const sql = require('mmsql')

async function AddNewStudent(body) {
    try{
        let pool = await sql.connect(config);
        let insertion = await pool.request()
        .input('name', sql.VarChar, body[0])
        .input('surname', sql.VarChar, body[1])
        .input('mail', sql.VarChar, body[2])
        .input('psw', sql.VarChar, body[3])
        .input('indirizzo', sql.VarChar, body[4])
        .input('dataNascita', sql.VarChar, body[5])
        .query(
            'INSERT into Studenti(Nome, Cognome, Mail, Password, Indirizzo, DataDiNascita) values(@name, @surname, @mail, @psw, @indirizzo, @dataNascita'
        )
        return insertion.recordset
        
    }
    catch (error){
        console.error(error)
        return undefined
    }
}
async function AddNewTeacher(body) {
    try{
        let pool = await sql.connect(config);
        let insertion = await pool.request()
        .input('name', sql.VarChar, body[0])
        .input('surname', sql.VarChar, body[1])
        .input('mail', sql.VarChar, body[2])
        .input('psw', sql.VarChar, body[3])
        .input('dataNascita', sql.VarChar, body[4])
        .query(
            'INSERT into Insegnanti(Nome, Cognome, Mail, Password, DataDiNascita) values(@name, @surname, @mail, @psw, @dataNascita'
        )
        return insertion.recordset
        
    }
    catch (error){
        console.error(error)
        return undefined
    }
}

module.exports = {
    AddNewStudent: AddNewStudent,
    AddNewTeacher: AddNewTeacher
}