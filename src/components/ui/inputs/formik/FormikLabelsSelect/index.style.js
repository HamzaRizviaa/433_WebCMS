import { makeStyles } from '@material-ui/core';

export const useFormikLabelsSelectStyles = makeStyles((theme) => ({
	createNewLabelWrapper: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: theme.palette.black,
		color: `${theme.palette.white} !important`,
		padding: '5px 0',
		fontSize: '14px',
		'&:hover': {
			color: theme.palette.neonYellow,
			cursor: 'pointer'
		}
	},

	createNewLabelBtn: {
		padding: '3px 12px',
		fontWeight: 700
	}
}));
