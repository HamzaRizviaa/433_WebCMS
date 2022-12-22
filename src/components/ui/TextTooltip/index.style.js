import { makeStyles } from '@material-ui/core';

export const useTextTooltipStyles = makeStyles((theme) => ({
	toolTip: {
		backgroundColor: ({ secondary }) =>
			secondary ? theme.palette.black80 : theme.palette.black,
		padding: ({ secondary }) => (secondary ? '8px' : 'none'),
		fontFamily: 'Poppins',
		fontWeight: '400',
		fontSize: '12px',
		lineHeight: ' 16px',
		borderRadius: '8px',
		maxWidth: ({ secondary }) => (secondary ? '238px' : 'none'),
		textTransform: ({ secondary }) => (secondary ? 'none' : 'uppercase')
	},

	toolTipArrow: {
		color: ({ secondary }) =>
			secondary ? theme.palette.black80 : theme.palette.black
	}
}));
