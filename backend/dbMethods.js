const config = require("./dbconfig.js");
const sql = require("mssql");

const AddNewUser = async (body) => {
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

const TryToLog = async (body) => {
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
const CreateNewEvent = async (form) => {
  try {
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

const FetchSubjects = async () => {
  try {
    let pool = await sql.connect(config);
    let insertion = await pool.request().query('SELECT * FROM Materie')
    return insertion.recordsets
  } catch (error) {
    console.error(error);
    return undefined;
  }

}

const FetchAllRipetitions = async () => {
  try {
    let pool = await sql.connect(config);
    let insertion = await pool.request().query(`SELECT Utenti.Nome as Nome, Cognome, Ripetizioni.Id, Data, OraInizio, OraFine, NumeroMassimoPartecipanti, Note , Materie.Nome as Materia 
                                                FROM (Ripetizioni JOIN Utenti ON Insegnante = Utenti.Id) JOIN Materie on Materia = Materie.Id
                                                WHERE NumeroIscritti < NumeroMassimoPartecipanti AND Data >= GETDATE()`)
    return insertion.recordsets
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

const BookRipetition = async (body) => {
  try {
    let pool = await sql.connect(config);
    let insertion = await pool.request()
      .input("studente", sql.Int, body.studentId)
      .input("ripetizione", sql.Int, body.ripetitionId)
      .query("INSERT INTO Partecipazioni(Studente, Ripetizione) VALUES (@studente, @ripetizione)")
    return insertion.rowsAffected
  } catch (error) {
    console.log(error)
    return undefined
  }
}

const UpdateSubscribersInSpecificRipetition = async (id) => {
  try {
    let pool = await sql.connect(config);
    let insertion = await pool.request()
      .input("id", sql.Int, id)
      .query('UPDATE Ripetizioni SET NumeroIscritti += 1 WHERE Id=@id')
    return insertion.rowsAffected
  } catch (error) {
    console.log(error)
    return undefined

  }
}
const IsSpecificRipetitionAvailable = async (id) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request()
      .input("id", sql.Int, id)
      .query('SELECT NumeroMassimoPartecipanti, NumeroIscritti FROM Ripetizioni WHERE Id = @id');
    const ripetizione = result.recordset[0];
    return ripetizione.NumeroIscritti < ripetizione.NumeroMassimoPartecipanti;
  } catch (error) {
    console.error(error);
    return false;
  }
}

const FetchRipetionsByUserId = async (body) => {
  try {
    let query = body.type === 'S' ? `SELECT *
              FROM Ripetizioni JOIN Partecipazioni ON Ripetizione = Id
              WHERE Partecipazioni.Studente = @id`
      :
      `SELECT *
              FROM Ripetizioni 
              WHERE Insegnante = @id`

    let pool = await sql.connect(config)
    let result = await pool.request()
      .input('id', sql.Int, body.id)
      .query(query)

    return result.recordsets
  } catch (error) {
    console.log(error)
    return undefined
  }
}

const FilterEventBySubject = async (subject) => {
  try {
    let pool = await sql.connect(config)
    let results = await pool.request()
      .input('materia', sql.VarChar, subject)
      .query(
        `SELECT Utenti.Nome as Nome, Cognome, Ripetizioni.Id, Data, OraInizio, OraFine, NumeroMassimoPartecipanti, Note , Materie.Nome as Materia 
                                                FROM (Ripetizioni JOIN Utenti ON Insegnante = Utenti.Id) JOIN Materie on Materia = Materie.Id
                                                WHERE NumeroIscritti < NumeroMassimoPartecipanti AND Data >= GETDATE() AND Materia = @materia`
      )

    return results.recordsets
  } catch (error) {
    console.log(error)
    return undefined
  }
}


module.exports = {
  FetchAllRipetitions: FetchAllRipetitions,
  AddNewUser: AddNewUser,
  TryToLog: TryToLog,
  CreateEvent: CreateNewEvent,
  fetchSubjects: FetchSubjects,
  BookRipetition: BookRipetition,
  GetRipetitionsById: FetchRipetionsByUserId,
  UpdateSubscribersInSpecificRipetition: UpdateSubscribersInSpecificRipetition,
  IsSpecificRipetitionAvailable: IsSpecificRipetitionAvailable,
  FilterEventBySubject: FilterEventBySubject
};