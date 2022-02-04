import React from 'react';
import { Container } from '@mui/material';
import Words from './components/Words/Words';

function App() {
	return (
		<Container>
			<h1 className='text-center mt-5'>My Dictionary</h1>
			<Words />
			<h6>
				<a href='https://www.wordnik.com/'>Made using Wordnik API</a>
			</h6>
		</Container>
	);
}

export default App;
