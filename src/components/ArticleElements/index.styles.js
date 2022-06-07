import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	elementsDiv: {
		position: 'fixed'
		// overflowY: 'hidden',
		// overflowX: 'hidden'
	},
	elementContainter: {
		width: '20.5vw',
		background: `${theme.palette.black}`,
		border: `1px solid ${theme.palette.neonYellow}`,
		borderRadius: '8px',
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		padding: '12px',
		gap: '8px',
		cursor: 'pointer',
		margin: '20px 0px'
	},

	elementText: {
		fontFamily: 'Poppins',
		fontWeight: '400',
		fontSize: '14px',
		lineHeight: '24px',
		display: 'flex',
		alignItems: 'center',
		letterSpacing: '0.02em',
		color: `${theme.palette.white}`
	}
}));
