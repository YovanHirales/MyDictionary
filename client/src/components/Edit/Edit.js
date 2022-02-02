import React, { Fragment, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function FormDialog({ word, getWords }) {
	const handleChange = (e) => {
		word[e.target.name] = e.target.value;
	};

	const [open, setOpen] = useState(false);
	const handleEdit = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const handleSave = async (e) => {
		e.preventDefault();

		try {
			const body = word;
			await fetch(`http://localhost:5000/words/${word.word_id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body),
			});

			getWords();
			setOpen(false);
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<Fragment>
			<IconButton onClick={handleEdit}>
				<EditIcon />
			</IconButton>
			<div>
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle sx={{ width: '50vw' }}>Edit</DialogTitle>
					<form onSubmit={handleSave}>
						<DialogContent>
							<DialogContentText>Word:</DialogContentText>
							<TextField
								margin='dense'
								defaultValue={word.word}
								type='text'
								name='word'
								fullWidth
								variant='standard'
								onChange={handleChange}
							/>
							<DialogContentText>Part Of Speech #1:</DialogContentText>
							<TextField
								margin='dense'
								defaultValue={word.part_of_speech_1}
								type='text'
								name='part_of_speech_1'
								fullWidth
								variant='standard'
								onChange={handleChange}
							/>
							<DialogContentText>Definition #1:</DialogContentText>
							<TextField
								margin='dense'
								defaultValue={word.definition_1}
								type='text'
								name='definition_1'
								fullWidth
								variant='standard'
								onChange={handleChange}
							/>
							<DialogContentText>Part Of Speech #2:</DialogContentText>
							<TextField
								margin='dense'
								defaultValue={word.part_of_speech_2}
								type='text'
								name='definition_2'
								fullWidth
								variant='standard'
								onChange={handleChange}
							/>
							<DialogContentText>Definition #2:</DialogContentText>
							<TextField
								margin='dense'
								defaultValue={word.definition_2}
								type='text'
								name='part_of_speech_2'
								fullWidth
								variant='standard'
								onChange={handleChange}
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose}>Cancel</Button>
							<Button type='submit'>Save Changes</Button>
						</DialogActions>
					</form>
				</Dialog>
			</div>
		</Fragment>
	);
}
