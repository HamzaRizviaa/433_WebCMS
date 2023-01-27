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
	notificationRoot: {
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
			width: '38px',
			height: '38px'
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
			width: '38px',
			height: '38px'
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
		'& img': { width: '28px', height: '28px' }
	},
	conversionRoot: {
		backgroundColor: theme.palette.black,
		color: theme.palette.white,
		border: `1px solid ${theme.palette.normalGrey}`,
		borderRadius: '6px !important',
		padding: 20,
		margin: '20px 10px'
	},
	conversionChevronContainer: {
		display: 'flex',
		'& img': {
			margin: '0 12px'
		}
	},
	conversionContainer: {
		display: 'flex',
		width: '100%',
		alignItems: 'baseline'
	},
	metricContainer: {
		width: '100%'
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
