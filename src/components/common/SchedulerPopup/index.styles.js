import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
	dateAndTimeCon: {
		width: 300,
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		boxSizing: 'border-box',
		padding: '5px 20px'
	},
	timezoneNote: {
		//styleName: Body/Small;
		fontFamily: 'Poppins',
		fontSize: '14px',
		fontWeight: '400',
		lineHeight: '24px',
		letterSpacing: '0em',
		color: '#FFFFFF',

		marginTop: '2rem'
	}
}));
