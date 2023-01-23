import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
	translationCarousal: {
		display: 'flex',
		marginBottom: '20px',
		'& .MuiChip-root': {
			marginLeft: '4px',
			marginTop: '4px',
			marginBottom: '2px'
		},
		'& .MuiChip-label': {
			fontFamily: 'Poppins',
			fontStyle: 'normal',
			fontWeight: 700,
			fontSize: '12px',
			lineHeight: '16px',
			paddingLeft: '16px',
			paddingRight: '15px'
		},
		'& .MuiSvgIcon-root': {
			marginTop: '10px',
			color: 'grey',
			paddingLeft: '5px',
			paddingRight: '5px',
			cursor: 'pointer'
		},
		'& .enableLanguage': {
			border: '1px solid yellow'
		}
	},
	allChips: {
		display: 'flex'
	},
	carousalChips: {
		display: 'flex',
		flexWrap: 'nowrap',
		maxWidth: '370px',
		overflowX: 'hidden',
		overflowY: 'hidden'
	},
	singleChip: {
		transition: 'all .3s ease-in-out',
		transform: ({ slide }) => `translateX(${slide}px)`,
		border: '1px solid grey !important',
		color: 'grey !important',

		'&:hover': {
			color: 'yellow !important',
			boxShadow: '0 1px 10px rgba(216, 204, 127, 1)'
		}
	},
	activeChip: {
		transition: 'all .3s ease-in-out',
		transform: ({ slide }) => `translateX(${slide}px)`,
		border: '1px solid yellow !important',
		color: 'white !important',
		boxShadow: '0 1px 10px rgba(216, 204, 127, 1)'
	},
	langChip: ({ isEnglish }) => ({
		border: isEnglish
			? '1px solid yellow !important'
			: '1px solid grey !important',
		color: isEnglish ? 'white !important' : 'grey !important'
	}),
	divider: { marginLeft: '8px', marginRight: '6px' }
}));
