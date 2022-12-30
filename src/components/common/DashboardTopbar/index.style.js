import { makeStyles } from '@material-ui/core';

export const useTopbarStyles = makeStyles((theme) => ({
	header: {
		display: 'flex',
		justifyContent: 'space-between'
	},

	leftSection: {
		display: 'flex',
		justifyContent: ' flex-start'
	},

	rightSection: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center'
	},

	title: {
		marginRight: '2rem',
		textTransform: 'uppercase'
	},

	titleName: {
		'&:hover': {
			color: theme.palette.darkOrange
		}
	}
}));
