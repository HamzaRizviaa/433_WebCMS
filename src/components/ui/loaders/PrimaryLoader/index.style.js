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
		backgroundColor: ({ secondary, opaqueBackground }) =>
			secondary || opaqueBackground
				? theme.palette.black
				: 'rgba(0, 0, 0, 0.8)',
		zIndex: 100
	},
	loader: {
		width: ({ secondary }) => (secondary ? '50px' : '80px'),
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
		height: ({ loading, mainPage, fullHeight }) =>
			loading
				? mainPage
					? '100vh'
					: fullHeight
					? '100%'
					: 'calc(100vh - 150px)'
				: 'auto',
		overflow: ({ loading }) => (loading ? 'hidden' : 'unset')
	}
}));
