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
	},

	stepContainer: {
		border: `1px solid ${theme.palette.darkGrey}`,
		borderRadius: 8,
		padding: 24,
		paddingBottom: 10,
		margin: [[20, 0]]
	},

	expireField: {
		paddingRight: 5
	},

	expirationUnitField: {
		paddingLeft: 5
	}
}));
