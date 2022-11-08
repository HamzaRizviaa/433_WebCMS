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
	},

	explanationWrapper: {
		display: 'flex',
		justifyContent: 'flex-start',
		margin: '5% 0%',
		fontFamily: 'Poppins',
		fontSize: '16px',
		fontStyle: 'normal',
		fontWeight: 700,
		lineHeight: '24px'
	},

	infoIcon: { cursor: 'pointer', marginLeft: '1rem' }
}));