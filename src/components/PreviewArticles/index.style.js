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
		color: 'white'
	},
	videos: {
		width: '100%'
	}
}));
