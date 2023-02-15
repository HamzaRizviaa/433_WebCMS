import { makeStyles } from '@material-ui/core';
// import theme from '../assets/theme';
export const useStyles = makeStyles((theme) => ({
	/**
	 * MATCH ELEMENT STYLINGS
	 */
	MatchContainer: {
		// background: ({ team1Color, team2Color }) =>
		// 	`linear-gradient(to right, ${team1Color} 0%, #000 50%, ${team2Color} 100%)`,
		padding: 0,
		borderRadius: 16
	},
	matchBox: {
		display: 'flex',
		flexDirection: 'row',
		fontSize: '10px',
		color: '#FFFFFF',
		textTransform: 'capitalize',
		fontWeight: 700,
		justifyContent: 'space-evenly',
		borderRadius: '16px'
	},
	teamLogo: {
		width: '48px',
		marginBottom: '10px'
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
		padding: '22px',
		gap: '4px',
		fontSize: '14px',
		color: '#FFFFFF',
		textTransform: 'uppercase',
		fontWeight: 800
	},
	time: {
		fontSize: '10px',
		color: theme.palette.neonYellow,
		fontWeight: 700
	},
	matchDiv: {
		border: '1px solid #333333',
		//position: 'relative',
		background: '#191919',
		boxShadow: '0px 1px 1px rgba(255, 255, 255, 0.3)',
		borderRadius: '12px',
		//backgroundClip: 'padding-box',
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
	matchButton: {
		boxShadow:
			'0px 2px 10px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px -1px 1px rgba(0, 0, 0, 0.2)',
		borderRadius: '8px',
		fontSize: '14px'
	},

	followMatchBtnWrapper: {
		display: 'flex',
		justifyContent: 'center'
	},

	/**
	 * OTHER ELEMENTS STYLINGS
	 */
	textDraggableData: {
		fontWeight: 400,
		fontSize: '14px',
		lineHeight: '1.2 !important',
		overflowWrap: 'anywhere',
		// color: 'white'
		fontFamily: 'Inter, sans-serif',
		color: '#CCCCCC',

		'& .previewerHeadings': {
			color: 'white !important',
			fontFamily: 'Poppins !important'
		},

		'& .previewBodyTexts': {
			fontFamily: 'Inter, sans-serif !important',
			color: '#CCCCCC !important'
		}
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
	videoElement: {
		maxHeight: '640px',
		width: '100%',
		objectFit: 'cover',
		objectPosition: 'center',
		borderRadius: '8px',
		height: ({ height, width }) =>
			height < width + 100 ? '200px' : `${height}px`
	},

	instaBox: {
		'& iframe': {
			maxHeight: ({ thumbnailHeight, thumbnailWidth }) =>
				thumbnailHeight > thumbnailWidth ? '459px' : '270px',
			minWidth: 'unset !important'
		}
	},
	questionDraggable: {
		height: '470px',
		borderRadius: '16px',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundImage: ({ questionImgUrl }) => `url(${questionImgUrl})`,
		border: '1px solid rgba(255, 255, 255, 0.1)',
		boxShadow:
			'0px 1px 0px rgba(255, 255, 255, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.4)'
	},
	questionDiv: {
		paddingLeft: '24px',
		paddingRight: '24px',
		textAlign: 'center'
	},
	question: {
		paddingTop: '250px',
		fontStyle: 'normal',
		fontWeight: 800,
		fontSize: '24px',
		lineHeight: '30px',
		color: '#FFFFFF',
		textShadow: '0px 1px 1px rgba(0, 0, 0, 0.3)',
		marginBottom: '16px'
	},
	answer: {
		height: '35px',
		fontStyle: 'normal',
		fontWeight: 700,
		fontSize: '14px',
		lineHeight: '30px',
		textTransform: 'uppercase',
		color: '#FFFFFF',
		borderRadius: '8px',
		padding: '4px 16px 0px 16px',
		backgroundColor: 'rgba(229, 229, 229, 0.5)',
		marginTop: '8px',
		boxShadow:
			'inset 0px 2px 3px rgba(229, 229, 229, 0.3), inset 0px -1px 0px rgba(0, 0, 0, 0.13)',
		textAlign: 'center'
	},

	twitterBox: {
		'& > span > div': {
			margin: '0px !important'
		},
		'& > span > iframe': {
			margin: '0px !important'
		}
	},
	//ad dessign
	adText: {
		fontFamily: 'Poppins',
		fontStyle: 'normal',
		fontWeight: 400,
		fontSize: '12px',
		lineHeight: '16px',
		color: '#4D4D4D',
		textAlign: 'center',
		marginTop: '4px'
	},
	adDraggableData: {
		textAlign: 'center',
		borderRadius: '0px',
		marginTop: 20,

		maxWidth: '100%',
		'& >img': {
			// maxWidth: '100%'
			borderRadius: '0px',
			height: '250px',
			width: '300px'
		}
	}
}));
