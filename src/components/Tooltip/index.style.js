import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	toolTip: {
		backgroundColor: ` ${theme.palette.black} !important`,
		fontFamily: 'Poppins !important',
		fontSize: '12px !important',
		lineHeight: ' 16px !important',
		borderRadius: '8px !important',
		maxWidth: 'none !important',
		textTransform: 'uppercase'
	},

	toolTipArrow: {
		color: ` ${theme.palette.black} !important`
	}
}));
