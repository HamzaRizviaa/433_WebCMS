import { makeStyles } from '@material-ui/core';

export const useFormStyles = makeStyles((theme) => ({
	buttonDiv: {
		width: '100%',
		marginTop: '3rem',
		marginBottom: '1rem',
		display: 'flex',
		justifyContent: 'space-between',

		'& button': {
			textTransform: 'uppercase'
		},

		'& button + button': {
			marginLeft: 10
		}
	},

	publishDraftDiv: {
		display: 'flex'
	},

	fieldWrapper: {
		marginBottom: '1.5rem'
	},

	fieldContainer: {
		marginTop: 14
	},

	switchContainer: {
		marginTop: 10
	},

	addNewsBtnWrapper: {
		marginTop: 40
	},
	leftButtonSection: {
		display: 'flex',
		gap: '1rem'
	},
	explanationWrapper: {
		display: 'flex',
		justifyContent: 'flex-start',
		margin: '5% 0%',
		fontFamily: 'Poppins',
		fontSize: '16px',
		fontStyle: 'normal',
		fontWeight: 700,
		lineHeight: '24px'
	},

	infoIcon: { cursor: 'pointer', marginLeft: '1rem' },

	mainHeading: {
		display: 'flex',
		fontSize: '18px',
		alignItems: 'center',
		fontFamily: 'Poppins',
		fontWeight: '800',
		lineHeight: '30px'
	},

	dropzoneWrapper: {
		marginTop: 15,
		marginBottom: 20
	},

	dropzoneLabel: {
		marginBottom: 15,
		position: 'relative',
		display: 'inline-block',
		fontSize: 16,
		fontWeight: 700,
		lineHeight: '24px',

		'&::before': {
			content: '"*"',
			position: 'absolute',
			right: -9,
			top: -2,
			fontSize: '1.5rem',
			fontWeight: 'bold',
			color: theme.palette.red,
			display: 'inline-block'
		}
	},

	link: {
		color: theme.palette.white,
		textDecoration: 'none',

		'&:hover': {
			color: theme.palette.neonYellow
		}
	},

	scheduledTime: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	scheduleTimeLabel: {
		marginRight: 15
	},

	editScheduleIcon: {
		cursor: 'pointer'
	},

	disabledIcon: {
		color: theme.palette.disabled,
		fill: theme.palette.disabled,

		'& path': {
			fill: theme.palette.disabled
		}
	}
}));
