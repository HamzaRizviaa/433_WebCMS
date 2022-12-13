import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';

const BorderLinearProgress = withStyles((theme) => ({
	root: {
		height: '54px',
		borderRadius: '8px'
	},
	colorPrimary: {
		backgroundColor: '#404040 !important'
	},
	bar: {
		borderRadius: '8px',
		backgroundColor: theme.palette.mode === '#404040' ? 'red' : '#808080'
	}
}))(LinearProgress);

export default BorderLinearProgress;
