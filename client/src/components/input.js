import React, { Fragment, useState } from 'react';

const Input = (props) => {
	const [word, setWord] = useState('');

	const onSubmitForm = async (e) => {
		e.preventDefault(); //prevent page refresh after submit
		const wordArr = word.split(' ');
		for (let i = 0; i < wordArr.length; i++) {
			try {
				const body = { word: wordArr[i] };

				if (body) {
					const response = await fetch('http://localhost:5000/words', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify(body),
					});

					setWord('');
					props.getWords();
				}
			} catch (err) {
				console.log('hello');
			}
		}
	};

	return (
		<Fragment>
			<h1 className='text-center mt-5'>My Dictionary</h1>
			<label>
				Type in a word or multiple words separated by a space: ex// word1 word2
				word3
			</label>
			<form className='d-flex' onSubmit={onSubmitForm}>
				<input
					type='text'
					className='form-control'
					value={word}
					onChange={(e) => setWord(e.target.value)}
				/>
				<button className='btn btn-success ml-1'>Add</button>
			</form>
		</Fragment>
	);
};

export default Input;
