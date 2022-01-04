import React, { useState, useEffect, Fragment } from 'react';
import EditDef from './EditDef';
import InputWords from './input';

const ListWords = () => {
	//use state to manage available entries
	const [words, setWords] = useState([]);

	const getWords = async () => {
		try {
			const response = await fetch('/words');

			//parse received data
			const wordAndDef = await response.json();

			//set state of words to contain all entries in an array
			setWords(wordAndDef);

			if (wordAndDef.length !== 0) {
				document.getElementById('deleteAll').style.display = 'block';
			} else {
				document.getElementById('deleteAll').style.display = 'none';
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	const onDelete = async (id) => {
		try {
			if (id) {
				const deletedWord = await fetch(`/words/${id}`, {
					method: 'DELETE',
				});
			} else {
				const deletedWord = await fetch(`/words/`, {
					method: 'DELETE',
				});

				document.getElementById('deleteAll').style.display = 'none';
			}

			getWords();
		} catch (err) {
			console.error(err.message);
		}
	};

	useEffect(() => {
		getWords();
	}, []);

	//return all words in table
	return (
		<Fragment>
			<InputWords getWords={getWords} />
			<div className='table-wrapper-scroll-y my-custom-scrollbar mt-3'>
				<table className='table table-striped'>
					<thead className='table-dark'>
						<tr>
							<th>Word</th>
							<th>Definition</th>
							<th></th>
							<th>
								<button
									id='deleteAll'
									className='btn btn-danger'
									onClick={() => onDelete()}
								>
									Delete All
								</button>
							</th>
						</tr>
					</thead>
					<tbody>
						{/* <tr>
						<td>John</td>
						<td>Doe</td>
						<td>john@example.com</td>
					</tr> */}
						{words
							.slice(0)
							.reverse()
							.map((entry) => {
								return (
									<tr key={entry.word_id}>
										<td>{entry.word}</td>
										<td>{entry.definition}</td>
										<td></td>
										<td>
											<EditDef entry={entry} getWords={getWords} />
											<button
												className='btn btn-danger mt-1'
												onClick={() => onDelete(entry.word_id)}
											>
												Delete
											</button>
										</td>
									</tr>
								);
							})}
					</tbody>
				</table>
			</div>
			<br />
			<footer className='mb-5'>
				Made with Merriam Webster's dictionary API
			</footer>
		</Fragment>
	);
};

export default ListWords;
