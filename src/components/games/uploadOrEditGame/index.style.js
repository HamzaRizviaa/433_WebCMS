import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	textField: {
		width: '100%'
	},

	textFieldInput: {
		...theme.components.textFieldInput
		// @include textFieldInput,
	},
	textFieldInputStartAdornment: {
		...theme.components.textFieldInputStartAdornment
		// @include textFieldInputStartAdornment;
	},

	titleContainer: {
		'& h6': {
			marginBottom: '0.5rem',
			marginLeft: '1rem'
		}
	},

	postMediaHeader: {
		width: '100%',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	postMediaContainer: {
		marginTop: '2.5rem'
	},
	mediaContainer: {
		marginTop: '2.5rem',
		'& h6': {
			marginBottom: '0.5rem',
			marginLeft: '1rem'
		}
	},

	select: {
		'& .MuiSelect-select': {
			padding: '1rem 0rem 1rem 1rem',
			paddingRight: '32px'
		},
		width: '100%',
		padding: ' 3px 0px',
		color: theme.palette.white,
		border: `1px solid ${theme.palette.grey}`,
		fontSize: ' 1.4rem !important',
		lineHeight: '1.6 !important',
		borderRadius: '5rem !important',
		marginBottom: '1rem !important',
		backgroundColor: `${theme.palette.black} !important`,
		"& div[role='button']": {
			padding: '0.5rem 0rem 0.5rem 2rem'
		},

		'& svg': {
			color: theme.palette.neonYellow,
			right: '1rem',
			top: 0,
			fontSize: '3rem'
		}
	},

	textFieldInput2: {
		color: ` ${theme.palette.white} !important`,
		border: `0.01px solid ${theme.palette.grey}`,
		padding: '1rem 1rem 1rem 1.5rem !important',
		fontSize: '1.4rem !important',
		lineHeight: '1.6 !important',
		borderRadius: '40px',
		marginBottom: '1rem',
		backgroundColor: theme.palette.black,

		'& svg': {
			color: theme.palette.neonYellow,
			right: '5rem !important',
			top: '0 !important',
			fontSize: '3rem !important'
		}
	},

	videoOrientationContainer: {
		marginTop: '2rem',
		width: '100%'
	},
	gameIDwrapper: {
		margin: ' 2% 0% 5% 0%',
		fontFamily: 'Poppins',
		fontSize: '16px',
		fontStyle: 'normal',
		fontWeight: '700',
		lineHeight: '24px'
	},

	buttonDiv: {
		width: '100%',
		marginBottom: '4rem'
	},

	postBtn: {
		width: '100%'
	},

	postBtnEdit: {
		width: '70%',
		display: 'inline-block'
	},

	editBtn: {
		width: '30%',
		display: 'inline-block'
	},

	addQuizBtn: {
		width: '100% ',
		marginTop: '0.5rem'
	},

	addQuizBtnEdit: {
		width: '70%',
		marginTop: '0.5rem',
		display: 'inline-block'
	},

	contentWrapper: {
		minHeight: ' calc(100vh - 107px)',
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	explanationWrapper: {
		display: 'flex',
		justifyContent: 'flex-start',
		margin: ' 5% 0%',
		fontFamily: 'Poppins',
		fontSize: '16px',
		fontStyle: 'normal',
		fontWeight: '700',
		lineHeight: '24px'
	},
	QuizQuestion: {
		marginTop: '24px',
		fontFamily: 'Poppins',
		fontSize: '16px',
		fontStyle: 'normal',
		fontWeight: '700',
		lineHeight: '24px',
		letterSpacing: '0em'
	}
}));