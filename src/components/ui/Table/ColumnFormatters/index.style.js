import { makeStyles } from '@material-ui/core';

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
		cursor: 'pointer',
		marginBottom: '1rem'
	},

	tableCell: {
		marginBottom: '1.5rem',
		fontSize: '1.2rem',
		paddingRight: '30px',
		display: 'block',
		maxWidth: '80%',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		whiteSpace: 'nowrap'
	},

	textWithIconWrapper: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: '1.5rem',
		fontSize: '1.2rem',
		paddingRight: 18
	},

	iconWrapper: { marginRight: '10px', minWidth: '20px' }
}));