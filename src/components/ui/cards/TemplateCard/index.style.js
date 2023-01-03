import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
	cardModal: {
		display: 'flex',
		gap: '16px'
		// /	flexWrap: 'wrap'
	},
	cardList: {
		display: 'flex',
		flexDirection: 'row'
	},
	// gridContainer: { gap: '10px' },
	card: {
		height: '180px',
		backgroundColor: '#191919',
		borderRadius: '16px',
		padding: '24px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		flexBasis: '283px',
		boxSizing: 'border-box',
		cursor: 'pointer',
		margin: '0px 10px'
	},
	newCard: {
		margin: '0px 10px',
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
		fontWeight: 800,
		fontSize: '18px',
		lineHeight: '24px',
		letterSpacing: '0.03em',
		textTransform: 'capitalize',
		marginBottom: '24px'
	},
	dateBlock: {
		fontWeight: 400,
		fontSize: '12px',
		lineHeight: '16px',
		color: '#808080'
	},
	date: {
		color: '#CCCCCC',
		fontSize: '14px',
		lineHeight: '24px'
	}
}));
