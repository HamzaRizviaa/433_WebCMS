import { makeStyles } from '@material-ui/core';

export const useModalStyles = makeStyles((theme) => ({
	root: {
		padding: '0px !important'
	},

	dialogContentRoot: {
		padding: '4px 0 !important',
		'&::-webkit-scrollbar': { display: 'none' }
	},

	dialogBox: {
		backgroundColor: ({ color }) =>
			color === 'primary'
				? `${theme.palette.normalGrey} !important`
				: `${theme.palette.darkGrey} !important`,
		borderRadius: '10px !important',
		minWidth: ({ customWidth }) => (customWidth ? customWidth : '929px'),
		boxShadow: '0px 16px 40px rgba(255, 255, 0, 0.17) !important',
		padding: '24px !important',
		maxHeight: '648px',
		boxSizing: 'border-box',
		scrollbarWidth: 'none'
	},

	dialogTitle: {
		fontFamily: `${theme.typography.fontFamily} !important`,
		fontStyle: 'normal !important',
		fontWeight: '700 !important',
		fontSize: '24px !important',
		lineHeight: '36px !important',
		color: theme.palette.white,
		display: 'flex !important',
		justifyContent: 'flex-start !important',
		marginBottom: '32px'
	},

	dialogContentText: {
		fontFamily: `${theme.typography.fontFamily} !important`,
		fontStyle: 'normal !important',
		fontWeight: '400 !important',
		fontSize: '16px !important',
		lineHeight: '24px !important',
		color: `${theme.palette.white} !important`
	},

	dialogActions: {
		display: 'flex !important',
		justifyContent: 'space-between !important',
		padding: '0px 24px 20px 24px !important'
	},

	closeIcon: {
		fontSize: '22px !important',
		color: theme.palette.white
	},

	closeIconRoot: {
		backgroundColor: theme.palette.black,
		marginRight: '16px',
		width: '32px',
		height: '32px',
		'&:hover': {
			backgroundColor: theme.palette.black
		}
	},

	modalBtns: {
		textTransform: 'uppercase'
	}
}));
