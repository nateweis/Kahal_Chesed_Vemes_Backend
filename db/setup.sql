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