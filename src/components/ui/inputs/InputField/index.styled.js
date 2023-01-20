import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	inputFieldContainer: {
		marginBottom: '0.5rem',

		'& .MuiFormHelperText-root': {
			color: (props) =>
				props.isError ? theme.palette.red : theme.palette.white,
			fontSize: '1rem',
			fontWeight: 'bold',
			marginLeft: '1rem'
		},

		'& .Mui-disabled': {
			backgroundColor: theme.palette.normalGrey,
			color: theme.palette.lightGrey
		}
	},

	rightLabel: {
		display: 'inline-block',
		fontSize: '1.2rem',
		fontWeight: 'bold',
		marginBottom: '0.5rem',
		color: ({ inputLengthPercent }) =>
			rightLableColor(inputLengthPercent, theme.palette)
	},

	endIcon: {
		marginRight: 8
	},

	inputField: {
		cursor: ({ readOnly }) =>
			readOnly ? 'default !important' : 'text !important'
	}
}));

function rightLableColor(percentage, colorPalette) {
	if (percentage >= 90 && percentage < 100) return colorPalette.pink;
	else if (percentage === 100) return colorPalette.red;
	else return colorPalette.white;
}
