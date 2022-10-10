import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiAccordion-root': {
			backgroundColor: `${theme.palette.black} `,
			color: theme.palette.white,
			margin: '20px 0px',
			border: `1px solid ${theme.palette.normalGrey}`,
			borderRadius: '6px !important'
		},

		'& .MuiSvgIcon-root': {
			color: theme.palette.white,
			fontSize: '25px'
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
		width: '48%',
		display: 'inline-block'
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
		border: `1px solid ${theme.palette.normalGrey}`,
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
	},

	textFieldInput: {
		...theme.components.textFieldInput
	}
}));
