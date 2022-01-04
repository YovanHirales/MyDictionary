const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db'); //connect database to server
const fetch = require('node-fetch');
const { ECDH } = require('crypto');
require('dotenv').config();
const path = require('path');
const PORT = process.env.PORT || 5000;

app.use(cors()); //allow apps on different domains to interact
app.use(express.json()); //req.body

app.use(express.static('./client/build'));

if (process.env.NODE_ENV === 'production') {
	//serve static files
	app.use(express.static(path.join(__dirname, 'client/build')));
}

//   ROUTES   //

//CREATE
app.post('/words', async (req, res) => {
	try {
		//grab word from user
		const { word } = req.body;

		//grab definition
		const response = await fetch(
			`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${process.env.DICT_KEY}`
		);
		const definition = await response.json();

		//insert word and def into database
		const newWord = await pool.query(
			'INSERT INTO words(word, definition) VALUES($1, $2) RETURNING *',
			[
				word,
				definition[0].shortdef.filter((def, index) => index < 3).join(' || '),
			]
		);

		res.json(newWord.rows[0]);
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
		const { word, definition } = req.body;

		const updatedEntry = await pool.query(
			'UPDATE words SET word=$1, definition=$2 WHERE word_id=$3 RETURNING *',
			[word, definition, id]
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
