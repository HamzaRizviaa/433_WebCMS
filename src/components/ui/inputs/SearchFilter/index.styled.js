import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
	searchField: {
		width: '300px'
	},
	textFieldInput: {
		color: '#fff !important',
		border: '1px solid #404040',
		padding: '0.5rem 0.5rem 0.5rem 1.5rem !important',
		fontSize: '1.4rem !important',
		lineHeight: '1.6 !important',
		borderRadius: '40px',
		fontFamily: 'Poppins !important',
		backgroundColor: ' #000000',
		borderColor: (props) => (props.isError ? '#FF355A' : '#404040'),

		'& > input': {
			height: '2.95rem',
			padding: 0
		}
	},
	searchIcon: {
		cursor: 'pointer',
		marginRight: 10
	},
	noResultError: {
		color: '#ff355a',
		fontWeight: 'bold',
		marginTop: '0.2rem',
		marginLeft: '0.5rem',
		height: '1rem'
	}
}));
