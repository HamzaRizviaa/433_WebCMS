import { makeStyles } from '@material-ui/core';

export const useDatePickerStyles = makeStyles((theme) => ({
	datePickerContainer: {
		marginBottom: '1rem'
	},

	customDatePickerInput: {
		margin: 0,
		display: ' inline-flex',
		position: 'relative',
		minWidth: 0,
		verticalAlign: 'top',
		width: 'fill-available',
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
			props.isDisabled
				? theme.palette.lightGrey
				: props.hasData
				? theme.palette.white
				: theme.palette.disabled
	},

	datePickerIcon: {
		display: 'flex',
		alignItems: 'center',
		cursor: 'pointer',
		marginRight: 10,
		marginBottom: 2
	}
}));
