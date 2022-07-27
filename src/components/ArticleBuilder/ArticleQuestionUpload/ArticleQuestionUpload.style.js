import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	contentWrapper: {
		minHeight: 'calc(100vh - 107px)',
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	QuizQuestion: {
		marginTop: '24px',
		fontFamily: 'Poppins',
		fontSize: '16px',
		fontStyle: 'normal',
		fontWeight: '700',
		lineHeight: '24px',
		letterSpacing: '0em'
	},
	QuizDetailsProgressBars: {
		marginTop: '24px'
	},
	QuizDetailstextUsers: {
		marginTop: '24px',
		display: 'flex',
		justifyContent: 'space-between',
		fontFamily: 'Poppins',
		fontSize: '12px',
		fontStyle: 'normal',
		fontWeight: '700',
		lineHeight: '16px',
		letterSpacing: '0.03em'
	},
	QuizDetailsHeading: {
		marginTop: '24px',
		fontFamily: 'Poppins',
		fontSize: '16px',
		fontStyle: 'normal',
		fontWeight: '700',
		lineHeight: '24px',
		letterSpacing: '0em'
	},
	sortIcon: {
		position: 'absolute',
		left: -'4px',
		bottom: -'2px',
		height: '2rem !important',
		width: '2rem !important'
	},

	sortIconSelected: {
		position: 'absolute',
		left: -'4px',
		bottom: -'2px',
		height: '2rem !important',
		width: '2rem !important',
		color: theme.palette.neonYellow
	},
	QuizDetailstableContainer: {
		margin: '1rem 0rem',
		'& > div': {
			'& tbody': {
				minHeight: ' auto !important',
				maxHeight: '100% !important'
			}
		}
	},

	row: {
		marginBottom: '1.5rem',
		display: 'block',
		fontSize: '1.2rem'
	},
	rowData: {
		marginBottom: '1.5rem',
		display: 'block',
		fontSize: '1.2rem'
	},

	progressBars: {
		position: 'relative'
	},

	progressbarTextBox: {
		width: '100%',
		position: 'absolute',
		bottom: '16px'
	},

	leftprogressbarText: {
		fontFamily: 'Poppins',
		fontSize: '16px',
		fontStyle: 'normal',
		fontWeight: '700',
		lineHeight: '24px',
		letterSpacing: '0em',
		textAling: 'left',
		color: theme.palette.white,
		marginLeft: '16px'
	},

	rightProgressText: {
		position: 'absolute',
		right: 0,
		bottom: '4px',
		marginRight: '16px',
		fontFamily: 'Poppins',
		fontSize: '12px',
		fontStyle: 'normal',
		fontWeight: 700,
		lineHeight: '16px',
		letterSpacing: '0.03em',
		textAling: 'right'
	},
	previewContentWrapper: {
		minHeight: 'calc(100vh - 107px)',
		position: 'relative',
		display: 'flex',
		width: '1000px'
	},
	uploadedFilesContainer: {
		marginTop: '1.5rem',
		maxHeight: '220px'
	},

	filePreview: {
		padding: '1.5rem 2rem',
		boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.25)',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		position: 'relative'
	},

	filePreviewLeft: {
		display: 'flex',
		alignItems: 'center',
		gap: '10px',
		width: '100%'
	},

	filePreviewRight: {
		display: 'flex',
		alignItems: 'center'
	},

	fileThumbnail: {
		height: '8rem',
		maxWidth: '50%',
		borderRadius: '4px',
		backgroundColor: '#404040'
	},

	fileName: {
		fontSize: '1rem',
		maxWidth: '150px',
		textOverflow: 'ellipsis',
		overflow: 'hidden'
	},

	filePreviewIcons: {
		color: theme.palette.neonYellow,
		fontSize: '2.5rem !important',
		marginLeft: '2rem',
		cursor: 'pointer'
	},
	titleContainer: {
		'& h6': {
			marginBottom: '0.5rem',
			marginLeft: '1rem'
		}
	},
	textField: {
		width: '100%'
	},
	textFieldInput: {
		...theme.components.textFieldInput
	},

	disableTextField: {
		backgroundColor: '#404040 !important',
		color: '#C4C4C4 !important'
	},

	buttonDiv: {
		width: '100%',
		marginBottom: '4rem',
		display: 'flex',
		justifyContent: 'space-between'
	},
	publishDraftDiv: {
		display: 'flex'
	},

	addQuizBtn: {
		width: '100%',
		marginTop: '0.5rem'
	},

	addQuizBtnEdit: {
		width: '40%',
		marginTop: '0.5rem',
		display: 'inline-block',
		'& span': {
			padding: '1rem 3rem'
		}
	},
	leftButtonDiv: {
		width: '100%',
		display: 'flex'
	},

	editBtn: {
		width: '45%',
		display: 'inline-block',
		marginTop: '0.5rem'
	},

	editDeleteBtn: {
		display: 'inline-block'
	},

	stopBtn: {
		// width: '35%',
		display: 'inline-block'
	},
	saveChangesbtn: { '& span': { padding: '1rem 2rem !important' } },

	noResultError: {
		color: theme.palette.red,
		fontWeight: 'bold',
		marginTop: '0.2rem',
		marginLeft: '0.5rem',
		height: '1rem'
	},

	datePickerContainer: {
		marginBottom: '1rem !important',
		'& h6': {
			marginBottom: '0.5rem',
			marginLeft: '1rem'
		}
	},

	datePicker: {
		button: {
			backgroundColor: 'transparent !important',
			top: '0.5px !important',
			right: '30px !important'
		}
	},

	customDateInput: {
		// border: 0,
		margin: 0,
		display: ' inline-flex',
		// padding: 0,
		position: 'relative',
		minWidth: 0,
		// flexDirection: 'column',
		verticalAlign: 'top',
		width: '96%',
		color: theme.palette.white,
		border: '1px solid #404040',
		padding: '1.2rem 1rem 1.2rem 1.5rem !important',
		fontSize: '1.4rem !important',
		lineHeight: '1.6 !important',
		borderRadius: '40px',
		backgroundColor: '#000000',
		borderColor: 'rgb(64, 64, 64)',
		height: '17.5px',
		boxSizing: 'content-box',
		// padding: '6px 0 7px',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
}));
