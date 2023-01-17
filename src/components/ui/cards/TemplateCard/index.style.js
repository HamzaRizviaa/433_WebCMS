import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	cardModal: {
		display: 'flex',
		gap: '16px'
	},
	cardList: {
		display: 'flex',
		flexDirection: 'row'
	},
	card: {
		height: '180px',
		backgroundColor: '#191919',
		borderRadius: '16px',
		padding: '16px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		flexBasis: '283px',
		boxSizing: 'border-box',
		margin: '10px',
		border: ({ isSelected }) => (isSelected ? '1px solid #FFFF00' : 'none')
	},
	newCard: {
		margin: '10px',
		boxSizing: 'border-box',
		height: '180px',
		backgroundColor: '#191919',
		borderRadius: '16px',
		padding: '24px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		fontWeight: 800,
		fontSize: '16px',
		lineHeight: '24px',
		letterSpacing: '0.03em',
		textTransform: 'capitalize',
		flexBasis: '283px',
		cursor: 'pointer'
	},
	topBox: {
		padding: '8px 8px 0px 8px'
	},
	templateSVG: {
		width: '40px',
		height: '40px',
		marginBottom: '16px'
	},
	author: {
		fontWeight: 400,
		fontSize: '12px',
		lineHeight: '12px',
		color: '#B3B3B3',
		letterSpacing: '0.03em',
		textTransform: 'capitalize',
		marginBottom: '8px'
	},
	title: {
		cursor: 'pointer',
		fontWeight: 800,
		fontSize: '18px',
		lineHeight: '24px',
		letterSpacing: '0.03em',
		marginBottom: '24px',
		overflow: 'hidden',
		lineClamp: 2,
		boxOrient: 'vertical',
		display: '-webkit-box'
	},
	dateBlock: {
		fontWeight: 400,
		fontSize: '12px',
		lineHeight: '16px',
		color: '#808080',
		padding: '0px 0px 8px 8px'
	},
	date: {
		color: '#CCCCCC',
		fontSize: '14px',
		lineHeight: '24px'
	},
	skeletonCards: {
		backgroundColor: theme.palette.normalGrey,
		boxSizing: 'border-box',
		margin: '10px',
		borderRadius: 16,
		overflow: 'hidden'
	},
	bottomBox: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	iconBtn: {
		padding: 0,
		margin: 0
	}
}));
