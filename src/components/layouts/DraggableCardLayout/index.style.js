import { makeStyles } from '@material-ui/core';

export const useDraggableHeaderStyles = makeStyles((theme) => ({
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
	wrapperHeading: {
		fontFamily: 'Poppins',
		fontStyle: 'normal',
		fontWeight: 800,
		fontSize: '20px',
		lineHeight: '30px',
		marginLeft: '20px',
		color: `${theme.palette.white} !important`
	},
	grabIcon: {
		height: '12px',
		width: '16px',
		padding: '10px 0px',
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
	subHeader: {
		display: 'flex'
	},
	deleteIcon: {
		padding: '3px 6px',
		width: '20px',
		'& > path': {
			fill: `${theme.palette.white} !important`
		},
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
	}
}));
