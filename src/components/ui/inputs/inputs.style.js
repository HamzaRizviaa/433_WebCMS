import { makeStyles } from '@material-ui/core';

const inputSizeMapper = {
	small: {
		height: '1.8rem',
		borderRadius: 18
	},
	medium: {
		height: '2.2rem',
		borderRadius: 22
	},
	large: {
		height: '2.94rem',
		borderRadius: 30
	}
};

export const useInputsStyles = makeStyles((theme) => ({
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
	textFieldInput: ({ isError, size }) => ({
		color: theme.palette.white,
		border: `1px solid ${theme.palette.normalGrey}`,
		padding: '1rem 1rem 1rem 1.5rem !important',
		fontSize: '1.4rem !important',
		fontFamily: 'Poppins !important',
		lineHeight: '1.6 !important',
		borderRadius: inputSizeMapper[size]?.borderRadius || '22px',
		backgroundColor: theme.palette.black,
		borderColor: isError ? theme.palette.red : theme.palette.normalGrey,

		'& svg': {
			fontSize: '2.5rem'
		},

		'& > input': {
			height: inputSizeMapper[size]?.height || 'auto',
			padding: 0
		}
	}),

	errorText: {
		display: 'inline-block',
		color: theme.palette.red,
		fontWeight: 'bold',
		marginTop: '0.2rem',
		marginLeft: '0.5rem',
		height: '1rem'
	}
}));