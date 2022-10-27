import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiSvgIcon-root': {
			color: theme.palette.white,
			fontSize: '25px'
		},
		'& .MuiAccordion-root': {
			backgroundColor: `${theme.palette.black} `,
			color: theme.palette.white,
			margin: '20px 0px',
			border: `1px solid ${theme.palette.grey}`,
			borderRadius: '6px !important'
		},

		'& .MuiTypography-root': {
			fontFamily: 'Poppins',
			fontWeight: '800',
			fontSize: '18px',
			lineHeight: '30px',
			display: 'flex',
			alignItems: 'center'
		}
	},
	articleBuilder: {
		border: '1px solid #404040',
		borderRadius: '8px',
		margin: '10px 0px',
		padding: '20px'
	},
	draggableWrapperHead: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom:"25px"
	},
	grabIcon: {
		height: '12px',
		width: '16px',
		padding: '10px 0px',
		'& > path': {
			fill: `${theme.palette.white} !important`
		}
	},
	deleteIcon: {
		padding: '3px 0px',
		width: '20px',
		'& > path': {
			fill: `${theme.palette.white} !important`
		}
	},

	grabIconDiv: {
		width: '32px',
		height: '32px',
		background: ' #404040',
		borderRadius: '40px',
		textAlign: 'center'
	},
	deleteIconDiv: {
		width: '32px',
		height: '32px',
		background: ' #404040',
		borderRadius: '40px',
		textAlign: 'center',
		cursor: 'pointer'
	},
	expandIconDiv: {
		width: '32px',
		height: '32px',
		background: ' #404040',
		borderRadius: '40px',
		textAlign: 'center',
		marginLeft: '10px',
		cursor: 'pointer',
		'& > svg': {
			padding: '3px 0px',
			color: theme.palette.white,
			fontSize: '25px',
			fill: `${theme.palette.white} !important`
		}
	},
	rightDiv: {
		display: 'flex'
	},
	leftDiv: {
		display: 'flex'
	},
	wrapperHeading: {
		fontFamily: 'Poppins',
		fontStyle: 'normal',
		fontWeight: 800,
		fontSize: '20px',
		lineHeight: '30px',
		marginLeft: '20px',
		color: `${theme.palette.white} !important`
	},

	textFieldInput: {
		...theme.components.textFieldInput,
		width: '100%'
	},
	socialmediaDrags: {
		marginTop: '20px',
		'& h6': {
			marginBottom: '0.5rem',
			marginLeft: '1rem'
		},
		marginBottom: '2rem'
	},

	categoryContainer: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',

		'& h6': {
			marginBottom: '0.6rem',
			marginLeft: '1rem'
		}
	},
	mainCategory: {
		width: '100%',
		display: 'inline-block',
		
		// marginTop: '20px',
		'& h6': {
			marginBottom: '0.5rem',
			marginLeft: '1rem'
		},
		marginBottom: '2rem'
	},

	subCategory: {
		width: '48%',
		display: 'inline-block'
	},
	select: {
		'& .MuiSelect-select': {
			padding: '1rem 0rem 1rem 1rem',
			paddingRight: '32px'
		},
		width: '100%',
		padding: '3px 0',
		color: `${theme.palette.white} !important`,
		border: `1px solid ${theme.palette.grey}`,
		fontSize: ' 1.4rem !important',
		lineHeight: '1.6 !important',
		borderRadius: '5rem !important',
		marginBottom: '1rem !important',
		backgroundColor: `${theme.palette.black}`,
		"& div[role='button']": {
			padding: '1rem 0rem 1rem 2rem'
		},

		'& svg': {
			color: `${theme.palette.neonYellow} !important`,
			right: '1rem !important',
			top: 0,
			fontSize: '4rem !important'
		}
	},

	isEditSelect: {
		opacity: '0.7'
	},

	authorContainer: {
		margin: '10px 0px',
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'flex-start',
		padding: '0px',
		gap: '8px',

		'& h6': {
			marginBottom: '0.5rem',
			fontFamily: "'Poppins'",
			fontWeight: '700',
			fontSize: '12px',
			lineHeight: '16px',
			letterSpacing: '0.02em',
			textTransform: 'uppercase'
		}
	},

	authorAvatar: {
		display: 'inline-block',
		cursor: 'pointer'
	},

	authorName: {
		display: 'inline-block',
		width: '100%'
	},

	textField: {
		width: '100%'
	}
}));
