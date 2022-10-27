import { makeStyles } from '@material-ui/core';
// import theme from '../assets/theme';
export const useStyles = makeStyles(() => ({
	matchBox: {
		display: 'flex',
		flexDirection: 'row',
		fontSize: '12px',
		color: '#FFFFFF',
		textTransform: 'capitalize',
		fontWeight: 700,
		justifyContent: 'space-evenly',
		borderRadius: '16px'
		// borderImageSlice: '1',
		// border: '2px solid transparent'
	},
	teamLogo: {
		width: '61px',
		marginBottom: '13px'
	},
	teamBox: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'start',
		'& div': {
			width: '98px',
			textAlign: 'center'
		}
	},
	matchDetails: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '8px',
		gap: '4px',
		width: '90px',
		height: '85px',
		background: 'rgba(255, 255, 255, 0.15)',
		borderRadius: '16px',
		fontSize: '12px',
		color: '#FFFFFF',
		fontWeight: 400
	},
	matchDiv: {
		border: '1px solid transparent',
		position: 'relative',
		background: 'linear-gradient(#2D2D2D, #000)',
		borderRadius: 16,
		backgroundClip: 'padding-box',
		'&:after': {
			position: 'absolute',
			top: -4,
			bottom: -4,
			left: -4,
			right: -4,
			content: `""`,
			zIndex: -1,
			borderRadius: 16
		}
	}
}));
