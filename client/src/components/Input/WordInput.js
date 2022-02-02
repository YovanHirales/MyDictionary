import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import useStyles from './styles';

const Input = ({ getWords }) => {
	const classes = useStyles();

	const [input, setInput] = useState('');

	const onSubmitForm = async (e) => {
		try {
			e.preventDefault();

			const body = { words: input };
			await fetch('/words', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});

			setInput('');
			getWords();
		} catch (err) {
			console.error(err.message);
		}
	};

	const handleDelete = async () => {
		try {
			await fetch('/words', {
				method: 'DELETE',
			});

			getWords();
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<form
			className={classes.root}
			onSubmit={input ? onSubmitForm : (e) => e.preventDefault()}
		>
			<TextField
				className={classes.input}
				id='filled-search'
				label='Add your words here!'
				type='text'
				variant='filled'
				value={input}
				onChange={(e) => setInput(e.target.value)}
				fullWidth
				helperText='Type in a word or multiple words separated by a space: ex// word1 word2
				word3'
			/>
			<Button
				className={classes.button}
				variant='contained'
				color='success'
				type='submit'
			>
				Add
			</Button>
			<Button
				className={classes.button}
				variant='contained'
				color='error'
				onClick={handleDelete}
			>
				Delete All Words
			</Button>
		</form>
	);
};

export default Input;
