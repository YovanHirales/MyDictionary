const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db'); //connect database to server
const fetch = require('node-fetch');
const path = require('path');
const PORT = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors()); //allow apps on different domains to interact
app.use(express.json()); //req.body

// app.use(express.static('./client/build'));

if (process.env.NODE_ENV === 'production') {
	//serve static files
	app.use(express.static(path.join(__dirname, 'client/build')));
}

//   ROUTES   //

//CREATE
app.post('/words', async (req, res) => {
	try {
		//grab words
		const { words } = req.body;
		console.log(words);
		//separate words
		const wordArr = words.toLowerCase().split(' ');

		//iterate over words
		for (let i = 0; i < wordArr.length; i++) {
			//grab definition
			const response = await fetch(
				`https://api.wordnik.com/v4/word.json/${wordArr[i]}/definitions?limit=2&includeRelated=false&sourceDictionaries=wordnet&useCanonical=false&includeTags=false&api_key=${process.env.DICT_KEY}`
			);
			//parse data
			const json = await response.json();

			//insert word and def into database
			const newWord = await pool.query(
				'INSERT INTO words(word, part_of_speech_1, definition_1, part_of_speech_2, definition_2) VALUES($1, $2, $3, $4, $5) RETURNING *',
				[
					json[0].word,
					json[0].partOfSpeech,
					json[0].text,
					json.length > 1 ? json[1].partOfSpeech : null,
					json.length > 1 ? json[1].text : null,
				]
			);
		}

		res.json('Word/s added to database');
	} catch (err) {
		console.error(err.message);
		res.json("Couldn't find your word");
	}
});

//READ
app.get('/words', async (req, res) => {
	try {
		const getAllWords = await pool.query('SELECT * FROM words');

		res.json(getAllWords.rows);
	} catch (err) {
		console.error(err.message);
	}
});

app.get('/words/:id', async (req, res) => {
	try {
		const { id } = req.params;

		const getAllWords = await pool.query(
			'SELECT * FROM words WHERE word_id=$1',
			[id]
		);

		res.json(getAllWords.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});
//UPDATE
app.put('/words/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const {
			word,
			part_of_speech_1,
			definition_1,
			part_of_speech_2,
			definition_2,
		} = req.body;

		const updatedEntry = await pool.query(
			'UPDATE words SET word=$1, part_of_speech_1=$2, definition_1=$3, part_of_speech_2=$4, definition_2=$5 WHERE word_id=$6 RETURNING *',
			[word, part_ofspeech_1, definition_1, part_of_speech_2, definition_2, id]
		);

		res.json(updatedEntry.rows[0]);
	} catch (err) {
		console.error(err.message);
	}
});

//DELETE
app.delete('/words/:id', async (req, res) => {
	const { id } = req.params;
	const deletedWord = await pool.query('DELETE FROM words WHERE word_id=$1', [
		id,
	]);

	res.json('Word has been deleted');
});

app.delete('/words', async (req, res) => {
	const deleteAll = await pool.query('DELETE FROM words');

	res.json('All words have been deleted');
});

//catch all
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`);
});
