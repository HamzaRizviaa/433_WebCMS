import { makeStyles } from '@material-ui/core';

export const useTextTooltipStyles = makeStyles((theme) => ({
	toolTip: {
		backgroundColor: ({ checkBox }) =>
			checkBox ? theme.palette.black80 : theme.palette.black,
		padding: ({ checkBox }) => (checkBox ? '8px' : 'none'),
		fontFamily: 'Poppins',
		fontWeight: '400',
		fontSize: '12px',
		lineHeight: ' 16px',
		borderRadius: '8px',
		maxWidth: ({ checkBox }) => (checkBox ? '238px' : 'none'),
		textTransform: ({ checkBox }) => (checkBox ? 'none' : 'uppercase')
	},

	toolTipArrow: {
		color: ({ checkBox }) =>
			checkBox ? theme.palette.black80 : theme.palette.black
	}
}));
