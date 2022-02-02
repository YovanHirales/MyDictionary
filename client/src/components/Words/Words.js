import React, { Fragment, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Word from './Word';
import Input from '../Input/WordInput.js';
import useStyles from './styles';

const Words = () => {
	const [words, setWords] = useState([]);
	const classes = useStyles();

	const getWords = async () => {
		try {
			const response = await fetch('/words');

			const parseRes = await response.json();

			setWords(parseRes.reverse());
		} catch (error) {
			console.error(error.message);
		}
	};

	//render words
	useEffect(() => {
		getWords();
	}, []);

	return (
		<Fragment>
			<Input getWords={getWords} />
			<main className={classes.main}>
				<Grid container direction='row' spacing={4} alignItems='stretch'>
					{words.map((word) => (
						<Grid item xs={12} md={6} lg={4}>
							<Word word={word} getWords={getWords} />
						</Grid>
					))}
				</Grid>
			</main>
		</Fragment>
	);
};

export default Words;
