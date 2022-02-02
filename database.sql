-- CREATE DATABASE wordlist;

CREATE TABLE words(
    word_id SERIAL PRIMARY KEY,
    word VARCHAR(255),
    part_of_speech_1 VARCHAR(255),
    definition_1 VARCHAR(255),
    part_of_speech_2 VARCHAR(255),
    definition_2 VARCHAR(255)
);