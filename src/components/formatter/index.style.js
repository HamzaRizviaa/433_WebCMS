import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
    viralRow: {
		marginBottom: '1.5rem',
		fontSize: '1.2rem',
		paddingRight: '30px',
		display: 'block',
		maxWidth: '80%',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		whiteSpace: 'nowrap'
	},
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
	publish_draft_btn: {
		paddingLeft: '20px',
		marginBottom: '1.6rem'
	},
	active_closed_btn: {
		paddingLeft: '30px',
		marginBottom: ' 1.7rem',
		fontSize: '1.2rem',
		width: '90px',
		height: '24px'
	},
}))