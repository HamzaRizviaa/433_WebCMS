import { makeStyles } from '@material-ui/core';
// import theme from '../assets/theme';
export const useStyles = makeStyles(() => ({
	textDraggableData: {
		fontWeight: 400,
		fontSize: '16px',
		lineHeight: 1.2,
		color: 'white',
		overflowWrap: 'anywhere'
	},
	imageDraggableData: {
		maxWidth: '100%',
		'& >img': {
			borderRadius: '8px',
			maxWidth: '100%'
		}
	},
	images: {
		width: '100%',
		color: 'white',
		backgroundColor: 'black',
		borderRadius: '8px'
	},
	videos: {
		width: '100%',
		backgroundColor: 'black',
		borderRadius: '8px'
	},
	instaBox: {
		'& iframe': {
			maxHeight: ({ thumbnailHeight, thumbnailWidth }) =>
				thumbnailHeight > thumbnailWidth ? '459px' : '270px',
			minWidth: 'unset !important'
		}
	},
	questionDraggable: {
		height: '380px',
		borderRadius: '8px',
		marginTop: '16px',
		marginBottom: '16px',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	},
	questionDiv: {
		paddingLeft: '24px',
		paddingRight: '24px',
		textAlign: 'center'
	},
	question: {
		paddingTop: '200px',
		fontStyle: 'normal',
		fontWeight: 800,
		fontSize: '20px',
		lineHeight: '30px',
		color: '#FFFFFF'
	},
	answer: {
		height: '37px',
		fontStyle: 'normal',
		fontWeight: 800,
		fontSize: '12px',
		lineHeight: '30px',
		color: '#FFFFFF',
		borderRadius: '40px',
		padding: '6px 16px 0px 16px',
		backgroundColor: 'rgba(255, 255, 255, 0.25)',
		marginTop: '8px'
	}
}));
