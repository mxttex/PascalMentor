CREATE DATABASE PascalMentor
go
USE PascalMentor
go 
CREATE TABLE Studenti(
	Id int identity(1,1) PRIMARY KEY,
	Nome VARCHAR(20) NOT NULL,
	Cognome VARCHAR(20) NOT NULL,
	Mail VARCHAR(50) UNIQUE NOT NULL,
	Password VARCHAR(50) NOT NULL,
	Indirizzo VARCHAR(20),
	DataDiNascita DATE NOT NULL)

CREATE TABLE Insegnanti(
	Id int identity(1,1) PRIMARY KEY,
	Nome VARCHAR(20) NOT NULL,
	Cognome VARCHAR(20) NOT NULL,
	Mail VARCHAR(50) UNIQUE NOT NULL,
	Password VARCHAR(50) NOT NULL,
	RatingMedio FLOAT NOT NULL DEFAULT(0),
	DataDiNascita DATE NOT NULL)

CREATE TABLE Materie(
	Nome VARCHAR(20) PRIMARY KEY,
	Descrizione VARCHAR(150))

CREATE TABLE Ripetizioni(
	Id int identity(1,1) PRIMARY KEY,
	Data DATE NOT NULL,
	OraInizio CHAR(5) NOT NULL,
	OraFine CHAR(5),
	NumeroMassimoPartecipanti INT DEFAULT(1),
	Insegnante INT REFERENCES Insegnanti(Id) NOT NULL,
	Materia VARCHAR(20) REFERENCES Materie(Nome) NOT NULL)

CREATE TABLE Partecipazioni(
	Studente INT REFERENCES Studenti(Id),
	Ripetizione INT REFERENCES Ripetizioni(Id))

CREATE TABLE MaterieInsegnate(
	Insegnante INT REFERENCES Insegnanti(Id),
	Materia VARCHAR(20) REFERENCES Materie(Nome),
	PRIMARY KEY(Insegnante, Materia))

CREATE TABLE Feedbacks(
	Id int identity(1,1) PRIMARY KEY,
	Rating FLOAT,
	Descrizione VARCHAR(150),
	Studente INT REFERENCES Studenti(Id),
	Ripetizione INT REFERENCES Ripetizioni(Id))
