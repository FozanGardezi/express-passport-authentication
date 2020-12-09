CREATE DATABASE test_database;

CREATE TABLE user_table(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    hashed_password VARCHAR(255)
);

