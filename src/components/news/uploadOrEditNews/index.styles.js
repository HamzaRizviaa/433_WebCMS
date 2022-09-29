import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	buttonDiv: {
		width: '100%',
		marginBottom: '4rem',
		display: 'flex',
		justifyContent: 'flex-end'
	},
	newsButtonDiv: {
		width: '100%',
		marginBottom: '4rem',
		display: 'flex',
		justifyContent: 'space-between'
	},
	textField: {
		width: '100%'
	},
	textFieldInput: {
		...theme.components.textFieldInput
	}
}));
