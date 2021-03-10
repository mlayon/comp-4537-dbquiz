DROP DATABASE IF EXISTS webdev_dbquiz;
CREATE DATABASE webdev_dbquiz;
USE webdev_dbquiz;

DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS choice;

CREATE TABLE Question (
QuestionID INT AUTO_INCREMENT PRIMARY KEY,
Body VARCHAR (100)
);

CREATE TABLE Choice (
    ChoiceID INT AUTO_INCREMENT PRIMARY KEY,
    Body VARCHAR (100),
    IsAnswer BOOLEAN,
    QuestionID INT REFERENCES Question(QuestionID)
);

INSERT INTO Question (Body) VALUES("Who is the current Prime Minister of Canada?");
INSERT INTO Choice (Body, IsAnswer, QuestionID) VALUES("Oprah Winfrey", false, 1), ("Justin Trudeau", true, 1), ("Mariah Carey", false, 1);

INSERT INTO Question (Body) VALUES("True or False: SQL is a front-end language.");
INSERT INTO Choice (Body, IsAnswer, QuestionID) VALUES("True", false, 2), ("False", true, 2);

INSERT INTO Question (Body) VALUES("Which one is NOT a relational database?");
INSERT INTO Choice (Body, IsAnswer, QuestionID) VALUES("PostgreSQL", false, 3), ("SAP HANA", false, 3), ("MongoDB", true, 3);

