import { makeStyles } from '@material-ui/core';

export const DrawerLayoutStyles = makeStyles((theme) => ({
	backdrop: {
		zIndex: '1 !important',
		color: 'rgba(0, 0, 0, 0.98) !important'
	},
	paper: {
		color: ({ fromArticle }) =>
			fromArticle
				? `${theme.palette.neonYellow} !important`
				: '#ffffff !important',
		right: '0 !important',
		borderLeft: ({ fromArticle }) =>
			fromArticle ? `` : '1px solid #ffff00 !important',
		height: '100vh !important',
		zIndex: '5 !important',
		position: 'fixed !important',
		minWidth: ({ fromArticle, customWidth }) =>
			fromArticle ? 'calc(100% - 82px)' : customWidth || '40% !important',
		transform: 'none !important',
		overflowY: 'auto !important',
		overflowX: 'hidden',
		backgroundColor: '#000000 !important'
	},
	content: {
		padding: ({ fromArticle }) => (fromArticle ? '0px' : '4rem')
	},
	closeIcon: {
		width: '3.2rem !important',
		height: '3.2rem !important',
		marginRight: '1.6rem !important',
		padding: '0.5rem !important',
		background: '#404040 !important',
		borderRadius: '50% !important',
		cursor: 'pointer !important',
		color: ({ fromArticle }) => (fromArticle ? 'white' : null)
	},
	articleBuilderHeader: {
		padding: '4rem 0rem 0rem 0rem',
		display: 'flex',
		alignItems: 'center',
		marginBottom: '2.5rem',
		position: 'fixed',
		zIndex: '2',
		background: 'black',
		width: '90%'
	},
	header: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: '2.5rem'
	},
	heading: {
		color: '#ffff00'
	},
	notifIDWrapper: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	notifID: {
		fontFamily: 'Poppins',
		fontStyle: 'normal',
		fontWeight: '700',
		fontSize: '12px',
		lineHeight: '16px',
		letterSpacing: '0.03em',
		color: '#808080'
	}
}));
