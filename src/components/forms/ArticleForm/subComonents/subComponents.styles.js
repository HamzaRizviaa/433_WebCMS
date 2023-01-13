/* eslint-disable no-dupe-keys */
import { makeStyles } from '@material-ui/core';
import theme from '../../../../assets/theme';

export const useStyles = makeStyles(() => ({
	elementContainer: { padding: '0px 5px', marginBottom: '16px' },
	gridDivSmall: {
		position: 'sticky',
		top: '100px',
		paddingRight: '10px'
	},

	gridMainDiv: {
		overflowY: 'scroll'
	},
	firstGridItem: {
		maxWidth: '22%',
		flexBasis: '22%',
		paddingRight: '1rem'
	},
	secondGridItem: {
		maxWidth: '45%',
		flexBasis: '45%',
		padding: '0px 1.5px',
		marginTop: '10rem'
	},
	lastGridItem: {
		maxWidth: '33%',
		flexBasis: '33%',
		marginTop: '10rem'
	},
	textField: {
		width: '100%'
	},

	textFieldInput: {
		...theme.components.textFieldInput
	},
	mainTitleDescription: {
		'& h2': { fontSize: '20px', fontWeight: 800, color: theme.palette.white },
		'& p': { fontSize: '14px', color: theme.palette.white }
	},
	captionContainer: {
		'& h6': {
			marginBottom: '0.5rem',
			marginLeft: '1rem'
		}
	},
	categoryContainer: {
		marginTop: '2.5rem',
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',

		'& h6': {
			marginBottom: '0.5rem',
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

	postMediaHeader: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	postMediaContainer: {
		marginTop: '2.5rem'
	},
	mediaContainer: {
		marginTop: '2.5rem',
		'& h6': {
			marginBottom: '0.5rem',
			marginLeft: '1rem'
		}
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
			color: theme.palette.neonYellow,
			right: '1rem',
			top: 0,
			fontSize: '4rem'
		}
	},

	textFieldInput2: {
		color: ` ${theme.palette.white} !important`,
		border: `0.01px solid ${theme.palette.normalGrey}`,
		padding: '1rem 1rem 1rem 1.5rem !important',
		fontSize: '1.4rem !important',
		lineHeight: '1.6 !important',
		borderRadius: '40px',
		marginBottom: '1rem',
		backgroundColor: theme.palette.black,

		'& svg': {
			color: theme.palette.neonYellow,
			right: '5rem !important',
			top: '0 !important',
			fontSize: '3rem !important'
		}
	},

	buttonDiv: {
		width: '100%',
		marginBottom: '4rem',
		display: 'flex',
		justifyContent: 'space-between'
	},
	publishDraftDiv: {
		display: 'flex'
	},

	postBtn: {
		width: '100%'
	},

	postBtnEdit: {
		width: '70%',
		display: 'inline-block'
	},

	editBtn: {
		display: 'inline-block'
	},

	video: {
		'&::-webkit-media-controls-fullscreen-button': {
			display: 'none'
		}
	},

	// previews
	previewWrapper: {
		height: '812px',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		overflowY: 'auto',
		overflowX: 'hidden',
		width: '390px'
		// padding: '5px 10px'
	},
	backgroundSet: {
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		width: '380px',
		// height: `${height}px`, linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 75%, rgba(0,0,0,1) 100%);
		height: '650px',
		backgroundImage: ({
			url
		}) => `linear-gradient(to bottom, transparent 60%, black 89%),
					url(${url})`
	},
	topIcons: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '2px',
		marginTop: '4px'
	},
	topMobileIcons: {
		display: 'flex',
		justifyContent: 'space-between',
		padding: '2px',
		height: '20px'
	},
	mobileTopBars: { display: 'flex', padding: '2px 4px' },
	mobileIcons: { marginLeft: '3px', height: '10px' },
	timeCon: { color: 'white' },
	icons: {
		width: '40px',
		height: '40px',
		background: 'rgba(204, 204, 204, 0.2)',
		borderRadius: '40px',
		display: 'flex',
		justifyContent: 'center'
	},
	navIcons: {
		width: '40px',
		height: '40px',
		background: '#333333',
		borderRadius: '20px',
		display: 'flex',
		justifyContent: 'center',
		opacity: 0.5
	},
	goBackIcon: {
		height: '11px',
		marginLeft: '-4px',
		paddingTop: '14px',
		position: 'relative',
		right: '335px'
	},
	shareIcon: { height: '25px', paddingTop: '7px' },

	footballIcon: {
		width: '20px',
		height: '20px',
		padding: '11px 0px'
	},
	commentIcon: {
		width: '23px',
		height: '25px',
		padding: '8px 0px 10px 0px'
	},
	commentbox: {
		marginLeft: '5px'
	},
	subCatText: {
		fontWeight: 700,
		fontSize: '12px',
		lineHeight: '16px',
		textTransform: 'uppercase',
		margin: '10px 0px'
	},
	mainTitle: {
		fontWeight: 800,
		fontSize: '24px',
		lineHeight: '40px',
		color: 'white',
		overflowWrap: 'anywhere'
	},
	authordetails: {
		display: 'flex',
		padding: '2px',
		marginTop: '5px'
	},
	authorname: {
		fontWeight: 700,
		fontSize: '14px',
		lineHeight: '18px'
	},
	postDateDetails: {
		fontWeight: 400,
		fontSize: '11px',
		lineHeight: '16px',
		color: '#CCCCCC'
	},
	authorSection: {
		marginLeft: '8px',
		color: 'white'
	},
	description: {
		marginTop: '10px',
		padding: '2px',
		color: 'white',
		fontWeight: 400,
		fontSize: '12px',
		lineHeight: '16px'
	},

	mainContent: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	rightContent: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
		padding: '6px',
		gap: '8px'
	},

	avatarRoot: {
		width: '32px !important',
		height: '32px !important'
	}
}));
