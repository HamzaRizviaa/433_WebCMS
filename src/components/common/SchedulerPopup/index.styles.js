import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
	dateAndTimeCon: {
		width: 300,
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		boxSizing: 'border-box',
		padding: '5px 20px',
		paddingTop: 0
	},

	timezoneNote: {
		fontFamily: 'Poppins',
		fontSize: '14px',
		fontWeight: '400',
		lineHeight: '24px',
		letterSpacing: '0em',
		color: '#FFFFFF',

		marginTop: '2rem',
		marginBottom: '0.5rem'
	},

	schedulerErrorContainer: {
		border: '1px solid red',
		height: '50px',
		borderRadius: '8px',
		background: '#FF355A',
		margin: '5px 0 10px 0',
		padding: '16px',
		display: 'flex',
		alignItems: 'center',
		flexWrap: 'wrap',
		fontFamily: 'Poppins',
		fontSize: '12px',
		lineHeight: '16px',
		letterSpacing: '0.03em',
		color: '#fff'
	},

	schedulerErrorTitle: {
		flexBasis: '100%',
		fontWeight: 700
	},

	schedulerErrorText: {
		fontWeight: 400
	}
}));
