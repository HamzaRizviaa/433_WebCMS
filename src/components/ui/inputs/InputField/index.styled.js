import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	inputFieldContainer: {
		marginBottom: '0.5rem',

		'& .MuiFormHelperText-root': {
			color: (props) =>
				props.isError ? theme.palette.red : theme.palette.white,
			fontSize: '1rem',
			fontWeight: 'bold',
			marginLeft: '1rem'
		}
	},

	endIcon: {
		marginRight: 8
	}
}));
