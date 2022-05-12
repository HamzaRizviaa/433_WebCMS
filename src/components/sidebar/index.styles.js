import { makeStyles } from '@material-ui/core';
import theme from '../../assets/theme';

export const useStyles = makeStyles(() => ({
	main: {
		backgroundColor: theme.palette.blackColor,
		height: ' calc(100vh - 6rem)',
		width: '5rem',
		borderRight: `1.5px dashed ${theme.palette.grey}`,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		padding: '3rem 1rem'
	},
	navContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},

	iconWrapper: {
		marginTop: '2.5rem',
		padding: '1rem 1.2rem 0.8rem 1.2rem',

		borderRadius: '8px',
		cursor: 'pointer'
	},

	icon: {
		width: ' 2.5rem'
	},
	logo: {
		width: '3.5rem',
		height: 'auto'
	},

	logoutContainer: {
		textAlign: 'center',
		cursor: 'pointer'
	}
}));
