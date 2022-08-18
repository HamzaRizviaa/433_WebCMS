import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: '25px',
		'& .MuiSvgIcon-root': {
			color: theme.palette.white,
			fontSize: '25px'
		},
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
	articleBuilder: {
		border: '1px solid #404040',
		borderRadius: '8px',
		margin: '10px 0px',
		padding: '20px'
	},
	draggableWrapperHead: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	grabIcon: {
		height: '12px',
		width: '16px',
		padding: '10px 0px',
		'& > path': {
			fill: `${theme.palette.white} !important`
		}
	},
	deleteIcon: {
		padding: '3px 0px',
		width: '20px',
		'& > path': {
			fill: `${theme.palette.white} !important`
		}
	},

	grabIconDiv: {
		width: '32px',
		height: '32px',
		background: ' #404040',
		borderRadius: '40px',
		textAlign: 'center'
	},
	deleteIconDiv: {
		width: '32px',
		height: '32px',
		background: ' #404040',
		borderRadius: '40px',
		textAlign: 'center',
		cursor: 'pointer'
	},
	expandIconDiv: {
		width: '32px',
		height: '32px',
		background: ' #404040',
		borderRadius: '40px',
		textAlign: 'center',
		marginLeft: '10px',
		cursor: 'pointer',
		'& > svg': {
			padding: '3px 0px',
			color: theme.palette.white,
			fontSize: '25px',
			fill: `${theme.palette.white} !important`
		}
	},
	rightDiv: {
		display: 'flex'
	},
	leftDiv: {
		display: 'flex'
	},
	wrapperHeading: {
		fontFamily: 'Poppins',
		fontStyle: 'normal',
		fontWeight: 800,
		fontSize: '20px',
		lineHeight: '30px',
		marginLeft: '20px',
		color: `${theme.palette.white} !important`
	}
}));
