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
	notifDisplay: {
		display: 'flex',
		flexDirection: 'row'
	},
	notifiContainer: {
		flexBasis: '60%'
	},
	accordionRoot: {
		backgroundColor: theme.palette.black,
		color: theme.palette.white,
		border: `1px solid ${theme.palette.normalGrey}`,
		borderRadius: '6px !important',
		flexBasis: '40%',
		padding: 20,
		margin: '20px 0 20px 20px'
	}
}));
