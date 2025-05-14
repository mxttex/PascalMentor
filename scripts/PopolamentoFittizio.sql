USE PascalMentor;
GO

-- 2) Utenti (5 insegnanti T e 10 studenti S)
INSERT INTO Utenti (Nome, Cognome, Tipo, Mail, Password, RatingMedio, DataDiNascita, DataIscrizione, IndirizzoDiStudio) VALUES
('Marco',   'Rossi',   'I', 'marco.rossi@pm.com',    HASHBYTES('SHA2_256','Pwd123!'), 4.5, '1980-05-12', '2024-01-10', 'Uni Roma'),
('Laura',   'Bianchi', 'I', 'laura.bianchi@pm.com',  HASHBYTES('SHA2_256','Pwd123!'), 4.8, '1975-11-30', '2023-09-05', 'Uni Milano'),
('Luca',    'Verdi',   'I', 'luca.verdi@pm.com',      HASHBYTES('SHA2_256','Pwd123!'), 4.2, '1982-02-20', '2024-02-14', 'Uni Torino'),
('Anna',    'Neri',    'I', 'anna.neri@pm.com',       HASHBYTES('SHA2_256','Pwd123!'), 4.7, '1978-07-07', '2023-12-01', 'Uni Napoli'),
('Giovanni','Gialli',  'I', 'giovanni.gialli@pm.com', HASHBYTES('SHA2_256','Pwd123!'), 4.6, '1985-09-15', '2024-03-20', 'Uni Bologna'),

('Sara',    'Russo',   'S', 'sara.russo@pm.com',      HASHBYTES('SHA2_256','Pwd123!'),    NULL, '2003-04-02', '2024-04-01', NULL),
('Paolo',   'Costa',   'S', 'paolo.costa@pm.com',     HASHBYTES('SHA2_256','Pwd123!'),    NULL, '2001-08-19', '2024-01-20', NULL),
('Elisa',   'Ferrari', 'S', 'elisa.ferrari@pm.com',  HASHBYTES('SHA2_256','Pwd123!'),    NULL, '2002-12-11', '2024-02-05', NULL),
('Davide',  'Villa',   'S', 'davide.villa@pm.com',    HASHBYTES('SHA2_256','Pwd123!'),    NULL, '2000-06-23', '2023-11-15', NULL),
('Chiara',  'Romano',  'S', 'chiara.romano@pm.com',   HASHBYTES('SHA2_256','Pwd123!'),    NULL, '2004-01-29', '2024-03-11', NULL),
('Marco',   'De Luca', 'S', 'marco.deluca@pm.com',    HASHBYTES('SHA2_256','Pwd123!'),    NULL, '2003-10-05', '2024-04-18', NULL),
('Elena',   'Fontana', 'S', 'elena.fontana@pm.com',   HASHBYTES('SHA2_256','Pwd123!'),    NULL, '2001-03-17', '2023-12-27', NULL),
('Alessio', 'Conti',   'S', 'alessio.conti@pm.com',   HASHBYTES('SHA2_256','Pwd123!'),    NULL, '2002-05-30', '2024-02-22', NULL),
('Martina', 'Greco',   'S', 'martina.greco@pm.com',   HASHBYTES('SHA2_256','Pwd123!'),    NULL, '2003-11-03', '2024-01-30', NULL),
('Fabio',   'Moretti', 'S', 'fabio.moretti@pm.com',   HASHBYTES('SHA2_256','Pwd123!'),    NULL, '2000-09-12', '2023-10-10', NULL);
GO

-- 3) Ripetizioni (alcuni esempi distribuiti su materie e insegnanti)
INSERT INTO Ripetizioni (Data, OraInizio, OraFine, NumeroMassimoPartecipanti, Insegnante, Materia, Note) VALUES
('2025-05-20','15:00','17:00',5, 1, 1, 'Ripasso algebra'),
('2025-05-21','10:00','12:00',3, 2, 2, 'Meccanica classica'),
('2025-05-22','14:30','16:00',4, 3, 4, 'Introduzione a Pascal'),
('2025-05-23','09:00','11:00',6, 4, 5, 'Contesto storico Medioevo'),
('2025-05-24','17:00','19:00',5, 5, 3, 'Chimica organica'),
('2025-05-25','11:00','12:30',2, 1, 4, 'Programmazione procedure'),
('2025-05-26','13:00','15:00',4, 2, 1, 'Geometria analitica'),
('2025-05-27','16:00','18:00',5, 3, 6, 'Analisi del testo'),
('2025-05-28','10:30','12:00',3, 4, 7, 'Biologia cellulare'),
('2025-05-29','14:00','16:00',6, 5, 8, 'Cartografia base');
GO

-- 4) Partecipazioni (studenti iscritti a varie ripetizioni)
INSERT INTO Partecipazioni (Studente, Ripetizione) VALUES
(6, 1), (7, 1), (8, 1),
(9, 2), (10, 2),
(6, 3), (11, 3),
(12, 4), (13, 4), (14, 4),
(15, 5), (6, 5),
(7, 6), (8, 6),
(9, 7), (10, 7),
(11, 8), (12, 8),
(13, 9),
(14,10), (15,10);
GO

-- 5) Feedbacks (alcuni studenti lasciano valutazioni e commenti)
INSERT INTO Feedbacks (Rating, Descrizione, Studente, Ripetizione) VALUES
(5.0, 'Ottima spiegazione, molto chiaro.',    6,  1),
(4.5, 'Molto utile, ma un po’ veloce.',       7,  1),
(4.0, 'Approfondire esempi pratici.',         8,  1),
(5.0, 'Chiarissimo, professore preparato.',   9,  2),
(3.5, 'Più esercizi durante la lezione.',     10, 2),
(4.7, 'Buona introduzione al linguaggio.',    6,  3),
(4.2, 'Spiegazione accurata ma lenta.',       11, 3),
(5.0, 'Ottima lezione, consigli preziosi.',   12, 4),
(3.8, 'Slide un po’ scarne.',                 13, 4),
(4.9, 'Interessante e coinvolgente.',         14, 4),
(4.3, 'Note ben sintetizzate.',               15, 5),
(4.1, 'Argomenti trattati in modo chiaro.',   6,  5);
GO