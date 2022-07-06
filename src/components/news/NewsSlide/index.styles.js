import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	// accordionSummary: {
	// 	display: 'flex !important',
	// 	justifyContent: 'space-between !important'
	// },
	leftDiv: {
		display: 'flex',
		alignItems: 'center'
	},
	grabIconDiv: {
		width: '26px',
		height: '26px',
		background: ' #404040',
		borderRadius: '40px',
		textAlign: 'center'
	},
	grabIcon: {
		height: '10px',
		width: '16px',

		padding: '8px 0px',
		'& > path': {
			fill: `${theme.palette.white} !important`
		}
	},
	heading: {
		marginLeft: '20px !important'
	},
	rightDiv: {
		display: 'flex',
		alignItems: 'center',
		// justifyContent: 'flex-end'
		marginLeft: '40vh'
	},
	deleteIconDiv: {
		width: '27px',
		height: '27px',
		background: ' #404040',
		borderRadius: '40px',
		textAlign: 'center',
		cursor: 'pointer'
	},
	deleteIcon: {
		padding: '2px 0px',
		width: '16px',
		'& > path': {
			fill: `${theme.palette.white} !important`
		}
	},
	horizontalLine: {
		color: theme.palette.grey
	},
	textField: {
		width: '100%'
	},

	textFieldInput: {
		...theme.components.textFieldInput
	},
	socialmediaDrags: {
		marginTop: '20px',
		'& h6': {
			marginBottom: '0.5rem',
			marginLeft: '1rem'
		},
		marginBottom: '2rem'
	}
}));
