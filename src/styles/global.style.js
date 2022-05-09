import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	dropZoneContainer: {
		border: `1.5px dashed ${theme.palette.neonYellow}`,
		cursor: 'pointer',
		borderRadius: '1rem'
	},

	borderRed: {
		borderColor: `${theme.palette.red} !important`
	},

	uploadMediaError: {
		color: theme.palette.red,
		fontWeight: 'bold',
		marginTop: '1rem',
		height: '1rem'
	},
	mediaError: {
		color: theme.palette.red,
		fontWeight: 'bold',
		height: '1rem',
		marginBottom: '1rem',
		marginLeft: '1rem'
	},

	characterCount: {
		marginRight: '0.5rem',
		display: 'flex',
		justifyContent: 'space-between'
	},

	fileRejectionError: {
		color: theme.palette.red,
		fontWeight: 'bold',
		height: '1rem',
		textAlign: 'center',
		marginBottom: '1.5rem'
	},

	dragMsg: {
		fontSize: '1.4rem',
		lineHeight: '2.4rem',
		fontWeight: 400,
		...theme.components.preventSelect
		// @include preventSelect,
	},

	formatMsg: {
		fontSize: '1.2rem',
		lineHeight: '1.6rem',
		fontWeight: 400,
		color: theme.palette.lightGrey,
		...theme.components.preventSelect
		// @include preventSelect,
	},

	addFilesIcon: {
		height: '2rem !important',
		width: '2rem !important',
		marginBottom: '1.5rem',
		color: theme.palette.neonYellow
	},

	dropzone: {
		textAlign: 'center',
		padding: '1.5rem 2.5rem 2rem 1.5rem'
	},

	previewComponent: {
		width: '35%',
		borderLeft: `1px solid ${theme.palette.grey}`,
		marginLeft: '3rem',
		paddingLeft: '3rem',
		marginBottom: '10rem'
	},

	closeIcon: {
		width: '3.2rem !important',
		height: '3.2rem !important',
		marginRight: '0.8rem',
		cursor: 'pointer !important'
	},

	previewHeader: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: '10px'
	},
	errorState: {
		color: theme.palette.red
	},

	noErrorState: {
		color: theme.palette.white
	},
	dropBoxUrlContainer: {
		'& h6': {
			marginBottom: '0.5rem',
			marginLeft: '1rem'
		},
		marginBottom: '2rem'
	},

	video: {
		'&::-webkit-media-controls-fullscreen-button': {
			display: 'none'
		}
	},

	editor: {
		margin: '10px 0px'
	},
	toolTip: {
		backgroundColor: ' $black-color !important',
		fontFamily: 'Poppins !important',
		fontSize: '12px !important',
		lineHeight: ' 16px !important',
		borderRadius: '8px !important',
		maxWidth: 'none !important'
	},

	toolTipArrow: {
		color: '$black-color !important'
	},
	explanationWrapper: {
		display: 'flex',
		justifyContent: 'flex-start',
		margin: '5% 0%',
		fontFamily: 'Poppins',
		fontSize: '16px',
		fontStyle: 'normal',
		fontWeight: '700',
		lineHeight: '24px'
	},
	contentWrapperNoPreview: {
		minHeight: 'calc(100vh - 107px)',
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	textField: {
		width: '100%'
	},

	textFieldInput: {
		...theme.components.textFieldInput
		// @include textFieldInput,
	},

	captionContainer: {
		'& h6': {
			marginBottom: '0.5rem',
			marginLeft: '1rem'
		}
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
		color: theme.palette.white,
		border: `1px solid ${theme.palette.grey}`,
		fontSize: ' 1.4rem !important',
		lineHeight: '1.6 !important',
		borderRadius: '5rem !important',
		marginBottom: '1rem !important',
		backgroundColor: `${theme.palette.black} !important`,
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
		border: `0.01px solid ${theme.palette.grey}`,
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
		marginBottom: '4rem'
	},

	postBtn: {
		width: '100%'
	},

	postBtnEdit: {
		width: '70%',
		display: 'inline-block'
	},

	editBtn: {
		width: '30%',
		display: 'inline-block'
	},

	previewContentWrapper: {
		minHeight: 'calc(100vh - 107px)',
		position: 'relative',
		display: 'flex',
		width: '1000px'
	},

	contentWrapper: {
		minHeight: 'calc(100vh - 107px)',
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between'
	},

	uploadedFilesContainer: {
		marginTop: '4rem',
		maxHeight: '220px',
		overflowY: 'auto',
		// -ms-overflow-style: none, /* Internet Explorer 10+ */
		// scrollbar-width: none, /* Firefox */
		'&::-webkit-scrollbar': {
			display: 'none'
		}
	},

	filePreview: {
		padding: '1.5rem 2rem',
		boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.25)',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'relative',
		'&:last-child': {
			boxShadow: 'none'
		}
	},

	filePreviewLeft: {
		display: 'flex',
		alignItems: 'center',
		gap: '10px',
		width: '100%'
	},

	filePreviewRight: {
		display: 'flex',
		alignItems: 'center'
	},

	fileThumbnail: {
		height: '8rem',
		maxWidth: '50%',
		borderRadius: '4px',
		backgroundColor: theme.palette.white
	},

	fileName: {
		fontSize: '1rem',
		maxWidth: '150px',
		textOverflow: 'ellipsis',
		overflow: 'hidden'
	},

	filePreviewIcons: {
		color: theme.palette.neonYellow,
		fontSize: '2.5rem !important',
		marginLeft: '2rem',
		cursor: 'pointer'
	},

	playIcon: {
		position: 'absolute',
		left: '48px',
		height: '2.5rem !important',
		width: 'auto !important',
		color: theme.palette.neonYellow
	},

	playIconPortrait: {
		position: 'absolute',
		left: '38px',
		height: '2.5rem !important',
		width: 'auto !important',
		color: theme.palette.neonYellow
	},

	loaderContainer: {
		position: 'absolute',
		width: 'calc(100% - 20px)',
		height: '110px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},

	loaderContainer2: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.87)',
		zIndex: 100
	},

	loader: {
		color: `${theme.palette.neonYellow} !important`
	},

	orientation: {
		marginRight: '2rem'
	},

	headerOrientationWrapper: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%'
	},

	orientationDimensionWrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},

	dimensionWrapper: {
		borderRadius: '8px',
		backgroundColor: theme.palette.grey,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: '2px'
	},

	dimensionSingle: {
		borderRadius: '8px',
		padding: '1rem 1rem 0.8rem 1rem'
	},

	dimensionPreviewIcons: {
		color: theme.palette.disabled,
		cursor: 'pointer'
	}
}));
