import { makeStyles } from '@material-ui/core/styles';

export const useNotificationStyles = makeStyles((theme) => ({
	root: {
		width: '100%'
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1)
	},
	actionsContainer: {
		marginBottom: theme.spacing(2),
		display: 'flex',
		justifyContent: 'flex-end'
	},
	resetContainer: {
		padding: theme.spacing(3)
	},

	stepLabel: {
		cursor: 'pointer'
	}
}));
