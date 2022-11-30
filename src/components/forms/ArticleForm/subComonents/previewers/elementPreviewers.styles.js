import { makeStyles } from '@material-ui/core';
// import theme from '../assets/theme';
export const useStyles = makeStyles(() => ({
	/**
	 * MATCH ELEMENT STYLINGS
	 */
	MatchContainer: {
		background: ({ team1Color, team2Color }) =>
			`linear-gradient(to right, ${team1Color} 0%, #000 50%, ${team2Color} 100%)`,
		padding: 0,
		borderRadius: 16
	},
	matchBox: {
		display: 'flex',
		flexDirection: 'row',
		fontSize: '12px',
		color: '#FFFFFF',
		textTransform: 'capitalize',
		fontWeight: 700,
		justifyContent: 'space-evenly',
		borderRadius: '16px'
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
	dateDivider: { background: '#999', width: '75%' },
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
	},

	/**
	 * OTHER ELEMENTS STYLINGS
	 */
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
		color: 'white',
		backgroundColor: 'black',
		borderRadius: '8px'
	},
	videos: {
		width: '100%',
		backgroundColor: 'black',
		borderRadius: '8px'
	},
	instaBox: {
		'& iframe': {
			maxHeight: ({ thumbnailHeight, thumbnailWidth }) =>
				thumbnailHeight > thumbnailWidth ? '459px' : '270px',
			minWidth: 'unset !important'
		}
	},
	questionDraggable: {
		height: '380px',
		borderRadius: '8px',
		marginTop: '16px',
		marginBottom: '16px',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center'
	},
	questionDiv: {
		paddingLeft: '24px',
		paddingRight: '24px',
		textAlign: 'center'
	},
	question: {
		paddingTop: '200px',
		fontStyle: 'normal',
		fontWeight: 800,
		fontSize: '20px',
		lineHeight: '30px',
		color: '#FFFFFF'
	},
	answer: {
		height: '37px',
		fontStyle: 'normal',
		fontWeight: 800,
		fontSize: '12px',
		lineHeight: '30px',
		color: '#FFFFFF',
		borderRadius: '40px',
		padding: '6px 16px 0px 16px',
		backgroundColor: 'rgba(255, 255, 255, 0.25)',
		marginTop: '8px'
	}
}));
