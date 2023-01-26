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
		margin: '20px 0 20px 20px',
		'& h3': {
			marginBottom: '16px'
		}
	},
	notifTitleContainer: {
		position: 'relative',
		'& h6': {
			color: '#B3B3B3',
			textAlign: 'center',
			marginTop: '16px'
		},
		'& div': {
			position: 'absolute',
			color: '#000',
			fontSize: 10,
			fontFamily: 'Inter, sans-serif'
		}
	},
	notifTitleAndroid: {
		fontWeight: '700',
		bottom: '72px',
		left: '25px'
	},
	notifTextAndroid: {
		top: '62px',
		left: '25px',
		lineHeight: '12.1px',
		width: '68%'
	},
	notifImgAndroid: {
		bottom: '43px',
		right: '27px',
		'& img': {
			width: '38px'
		}
	},
	notifTitleIphone12: {
		fontWeight: '700',
		bottom: '72px',
		left: '25px'
	},
	notifTextIphone12: {
		top: '66px',
		left: '25px',
		lineHeight: '12.1px',
		width: '68%'
	},
	notifImgIphone12: {
		bottom: '43px',
		right: '27px',
		'& img': {
			width: '38px'
		}
	},
	notifTitleIphone14: {
		fontWeight: '700',
		bottom: '69px',
		left: '27px'
	},
	notifTextIphone14: {
		top: '69px',
		left: '27px',
		lineHeight: '12.1px',
		width: '71%',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden'
	},
	notifImgIphone14: {
		bottom: '50px',
		right: '29px',
		'& img': { width: '28px' }
	}
}));

export const useSchedulingStyles = makeStyles((theme) => ({
	scheduleRootBox: {
		border: `1px solid ${theme.palette.darkGrey}`,
		padding: theme.spacing(2, 2),
		margin: theme.spacing(2, 0),
		borderRadius: '8px'
	},
	scheduleGridMain: {
		display: 'grid',
		gridTemplateColumns: '40% 1fr',
		gap: '20px'
	}
}));
