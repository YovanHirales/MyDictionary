import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
	main: {
		marginBottom: '5%',
	},
	root: {
		display: 'flex',
	},
	cardButtons: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'end',
		textDecoration: 'none',
	},
	rightButtons: {
		display: 'flex',
	},
	link: {
		textDecoration: 'none',
		color: 'inherit',
	},
}));
