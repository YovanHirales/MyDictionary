import React, { Fragment, useState, useEffect } from 'react';

const EditDef = (props) => {
	const entry = props.entry;
	const [def, setDef] = useState(entry.definition);

	const update = async () => {
		try {
			entry.definition = def;

			const saveData = await fetch(
				`http://localhost:5000/words/${entry.word_id}`,
				{
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(entry),
				}
			);

			props.getWords();
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<Fragment>
			<button
				type='button'
				className='btn btn-primary'
				data-toggle='modal'
				data-target='#myModal'
			>
				Edit
			</button>

			<div className='modal' id='myModal'>
				<div className='modal-dialog'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h4 className='modal-title'>Edit definition</h4>
							<button type='button' className='close' data-dismiss='modal'>
								&times;
							</button>
						</div>

						<div className='modal-body'>
							<form>
								<div className='form-group'>
									<label htmlFor='FormControlTextarea1'>{entry.word}:</label>
									<textarea
										className='form-control'
										id='FormControlTextarea1'
										rows='3'
										value={def}
										onChange={(e) => setDef(e.target.value)}
									></textarea>
								</div>
							</form>
						</div>

						<div className='modal-footer'>
							<button
								type='button'
								className='btn btn-success'
								data-dismiss='modal'
								onClick={update}
							>
								Save Changes
							</button>
							<button
								type='button'
								className='btn btn-danger'
								data-dismiss='modal'
							>
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default EditDef;
