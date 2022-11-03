import { makeStyles } from '@material-ui/core';

export const useFormStyles = makeStyles(() => ({
	buttonDiv: {
		width: '100%',
		marginTop: '3rem',
		marginBottom: '1rem',
		display: 'flex',
		justifyContent: 'space-between',

		'& button + button': {
			marginLeft: 10
		}
	},

	publishDraftDiv: {
		display: 'flex'
	},

	fieldWrapper: {
		marginBottom: '1.5rem'
	},

	fieldContainer: {
		marginTop: 14
	},

	switchContainer: {
		marginTop: 10
	},

	addNewsBtnWrapper: {
		marginTop: 40
	}
}));
