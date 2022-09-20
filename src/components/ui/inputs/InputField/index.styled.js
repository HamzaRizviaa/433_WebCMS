import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	inputFieldContainer: {
		marginBottom: '0.5rem',

		'& .MuiFormHelperText-root': {
			color: (props) =>
				props.isError ? theme.palette.red : theme.palette.white,
			fontSize: '1rem',
			fontWeight: 'bold',
			marginLeft: '1rem'
		}
	},
	labelsContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		margin: '0 1rem'
	},
	inputLabel: {
		position: 'relative',
		display: 'inline-block',
		fontSize: '1.2rem',
		fontWeight: 'bold',
		marginBottom: '0.5rem',
		color: (props) => (props.isError ? theme.palette.red : theme.palette.white),

		'&::before': {
			content: '"*"',
			position: 'absolute',
			right: -9,
			top: -2,
			fontSize: '1.5rem',
			fontWeight: 'bold',
			color: theme.palette.red,
			display: (props) => (props.isRequired ? 'inline-block' : 'none')
		}
	},
	textFieldInput: {
		color: theme.palette.white,
		border: `0.01px solid ${theme.palette.grey}`,
		padding: '1rem 1rem 1rem 1.5rem !important',
		fontSize: '1.4rem !important',
		fontFamily: 'Poppins !important',
		lineHeight: '1.6 !important',
		borderRadius: '22px',
		backgroundColor: theme.palette.black,
		borderColor: (props) =>
			props.isError ? theme.palette.red : theme.palette.grey,

		'& svg': {
			fontSize: '2.5rem'
		},

		'& > input': {
			height: '2.2rem',
			padding: 0
		}
	},
	endIcon: {
		marginRight: 8
	}
}));
