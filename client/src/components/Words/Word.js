import React from 'react';

import {
	Card,
	CardActions,
	CardContent,
	Typography,
	IconButton,
	Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useStyles from './styles';

import FormDialog from '../Edit/Edit';

const Word = ({ word, getWords }) => {
	//import custom css
	const classes = useStyles();

	// handle delete button click
	const deleteItem = async () => {
		await fetch(`http://localhost:5000/words/${word.word_id}`, {
			method: 'DELETE',
		});

		getWords();
	};

	return (
		<Card
			varient='outlined'
			style={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				height: '100%',
			}}
		>
			<CardContent>
				<Typography variant='h5' component='div'>
					{word.word}
				</Typography>
				<br />
				<Typography sx={{ mb: 0.25 }} color='text.secondary'>
					{word.part_of_speech_1}
				</Typography>
				<Typography variant='body2'>
					{word.definition_1}
					<br />
				</Typography>
				<br />
				<Typography sx={{ mb: 0.25 }} color='text.secondary'>
					{word.part_of_speech_2}
				</Typography>
				<Typography variant='body2'>
					{word.definition_2}
					<br />
				</Typography>
			</CardContent>
			<CardActions className={classes.cardButtons}>
				<Button size='small'>
					<a
						href={`https://www.google.com/search?q=${word.word}+definition`}
						target='_blank'
						rel='noreferrer noopener'
						className={classes.link}
					>
						Learn More
					</a>
				</Button>
				<div className={classes.rightButtons}>
					<FormDialog word={word} getWords={getWords} />
					<IconButton onClick={deleteItem}>
						<DeleteIcon />
					</IconButton>
				</div>
			</CardActions>
		</Card>
	);
};

export default Word;
