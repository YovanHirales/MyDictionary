-- CREATE DATABASE wordlist;

CREATE TABLE words(
    word_id SERIAL PRIMARY KEY,
    word VARCHAR(255),
    definition VARCHAR(255)
);