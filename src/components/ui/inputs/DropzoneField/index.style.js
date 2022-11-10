import { makeStyles } from '@material-ui/core';

export const useDropzoneStyles = makeStyles((theme) => ({
	dropZoneContainer: {
		borderWidth: 1.5,
		borderStyle: 'dashed',
		borderColor: ({ isError }) =>
			isError ? theme.palette.red : theme.palette.neonYellow,
		cursor: 'pointer',
		borderRadius: '1rem'
	},

	dropzone: {
		textAlign: 'center',
		padding: '1.5rem 2.5rem 2rem 1.5rem'
	},

	dragMsg: {
		fontSize: '1.4rem',
		lineHeight: '2.4rem',
		fontWeight: 400,
		...theme.components.preventSelect,
		color: theme.palette.white
	},

	formatMsg: {
		fontSize: '1.2rem',
		lineHeight: '1.6rem',
		fontWeight: 400,
		color: theme.palette.lightGrey,
		...theme.components.preventSelect
	},

	addFilesIcon: {
		height: '2rem !important',
		width: '2rem !important',
		marginBottom: '1.5rem',
		color: `${theme.palette.neonYellow} !important`
	},

	fileRejectionError: {
		color: theme.palette.red,
		fontWeight: 'bold',
		height: '1rem',
		textAlign: 'center',
		marginTop: 1
	},

	uploadedFilesContainer: {
		marginTop: '1rem',
		maxHeight: '220px',
		overflowY: 'auto',
		'-ms-overflow-style': 'none' /* Internet Explorer 10+ */,
		scrollbarWidth: 'none' /* Firefox */
	},

	filePreview: {
		padding: '1.5rem 2rem',
		boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.25)',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		// position: 'relative',

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

	previewWrapper: {
		position: 'relative'
	},

	videoThumbnail: {
		display: ({ showPreview }) => (showPreview ? 'block' : 'none'),
		width: '8rem',
		borderRadius: '4px',
		backgroundColor: theme.palette.white
	},

	filePreviewIcons: {
		color: theme.palette.neonYellow,
		fontSize: '2.5rem !important',
		marginLeft: '2rem',
		cursor: 'pointer'
	},

	fileName: {
		fontSize: '1rem',
		maxWidth: '150px',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		color: '#ffffff'
	},

	fileThumbnail: {
		width: '8rem',
		borderRadius: '4px',
		objectFit: 'cover',
		objectPosition: 'center'
	},

	defaultThumbnailBackground: {
		height: '8rem',
		width: '8rem',
		borderRadius: '4px',
		backgroundColor: '#404040'
	},

	playIcon: {
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translate(-50%, -50%)',
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

	horizontalLine: {
		borderColor: theme.palette.normalGrey,
		borderWidth: '0.5px'
	}
}));
