import { makeStyles } from '@material-ui/core';

export const useRadioButtonStyles = makeStyles((theme) => ({
	root: {
		color: theme.palette.white,

		'& .MuiSvgIcon-root': {
			fontSize: 24
		}
	},

	checked: {
		color: `${theme.palette.neonYellow} !important`
	},

	radioLabel: {
		fontSize: 16
	},

	helperText: {
		fontSize: 12,
		color: theme.palette.lightGrey,
		marginLeft: 30,
		lineHeight: 1.5,
		marginTop: -3,
		paddingBottom: 9
	}
}));
