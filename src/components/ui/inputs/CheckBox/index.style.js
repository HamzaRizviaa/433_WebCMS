import { makeStyles } from '@material-ui/core';

export const useCheckBoxStyles = makeStyles((theme) => ({
	checkBoxWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	checked: {
		color: `${theme.palette.neonYellow} !important`
	},
	icon: {
		'input:disabled ~ &': {
			opacity: '0.5'
		}
	},
	label: {
		fontSize: '12px !important',
		fontWeight: '400 !important',
		lineHeight: '16px !important',

		'&.Mui-disabled': {
			color: `${theme.palette.disabled}`
		}
	},
	infoIcon: { cursor: 'pointer', height: '16px', width: '16px' }
}));
