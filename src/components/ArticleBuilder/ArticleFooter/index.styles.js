import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	footer: {
		marginTop: '20px',
		padding: '10px 5px',
		borderTop: `1px solid ${theme.palette.normalGrey}`,
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between'
	}
}));
