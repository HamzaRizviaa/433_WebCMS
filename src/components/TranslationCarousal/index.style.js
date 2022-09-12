import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
	translationCarousal: {
		display: 'flex',
		marginBottom: '20px',
		'& .MuiChip-root': {
			marginLeft: '4px',
			marginTop: '4px'
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
			color: 'grey'
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
		maxWidth: '300px',
		overflowX: 'hidden',
		overflowY: 'hidden'
	}
}));
