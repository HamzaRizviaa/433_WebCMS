import { makeStyles } from '@material-ui/core';

export const useAccordionLayoutStyles = makeStyles((theme) => ({
	accordionRoot: {
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

	accordianDetail: {
		width: '100%'
	}
}));
