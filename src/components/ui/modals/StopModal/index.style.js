import { makeStyles } from '@material-ui/core';
import theme from '../../../../assets/theme';

export const useStyles = makeStyles(() => ({
	root: {
		padding: '18px 24px !important'
	},
	root2: {
		padding: '4px 24px !important'
	},
	dialogBox: {
		backgroundColor: ` ${theme.palette.normalGrey} !important`,
		// padding: '16px',
		borderRadius: '8px !important',
		width: '420px',
		height: '180px',
		boxShadow: '0px 16px 40px rgba(255, 255, 0, 0.17) !important'
	},
	dialogTitle: {
		fontFamily: `${theme.typography.fontFamily} !important`,
		fontStyle: 'normal !important',
		fontWeight: '700 !important',
		fontSize: '16px !important',
		lineHeight: '24px !important',
		color: ` ${theme.palette.white} `,
		display: 'flex !important',
		justifyContent: 'space-between !important'
	},
	dialogContentText: {
		fontFamily: `${theme.typography.fontFamily} !important`,
		fontStyle: 'normal !important',
		fontWeight: '400 !important',
		fontSize: '16px !important',
		lineHeight: '24px !important',
		color: ` ${theme.palette.white} !important`
	},
	dialogActions: {
		display: 'flex !important',
		justifyContent: 'space-between !important',
		padding: '0px 24px 14px 24px !important'
	},
	closeIcon: {
		fontSize: '24px !important',
		color: ` ${theme.palette.white} `
	},
	closeIconRoot: {
		padding: '0px !important'
	},
	stopBtn: {
		textTransform: 'uppercase'
	}
}));
