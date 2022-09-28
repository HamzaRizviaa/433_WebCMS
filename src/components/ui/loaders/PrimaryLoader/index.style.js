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
		backgroundColor: ({ secondary }) => secondary ? theme.palette.black : 'rgba(0, 0, 0, 0.5)',
		zIndex: 100
	},
	loader: {
		width: ({ secondary }) => secondary ? '50px' : '80px',
		height: 'auto',
		position: 'absolute',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 9999999,
		color: theme.palette.neonYellow
	},
	backdrop: {
		position: 'relative',
		height: ({ loading, mainPage }) => loading && !mainPage ? 'calc(100vh - 140px)' : '100%',
		overflow: ({loading}) => loading ? 'hidden' : 'unset'
	},
	secondaryBackdrop:{
		position: 'relative',
		height: '100%',
		overflow: ({loading}) => loading ? 'hidden' : 'unset'
	}
}));
