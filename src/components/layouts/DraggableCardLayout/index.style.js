import { makeStyles } from '@material-ui/core';

export const useDraggableCardLayoutStyles = makeStyles((theme) => ({
	accordionRoot: {
		marginTop: 20,

		'& .MuiAccordion-root': {
			backgroundColor: theme.palette.black,
			color: theme.palette.white,
			margin: '20px 0px',
			border: `1px solid ${theme.palette.normalGrey}`,
			borderRadius: '6px !important'
		},
		'& .MuiAccordionSummary-root  .MuiSvgIcon-root': {
			color: theme.palette.white,
			fill: theme.palette.white,
			fontSize: '25px',
			padding: ({ largeIconsAndLabel }) =>
				largeIconsAndLabel ? '3px 0px' : '0px'
		},
		'& .MuiTypography-root': {
			fontFamily: 'Poppins',
			fontWeight: '800',
			fontSize: ({ largeIconsAndLabel }) =>
				largeIconsAndLabel ? '20px' : '18px',
			lineHeight: '30px',
			display: 'flex',
			alignItems: 'center'
		}
	},

	leftDiv: {
		display: 'flex',
		alignItems: 'center'
	},

	accordionSummary: {
		'& > div': {
			display: 'flex',
			justifyContent: 'space-between'
		}
	},

	accordianDetail: {
		width: '100%'
	},

	grabIconDiv: ({ largeIconsAndLabel, disableActions }) => ({
		width: largeIconsAndLabel ? '32px' : '26px',
		height: largeIconsAndLabel ? '32px' : '26px',
		background: ' #404040',
		borderRadius: '40px',
		textAlign: 'center',
		opacity: disableActions ? 0.5 : 1,
		pointerEvents: disableActions ? 'none' : 'auto'
	}),

	grabIcon: ({ largeIconsAndLabel }) => ({
		height: largeIconsAndLabel ? '12px' : '10px',
		width: '16px',
		cursor: 'grab',

		padding: largeIconsAndLabel ? '10px 0px' : '8px 0px',
		'& > path': {
			fill: `${theme.palette.white} !important`
		}
	}),

	heading: {
		marginLeft: '20px !important',
		color: theme.palette.white,
		fontSize: '2rem'
	},

	rightDiv: {
		display: 'flex',
		alignItems: 'center',
		gap: '10px'
	},

	rightIconsWrapper: ({ largeIconsAndLabel }) => ({
		width: largeIconsAndLabel ? '32px' : '27px',
		height: largeIconsAndLabel ? '32px' : '27px',
		background: ' #404040',
		borderRadius: '40px',
		textAlign: 'center',
		cursor: 'pointer'
	}),

	deleteIconWrapper: ({ disableActions }) => ({
		opacity: disableActions ? 0.5 : 1,
		pointerEvents: disableActions ? 'none' : 'auto'
	}),

	deleteIcon: ({ largeIconsAndLabel }) => ({
		padding: largeIconsAndLabel ? '3px 0px' : '2px 0px',
		width: largeIconsAndLabel ? '20px' : '16px',
		'& > path': {
			fill: `${theme.palette.white} !important`
		}
	}),

	horizontalLine: {
		color: theme.palette.normalGrey
	}
}));
