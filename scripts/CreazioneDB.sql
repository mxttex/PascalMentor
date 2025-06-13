CREATE DATABASE PascalMentor;
GO

USE PascalMentor;
GO 

CREATE TABLE Materie (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	Nome VARCHAR(40)
);

CREATE TABLE Utenti (
	ID INT IDENTITY(1,1) PRIMARY KEY,
	Nome VARCHAR(20) NOT NULL,
	Cognome VARCHAR(20) NOT NULL,
	Tipo CHAR(1) DEFAULT 'S',
	Mail VARCHAR(50) UNIQUE NOT NULL,
	Password CHAR(64) NOT NULL,
	RatingMedio FLOAT DEFAULT 0,
	DataDiNascita DATE NOT NULL,
	DataIscrizione DATE NOT NULL,
	IndirizzoDiStudio VARCHAR(20)
);

CREATE TABLE Ripetizioni (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	Data DATE NOT NULL,
	OraInizio TIME NOT NULL,
	OraFine TIME,
	NumeroMassimoPartecipanti INT DEFAULT 1,
	NumeroIscritti INT DEFAULT 0,
	Insegnante INT NOT NULL,
	Materia INT NOT NULL,
	Note VARCHAR(150),
	FOREIGN KEY (Insegnante) REFERENCES Utenti(Id),
	FOREIGN KEY (Materia) REFERENCES Materie(Id)
);

CREATE TABLE Partecipazioni (
	Studente INT NOT NULL,
	Ripetizione INT NOT NULL,
	FeedbackGiaLasciato TINYINT DEFAULT 0,
	PRIMARY KEY (Studente, Ripetizione),
	FOREIGN KEY (Studente) REFERENCES Utenti(Id),
	FOREIGN KEY (Ripetizione) REFERENCES Ripetizioni(Id)
);

CREATE TABLE Feedbacks (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	Rating FLOAT,
	Descrizione VARCHAR(150),
	Studente INT,
	Ripetizione INT,
	FOREIGN KEY (Studente) REFERENCES Utenti(Id),
	FOREIGN KEY (Ripetizione) REFERENCES Ripetizioni(Id)
);
