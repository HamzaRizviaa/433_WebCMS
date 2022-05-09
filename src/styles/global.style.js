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
	}
}));
