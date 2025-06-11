const config = require("./dbconfig")
const sql = require("mssql");

const AddNewUser = async (body) => {
  try {
    let query =
      body.tipo === "I"
        ? `INSERT INTO Utenti 
    (Nome, Cognome, Tipo, Mail, Password, DataDiNascita, DataIscrizione, IndirizzoDiStudio) 
    VALUES 
    (@name, @surname, @tipo, @mail, @psw, CAST(@dataNascita AS DATE), GETDATE())`
        : `INSERT INTO Utenti 
    (Nome, Cognome, Tipo, Mail, Password, DataDiNascita, DataIscrizione, IndirizzoDiStudio) 
    VALUES 
    (@name, @surname, @tipo, @mail, @psw, CAST(@dataNascita AS DATE), GETDATE(), @indirizzo)`;
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
      .query(query);
    return insertion.rowsAffected;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

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
    return insertion.recordset;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
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
};

const FetchSubjects = async () => {
  try {
    let pool = await sql.connect(config);
    let insertion = await pool.request().query("SELECT * FROM Materie");
    return insertion.recordsets;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const FetchAllRipetitions = async () => {
  try {
    let pool = await sql.connect(config);
    let insertion = await pool.request()
      .query(`SELECT Utenti.Nome as Nome, Cognome, Ripetizioni.Id, Data, OraInizio, OraFine, NumeroMassimoPartecipanti, Note , Materie.Nome as Materia 
                                                FROM (Ripetizioni JOIN Utenti ON Insegnante = Utenti.Id) JOIN Materie on Materia = Materie.Id
                                                WHERE NumeroIscritti < NumeroMassimoPartecipanti AND Data >= GETDATE()`);
    return insertion.recordsets;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const BookRipetition = async (body) => {
  try {
    let pool = await sql.connect(config);
    let insertion = await pool
      .request()
      .input("studente", sql.Int, body.studentId)
      .input("ripetizione", sql.Int, body.ripetitionId)
      .query(
        "INSERT INTO Partecipazioni(Studente, Ripetizione) VALUES (@studente, @ripetizione)"
      );
    return insertion.rowsAffected;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const UpdateSubscribersInSpecificRipetition = async (id) => {
  try {
    let pool = await sql.connect(config);
    let insertion = await pool
      .request()
      .input("id", sql.Int, id)
      .query("UPDATE Ripetizioni SET NumeroIscritti += 1 WHERE Id=@id");
    return insertion.rowsAffected;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
const IsSpecificRipetitionAvailable = async (id) => {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(
        "SELECT NumeroMassimoPartecipanti, NumeroIscritti FROM Ripetizioni WHERE Id = @id"
      );
    const ripetizione = result.recordset[0];
    return ripetizione.NumeroIscritti < ripetizione.NumeroMassimoPartecipanti;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const FetchRipetionsByUserId = async (body) => {
  try {
    let query =
      body.type === "S"
        ? `SELECT Ripetizioni.Id, Data, OraInizio, OraFine, Utenti.Nome as NomeInsegnante, Utenti.Cognome as CognomeInsegnante, Materie.Nome as Materia, Note, Partecipazioni.FeedbackGiaLasciato as FeedbackGiaLasciato
             FROM ((Ripetizioni JOIN Partecipazioni ON Ripetizione = Id) JOIN Utenti on Utenti.ID = Insegnante) JOIN Materie ON Materia = Materie.Id
             WHERE Partecipazioni.Studente = @id`
        : `SELECT Ripetizioni.Id, Data, OraInizio, OraFine, NumeroMassimoPartecipanti, NumeroIscritti, Insegnante, Materie.Nome as Materia, Note
             FROM Ripetizioni JOIN Materie on Materia = Materie.Id
             WHERE Insegnante = @id`;

    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, body.id)
      .query(query);

    return result.recordsets;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const FilterEventBySubject = async (subject) => {
  try {
    let pool = await sql.connect(config);
    let results = await pool
      .request()
      .input("materia", sql.VarChar, subject)
      .query(
        `SELECT Utenti.Nome as Nome, Cognome, Ripetizioni.Id, Data, OraInizio, OraFine, NumeroMassimoPartecipanti, Note , Materie.Nome as Materia 
                                                FROM (Ripetizioni JOIN Utenti ON Insegnante = Utenti.Id) JOIN Materie on Materia = Materie.Id
                                                WHERE NumeroIscritti < NumeroMassimoPartecipanti AND Data >= GETDATE() AND Materia = @materia`
      );

    return results.recordsets;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const AddFeedback = async (body) => {
  try {
    let pool = await sql.connect(config);
    let insertion = await pool
      .request()
      .input("Voto", sql.Float, body.voto)
      .input("Descrizione", sql.VarChar, body.descrizione)
      .input("Studente", sql.Int, body.studenteId)
      .input("Ripetizione", sql.Int, body.ripetitionId)
      .query(
        `INSERT INTO Feedbacks(Rating, Descrizione, Studente, Ripetizione) VALUES (@Voto, @Descrizione, @Studente, @Ripetizione)`
      );

    if (UpdateFeedbackState(body.studenteId, body.ripetitionId))
      return insertion.rowsAffected;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const UpdateFeedbackState = async (student, ripetition) => {
  console.log(`Studente: ${student}\nRipetizione: ${ripetition}`);
  try {
    let pool = await sql.connect(config);
    let update = await pool
      .request()
      .input("Studente", sql.Int, student)
      .input("Ripetizione", sql.Int, ripetition)
      .query(
        "UPDATE Partecipazioni SET FeedbackGiaLasciato = 1 WHERE Ripetizione = @Ripetizione AND Studente = @Studente"
      );
    console.log(update.rowsAffected);
    if (update.rowsAffected == 1) return true;
    else throw new Error("Errore nell'inserimento del feedback");
  } catch (error) {
    throw new Error("Errore nell'inserimento del feedback");
  }
};

const FetchFeedbacks = async (ripetition) => {
  try {
    let pool = await sql.connect(config);
    let insertion = await pool
      .request()
      .input("ripetizione", sql.Int, ripetition)
      .query("SELECT * FROM Feedbacks WHERE Ripetizione = @ripetizione");

    return insertion.recordsets;
  } catch (error) {
    console.log();
    return undefined;
  }
};

const FetchAllFeedbackByTeacher = async (teacher) => {
  try {
    let pool = await sql.connect(config);
    let insertion = await pool.request().input("teacher", sql.Int, teacher)
      .query(`SELECT Ripetizioni.Id, Rating, Note
              FROM (Feedbacks JOIN Ripetizioni ON Ripetizione = Ripetizioni.Id) JOIN Utenti ON Ripetizioni.Insegnante = Utenti.ID
              WHERE Utenti.ID = 1`);

    return insertion.recordsets;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const FetchPartecipantsToCertainRipetition = async (ripetition) => {
  try {
    let pool = await sql.connect(config);
    let fetch = await pool.request().input("ripetizione", sql.Int, ripetition)
      .query(`SELECT Nome, Cognome, DataDiNascita, IndirizzoDiStudio as Indirizzo
            FROM Partecipazioni JOIN Utenti on Studente = Utenti.ID
            WHERE Ripetizione = @ripetizione`);
    return fetch.recordsets;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const FetchFeedbacksByRipetition = async (ripetition) => {
  try {
    let pool = await sql.connect(config);
    let fetch = await pool.request().input("ripetizione", sql.Int, ripetition)
      .query(`SELECT Feedbacks.Id as Id, Rating, Descrizione, Utenti.Nome as Nome, Cognome, Materie.Nome as Materia, Ripetizioni.Data
              FROM ((Feedbacks JOIN Utenti on Studente = Utenti.ID) JOIN Ripetizioni on Ripetizione = Ripetizioni.Id) JOIN Materie on Materia = Materie.Id
              WHERE Ripetizione = @ripetizione`);
    return fetch.recordsets
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
module.exports = {
  FetchAllRipetitions: FetchAllRipetitions,
  AddNewUser: AddNewUser,
  TryToLog: TryToLog,
  CreateEvent: CreateNewEvent,
  fetchSubjects: FetchSubjects,
  BookRipetition: BookRipetition,
  GetRipetitionsByUserId: FetchRipetionsByUserId,
  UpdateSubscribersInSpecificRipetition: UpdateSubscribersInSpecificRipetition,
  IsSpecificRipetitionAvailable: IsSpecificRipetitionAvailable,
  FilterEventBySubject: FilterEventBySubject,
  AddFeedback: AddFeedback,
  FetchFeedbacks: FetchFeedbacks,
  FetchAllFeedbackByTeacher: FetchAllFeedbackByTeacher,
  FetchPartecipantsToCertainRipetition: FetchPartecipantsToCertainRipetition,
  FetchFeedbacksByRipetition : FetchFeedbacksByRipetition
};
