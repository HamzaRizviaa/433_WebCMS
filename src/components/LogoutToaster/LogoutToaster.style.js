import { makeStyles } from '@material-ui/core';
import theme from '../../assets/theme';

export const useStyles = makeStyles(() => ({
	loaderAlert: {
		width: '50px',
		height: 'auto'
	},
	toasterWrapper: {
		height: '80px',
		width: '320px'
	},
	toastBody: {
		fontFamily: 'Poppins',
		color: theme.palette.neonYellow,
		fontSize: '1.7rem !important',

		'& > div:last-child': {
			marginLeft: '3rem'
		}
	}
}));
