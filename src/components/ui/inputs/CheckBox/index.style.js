import { makeStyles } from '@material-ui/core';

export const useCheckBoxStyles = makeStyles((theme) => ({
	checkBoxWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	root: {
		'& .MuiSvgIcon-root': {
			// height: '16px',
			// width: '16px'
			// fontSize: '16px'
		}
	},
	checked: {
		color: `${theme.palette.neonYellow} !important`
	},
	label: {
		fontSize: '12px !important',
		fontWeight: '400 !important',
		lineHeight: '16px !important'
	},
	infoIcon: { cursor: 'pointer', height: '16px', width: '16px' }
}));
