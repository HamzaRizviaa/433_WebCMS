import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	root: {
		'& .MuiAccordion-root': {
			backgroundColor: `${theme.palette.black} `,
			color: theme.palette.white,
			margin: '20px 0px',
			border: `1px solid ${theme.palette.grey}`,
			borderRadius: '6px !important'
		},
		'& .MuiSvgIcon-root': {
			color: theme.palette.white,
			fontSize: '25px',
			backgroundColor: theme.palette.grey,
			borderRadius: '40px'
		},
		'& .MuiTypography-root': {
			fontFamily: 'Poppins',
			fontWeight: '800',
			fontSize: '18px',
			lineHeight: '30px',
			display: 'flex',
			alignItems: 'center'
		}
	},
	buttonDiv: {
		width: '100%',
		marginBottom: '4rem',
		display: 'flex',
		justifyContent: 'flex-end'
	}
}));
