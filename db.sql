DROP DATABASE IF EXISTS webdev_quotes;
CREATE DATABASE webdev_quotes;
USE webdev_quotes;

DROP TABLE IF EXISTS quote;

CREATE TABLE Quote (
QuoteID INT AUTO_INCREMENT PRIMARY KEY,
Body VARCHAR (100),
Author VARCHAR (100)
);


INSERT INTO Quote (Body, Author) VALUES("They ask you how you are, and you just have to say that you're fine", "Katy Perry");
INSERT INTO Quote (Body, Author) VALUES("Bring a bucket and a mop for this wet and gushy", "Cardi B");
INSERT INTO Quote (Body, Author) VALUES("owa owa", "Pudgy");

