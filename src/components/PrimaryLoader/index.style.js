import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	loaderContainer: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.8)',
		//opacity: 1,
		zIndex: 999999
	},
	loader: {
		width: '80px',
		height: 'auto',
		position: 'absolute',
		display: 'flex',
		top: '40vh',
		left: '45%',
		alignItems: 'center',
		justifyContent: 'center',
		// left: 40%, // top, right, left, bottom can only be used wrt position property
		// top: 30%, // top, right, left, bottom can only be used wrt position property
		zIndex: 9999999,
		color: theme.palette.neonYellow
	}
}));
