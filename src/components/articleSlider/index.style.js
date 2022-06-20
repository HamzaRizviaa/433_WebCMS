/* eslint-disable no-dupe-keys */
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: '1 !important',
		color: 'rgba(0, 0, 0, 0.98) !important'
	},

	paper: {
		color: `${theme.palette.neonYellow} !important`,
		right: '0 !important',
		borderLeft: `1px solid ${theme.palette.grey} !important`,
		height: '100vh !important',
		zIndex: '5 !important',
		position: 'fixed !important',
		minWidth: 'calc(100% - 82px)',
		transform: 'none !important',
		overflowY: ' auto !important',
		overflowX: 'hidden',
		backgroundColor: `${theme.palette.black} !important`
	},

	content: {
		padding: '4rem',
		height: 'calc(100vh - 8rem)'
	},

	closeIcon: {
		width: '3.2rem !important',
		height: '3.2rem !important',
		marginRight: '1.6rem !important',
		padding: '0.5rem !important',
		background: `${theme.palette.grey} !important`,
		borderRadius: '50% !important',
		cursor: 'pointer !important',
		color: 'white'
	},

	articleBuilderHeader: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: '2.5rem',
		position: 'fixed',
		width: '100%',
		paddingTop: '4rem',
		zIndex: '2',
		background: 'black'
		// position: 'fixed'
	},

	heading: {
		color: theme.palette.neonYellow
	},
	content: {
		padding: '0 4rem 4rem'
	}
}));