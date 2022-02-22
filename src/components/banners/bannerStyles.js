import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
	root: {
		'& .MuiTouchRipple-root': {
			display: 'none !important'
		}
	},
	paper: {
		background: 'black',
		border: '1px solid #404040',
		boxShadow: '0px 16px 40px rgba(255, 255, 255, 0.16)',
		borderRadius: '8px',
		color: '#ffffff',
		fontSize: '14px',
		fontFamily: 'Poppins !important'
		// '&:hover': {
		// 	color: 'yellow'
		// 	// cursor: pointer;
		// }
	},
	// '& .MuiMenuItem-root': {
	// 	fontFamily: 'Poppins !important'
	// },
	input: {
		color: 'white',
		'&:hover': {
			boxShadow: '0px 16px 40px rgba(255, 255, 255, 0.16)'
		}
	},
	inputPlaceholder: {
		color: '#808080',
		'&:hover': {
			boxShadow: '0px 16px 40px rgba(255, 255, 255, 0.16)'
		}
	}
}));
export const useStyles2 = makeStyles(() => ({
	root: {
		'& .Mui-focused': {
			display: 'none !important'
			//outline: 'none !important'
		}
	}
}));
