import { makeStyles } from '@material-ui/core';

export const useTopbarStyles = makeStyles(() => ({
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

	buttonsSection: {
		display: 'flex',
		gap: 5
	},

	templateButton: {
		width: '120px'
	}
}));
