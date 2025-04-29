const config = require("./dbconfig.js");
const sql = require("mssql");

async function AddNewUser(body) {
  try {
    let query = body.tipo === "I" ?  
    `INSERT INTO Utenti 
    (Nome, Cognome, Tipo, Mail, Password, DataDiNascita, DataIscrizione, IndirizzoDiStudio) 
    VALUES 
    (@name, @surname, @tipo, @mail, @psw, CAST(@dataNascita AS DATE), GETDATE())`
    : 
    `INSERT INTO Utenti 
    (Nome, Cognome, Tipo, Mail, Password, DataDiNascita, DataIscrizione, IndirizzoDiStudio) 
    VALUES 
    (@name, @surname, @tipo, @mail, @psw, CAST(@dataNascita AS DATE), GETDATE(), @indirizzo)`
    ;
    let pool = await sql.connect(config);
    let insertion = await pool
      .request()
      .input("name", sql.VarChar, body.nome)
      .input("surname", sql.VarChar, body.cognome)
      .input("mail", sql.VarChar, body.email)
      .input("psw", sql.VarChar, body.password)
      .input("dataNascita", sql.VarChar, body.dataNascita)
      .input("indirizzo", sql.VarChar, body.indirizzo || null)
      .input("tipo", sql.Char, body.type) 
      .query(query)
    return insertion.rowsAffected;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

async function TryToLog(body) {
  try {
    let pool = await sql.connect(config);
    
    let insertion = await pool
      .request()
      .input("mail", sql.VarChar, body.email)
      .input("psw", sql.VarChar, body.password)
      .query(
        `SELECT ID, Nome, Cognome, Tipo, Mail, RatingMedio, DataDiNascita, DataIscrizione, IndirizzoDiStudio 
        FROM Utenti 
        WHERE mail=@mail AND password=@psw`
      );
    return insertion.recordset

  } catch (error) {
    console.log(error)
    return undefined
  }
}
async function CreateNewEvent(form) {
  try {
    console.log(form)
    let pool = await sql.connect(config);
    let insertion = await pool
      .request()
      .input("subject", sql.Int, form.Materia)
      .input("date", sql.Date, form.Data)
      .input("startTime", sql.VarChar, form.OraInizio)
      .input("endTime", sql.VarChar, form.OraFine)
      .input("notes", sql.VarChar, form.Note)
      .input("nrMaxPartecipants", sql.Int, form.NumeroMassimoPartecipanti)
      .input("teacher", sql.Int, form.Insegnante)
      .query(
        `INSERT into Ripetizioni(Insegnante, Data, OraInizio, OraFine, NumeroMassimoPartecipanti, Materia, Note) 
        values (@teacher, CAST(@date as DATE), CAST(@startTime AS TIME), CAST(@endTime AS TIME), @nrMaxPartecipants, @subject, @notes)`
      );

    return insertion.rowsAffected;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

async function FetchSubjects() {
  try {
    let pool = await sql.connect(config);
    let insertion = await pool.request().query('SELECT * FROM Materie')
    return insertion.recordsets
  } catch (error) {
    console.error(error);
    return undefined;
  }
  
}

async function FetchAllRipetitions() {
  try {
    let pool = await sql.connect(config);
    let insertion = await pool.request().query('SELECT Utenti.Nome as Nome, Cognome, Ripetizioni.Id, Data, OraInizio, OraFine, NumeroMassimoPartecipanti, Note , Materie.Nome as Materia FROM (Ripetizioni JOIN Utenti ON Insegnante = Utenti.Id) JOIN Materie on Materia = Materie.Id')
    return insertion.recordsets
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

module.exports = {
  FetchAllRipetitions: FetchAllRipetitions,
  AddNewUser: AddNewUser,
  TryToLog: TryToLog,
  CreateEvent: CreateNewEvent,
  fetchSubjects: FetchSubjects,
};
