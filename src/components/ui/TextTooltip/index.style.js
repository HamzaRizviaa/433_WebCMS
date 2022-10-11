import { makeStyles } from '@material-ui/core';

export const useTextTooltipStyles = makeStyles((theme) => ({
	toolTip: {
		backgroundColor: theme.palette.black,
		fontFamily: 'Poppins',
		fontSize: '12px',
		lineHeight: ' 16px',
		borderRadius: '8px',
		maxWidth: 'none',
		textTransform: 'uppercase'
	},

	toolTipArrow: {
		color: theme.palette.black
	}
}));
