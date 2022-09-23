import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
    libraryToolTip: {
		backgroundColor: ' #000000 !important',
		fontFamily: 'Poppins !important',
		fontSize: '12px !important',
		lineHeight: '16px !important',
		borderRadius: '8px !important',
		maxWidth: 'none !important'
	},
	libraryToolTipArrow: {
		color: `#000000 !important`
	},
    editIcon: {
		width: '2.5rem',
		height: 'auto',
		cursor: 'pointer'
	},
}))