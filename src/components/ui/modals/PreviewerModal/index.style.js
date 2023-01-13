import { makeStyles } from '@material-ui/core';

export const usePreviewrModalStyles = makeStyles((theme) => ({
	root: {
		padding: '18px 24px !important'
	},

	dialogContentRoot: {
		padding: '4px 24px !important',
		overflowY: 'scroll'
	},

	dialogBox: {
		width: '500px',
		height: '420px',
		backgroundColor: '#000000 !important',
		borderRadius: '16px !important',
		border: '1px solid #333333'
	},

	dialogTitleWrapper: {
		background: theme.palette.black90
	},

	dialogTitle: {
		fontFamily: `${theme.typography.fontFamily} !important`,
		fontStyle: 'normal !important',
		fontWeight: '500 !important',
		fontSize: '16px !important',
		lineHeight: '36px !important',
		color: theme.palette.white,
		display: 'flex !important',
		alignItems: 'center'
	},

	title: {
		marginLeft: '8px'
	},

	dialogContentWrapper: {
		padding: '8px 0px'
	},

	closeIcon: {
		fontSize: '22px !important',
		color: theme.palette.white
	},

	closeIconRoot: {
		backgroundColor: theme.palette.black80,
		width: '32px',
		height: '32px',
		'&:hover': {
			backgroundColor: theme.palette.black80
		}
	}
}));
