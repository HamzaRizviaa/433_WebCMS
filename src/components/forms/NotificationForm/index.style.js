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

	targetWrapper: {
		position: 'relative',
		paddingTop: 10
	},

	targetContainer: {
		position: 'relative',
		border: `1px solid ${theme.palette.darkGrey}`,
		borderRadius: 8,
		padding: 16,
		marginBottom: 32
	},

	appIdContainer: {
		display: 'flex'
	},

	fieldsRowContainer: {
		border: `1px solid ${theme.palette.darkGrey}`,
		borderRadius: 40,
		height: 44,
		width: '100%',

		'& .MuiGrid-item': {
			height: 'inherit'
		}
	},

	gridItem: {
		borderRight: `1px solid ${theme.palette.darkGrey}`,
		borderTop: '10px solid transparent',
		borderBottom: '10px solid transparent',
		borderRadius: 10,
		paddingLeft: 15
	},

	noBorderAndShadow: {
		'& .MuiInput-root': {
			border: 'none'
		},

		'& .MuiInput-input:hover': {
			boxShadow: 'none'
		}
	},

	targetAnotherAppBtn: {
		position: 'absolute',
		bottom: -75
	},

	iconBtn: {
		paddingRight: 0
	},

	targetItemSeparator: {
		position: 'absolute',
		bottom: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		color: theme.palette.black60
	},

	separatorText: {
		fontSize: 12,
		fontWeight: 700
	},

	separatorLine: {
		height: 8,
		width: 1,
		backgroundColor: theme.palette.darkGrey
	}
}));
