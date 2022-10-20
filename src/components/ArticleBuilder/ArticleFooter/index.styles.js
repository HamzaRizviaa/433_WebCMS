import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	footer: {
		marginTop: '20px',
		padding: '10px 5px',
		borderTop: `1px solid ${theme.palette.normalGrey}`,
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		borderBottom: '1px solid #000',
		position: 'sticky',
		bottom: 0,
		background: '#000',
		zIndex: '99999'
	}
}));
