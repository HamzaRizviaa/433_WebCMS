import { makeStyles } from '@material-ui/core';

export const useDropzoneFilePreviewerStyles = makeStyles((theme) => ({
	previewComponent: {
		width: '35%',
		borderLeft: `1px solid ${theme.palette.normalGrey}`,
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

	previewFile: {
		width: '100%',
		height: '32rem',
		objectFit: 'contain',
		objectPosition: 'center'
	}
}));
