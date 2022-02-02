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

export default function FormDialog({
	handleEdit,
	handleClose,
	handleSave,
	open,
	word,
	getWords,
}) {
	const [formData, updateFormData] = useState();

	return (
		<Fragment>
			<IconButton onClick={handleEdit}>
				<EditIcon />
			</IconButton>
			<div>
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle>Edit</DialogTitle>
					<form onSubmit={handleSave}>
						<DialogContent>
							<DialogContentText>Word:</DialogContentText>
							<TextField
								margin='dense'
								id='name'
								defaultValue={word.word}
								type='text'
								fullWidth
								variant='standard'
								sx={{ width: '50vw' }}
							/>
							<DialogContentText>Part Of Speech #1:</DialogContentText>
							<TextField
								margin='dense'
								id='name'
								defaultValue={word.part_of_speech_1}
								type='text'
								fullWidth
								variant='standard'
								sx={{ width: '50vw' }}
							/>
							<DialogContentText>Definition #1:</DialogContentText>
							<TextField
								margin='dense'
								id='name'
								defaultValue={word.definition_1}
								type='email'
								fullWidth
								variant='standard'
								sx={{ width: '50vw' }}
							/>
							<DialogContentText>Part Of Speech #2:</DialogContentText>
							<TextField
								margin='dense'
								id='name'
								defaultValue={word.part_of_speech_2}
								type='text'
								fullWidth
								variant='standard'
								sx={{ width: '50vw' }}
							/>
							<DialogContentText>Definition #2:</DialogContentText>
							<TextField
								margin='dense'
								id='name'
								defaultValue={word.definition_2}
								type='email'
								fullWidth
								variant='standard'
								sx={{ width: '50vw' }}
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
