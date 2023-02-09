import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
	cardContentBox: {
		display: 'flex'
	},
	card: {
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
		flexBasis: '283px',
		cursor: 'pointer'
	},
	icons: {
		width: '40px',
		height: '40px',
		marginBottom: '16px'
	},
	text: {
		fontWeight: 800,
		fontSize: '16px',
		lineHeight: '24px',
		letterSpacing: '0.03em',
		textTransform: 'capitalize'
	},
	subText: {
		fontWeight: 400,
		fontSize: '12px',
		lineHeight: '16px'
	}
}));
