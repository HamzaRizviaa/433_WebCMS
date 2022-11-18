import { makeStyles } from '@material-ui/core';

export const useDatePickerStyles = makeStyles((theme) => ({
	datePickerContainer: {
		marginBottom: '1rem'
	},

	datePickerLabel: {
		position: 'relative',
		display: 'inline-block',
		fontSize: '1.2rem',
		fontWeight: 'bold',
		marginLeft: '1rem',
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

	customDatePickerInput: {
		margin: 0,
		display: ' inline-flex',
		position: 'relative',
		minWidth: 0,
		verticalAlign: 'top',
		width: '95%',
		border: `1px solid ${theme.palette.normalGrey}`,
		padding: '1.2rem 1rem 1.2rem 1.5rem !important',
		fontSize: '1.4rem !important',
		lineHeight: '1.6 !important',
		borderRadius: '40px',
		height: '17.5px',
		boxSizing: 'content-box',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: (props) =>
			props.isDisabled ? theme.palette.normalGrey : theme.palette.black,
		borderColor: (props) =>
			props.isError ? theme.palette.red : theme.palette.normalGrey,
		color: (props) =>
			props.isDisabled ? theme.palette.lightGrey : theme.palette.normalGrey
	},

	dateInputText: {
		color: (props) =>
			props.hasData ? theme.palette.white : theme.palette.disabled
	},

	datePickerIcon: {
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer'
	},

	errorText: {
		display: 'inline-block',
		color: theme.palette.red,
		fontWeight: 'bold',
		marginTop: '0.2rem',
		marginLeft: '0.5rem',
		height: '1rem'
	}
}));
