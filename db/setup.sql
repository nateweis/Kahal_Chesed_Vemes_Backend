DROP DATABASE IF EXISTS kcv_db;
CREATE DATABASE kcv_db;
\c kcv_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(120),
    password TEXT,
    email VARCHAR(120),
    admin BOOL
);

CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    title VARCHAR(32),
    msg TEXT
);

INSERT INTO messages (title, msg) VALUES ('flashMessage', 'This is the temp holder for the flash message. This means that only the inital message has been made and hasent been updated ever since.');