import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
	root: {
		'& .TabsListUnstyled-root': {
			width: '100%',
			border: 'none',
			backgroundColor: '#404040',
			borderRadius: '8px',
			padding: '6px 0px'
		},
		'& .TabUnstyled-root': {
			width: '49%',
			backgroundColor: '#404040',
			color: '#ffffff !important',
			border: 'none !important',
			fontFamily: 'Poppins',
			fontStyle: 'normal',
			fontWeight: 'bold',
			fontSize: '12px',
			lineHeight: '16px',
			textTransform: 'capitalize'
		},
		' & .Mui-selected': {
			color: '#000000 !important',
			border: 'none !important',
			backgroundColor: '#ffff00 !important',
			marginRight: '4px !important',
			marginLeft: '4px !important',
			borderRadius: '4px !important',
			padding: '8px 0px'
		}
	},
	edit: {
		'& .TabUnstyled-root': {
			width: '100%',
			backgroundColor: '#404040',
			color: '#ffffff !important',
			border: 'none !important',
			fontFamily: 'Poppins',
			fontStyle: 'normal',
			fontWeight: 'bold',
			fontSize: '12px',
			lineHeight: '16px',
			textTransform: 'capitalize'
		},
		' & .Mui-selected': {
			color: '#000000 !important',
			border: 'none !important',
			backgroundColor: '#ffff00 !important',
			marginRight: '4px !important',
			marginLeft: '4px !important',
			borderRadius: '4px !important',
			padding: '8px 0px'
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
		// 	//color: 'yellow'
		// 	// cursor: pointer;
		// 	borderColor: 'yellow'
		// }
	},
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
