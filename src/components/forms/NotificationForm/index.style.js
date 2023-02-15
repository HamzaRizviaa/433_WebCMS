import { makeStyles } from '@material-ui/core/styles';

export const useNotificationStyles = makeStyles((theme) => ({
	root: {
		width: '100%'
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
		left: '25px',
		width: '70%',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden'
	},

	notifTextAndroid: {
		top: '62px',
		left: '25px',
		lineHeight: '12.1px',
		width: '68%',

		overflow: 'hidden',
		textOverflow: 'ellipsis',
		display: '-webkit-box',
		'-webkit-line-clamp': 2,
		'-webkit-box-orient': 'vertical'
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
		left: '25px',
		width: '70%',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden'
	},

	notifTextIphone12: {
		top: '66px',
		left: '25px',
		lineHeight: '12.1px',
		width: '68%',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		display: '-webkit-box',
		'-webkit-line-clamp': 2,
		'-webkit-box-orient': 'vertical'
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
		left: '27px',
		width: '72%',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden'
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

	conversionChevronContainer: {
		display: 'flex',
		'& svg': {
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
		paddingBottom: 2,
		marginBottom: 32
	},

	appIdContainer: {
		display: 'flex'
	},

	selectField: {
		width: '100%'
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
		bottom: -70
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
	},

	scheduleGridMain: {
		display: 'grid',
		gridTemplateColumns: '40% 1fr',
		gap: '20px'
	},

	scheduleFieldsContainer: {
		paddingRight: 20
	},

	dateField: {
		border: `1px solid ${theme.palette.normalGrey}`
	}
}));
