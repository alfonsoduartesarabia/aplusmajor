CREATE SCHEMA `aMajor` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE aMajor;
CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	notes varchar (256) NOT NULL
);