import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	fieldWrapper: {
		marginBottom: '1.5rem'
	},
	buttonDiv: {
		width: '100%',
		marginTop: '3rem',
		marginBottom: '1rem',
		display: 'flex',
		justifyContent: 'end',

		'& button + button': {
			marginLeft: 10
		}
	},
	imageText: {
		marginBottom: '8px'
	},
	coverText: {
		marginBottom: '2rem'
	},
	publishDraftDiv: {
		display: 'flex'
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

	addMediaBtn: {
		marginTop: '0.5rem'
	},

	addMediaBtnEdit: {
		marginTop: '0.5rem',
		display: 'inline-block'
	},

	draftBtn: {
		marginTop: '0.5rem'
	},

	draftBtnEdit: {
		marginTop: '0.5rem',
		display: 'inline-block'
	},

	editBtn: {
		width: '100%',
		display: 'flex',
		justifySelf: 'flex-start'
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

	uploadedFilesContainer: {
		marginTop: '1.5rem',
		maxHeight: '220px'
	},

	filePreview: {
		padding: '1.5rem 2rem',
		boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.25)',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'relative'
	},

	textFieldInput: {
		...theme.components.textFieldInput
	},

	previewFile: {
		height: '8rem',
		width: '8rem'
	},

	isEditSelect: {
		opacity: '0.7'
	},

	catergoryErrorContainer: {
		display: 'flex',
		justifyContent: 'left'
	},

	select: {
		'& .MuiSelect-select': {
			padding: '1rem 0rem 1rem 1rem',
			paddingRight: '32px'
		},
		width: '100%',
		padding: ' 3px 0px',
		paddingRright: ' 10px',
		color: `${theme.palette.white} !important`,
		border: `1px solid ${theme.palette.normalGrey}`,
		fontSize: ' 1.4rem !important',
		lineHeight: '1.6 !important',
		borderRadius: '5rem !important',
		marginBottom: '1rem !important',
		backgroundColor: `${theme.palette.black}`,

		"& div[role='button']": {
			padding: '0.5rem 0rem 0.5rem 2rem'
		},

		'& svg': {
			color: theme.palette.neonYellow,
			right: '1rem',
			top: '0',
			fontSize: '3rem'
		}
	},

	titleContainer: {
		'& h6': {
			marginBottom: '0.5rem',
			marginLeft: '1rem'
		}
	}
}));
