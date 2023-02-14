import { makeStyles } from '@material-ui/core';

export const useQuestionsStyles = makeStyles((theme) => ({
	answerFieldWrapper: {
		position: 'relative',
		marginTop: 14
	},

	answerFieldDeleteIcon: {
		position: 'absolute',
		right: 20,
		top: 31,
		cursor: 'pointer',
		pointerEvents: ({ isDisabled }) => (isDisabled ? 'none' : 'auto')
	},

	addAnswerIcon: {
		marginRight: 10
	},

	articlesQuizDetails: {
		backgroundColor: ' #1A1A1A',
		padding: '16px',
		borderRadius: '8px'
	},

	articlesbox: {
		display: 'flex'
	},

	articlesImagebox: {
		width: '50px',
		height: '50px',
		borderRadius: '8px'
	},

	articlesTextbox: {
		marginLeft: '16px',
		paddingTop: '7px'
	},

	articleText: {
		fontWeight: 700,
		fontSize: '10px',
		color: ' #FFFF00'
	},

	articleTitle: {
		fontWeight: 700,
		fontSize: '14px',
		lineHeight: '24px',
		color: ' #FFFFFF'
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

	skeletonWrapper: {
		backgroundColor: theme.palette.normalGrey,
		borderRadius: 5
	},

	modalContent: {
		backgroundColor: theme.palette.black90,
		borderRadius: 8,
		margin: [[20, 0]],
		padding: 16
	},

	lastGridItem: {
		borderLeft: `1px solid ${theme.palette.darkGrey}`,
		paddingLeft: '20px',
		overflowY: 'auto',
		height: 'calc(100vh - 150px)',
		msOverflowStyle: 'none' /* Internet Explorer 10+ */,
		scrollbarWidth: 'none' /* Firefox */,

		'&::-webkit-scrollbar': {
			width: '0em' /* Safari and Chrome */
		}

		// '&:hover': {
		// 	'&::-webkit-scrollbar': {
		// 		width: '0.2em' /* Safari and Chrome */
		// 	}
		// }
	},

	quizTitle: {
		fontWeight: '800',
		fontSize: '20px'
	},

	emptyQuizInfoPage: {
		height: '555px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},

	emptyQuizInfoText: {
		fontWeight: '400',
		fontSize: '14px',
		lineHeight: '24px',
		textAlign: 'center'
	},
	// Generate Auto Question Stylings
	filterContainer: {
		padding: '30px',
		paddingLeft: '0px'
	},
	filterField: {
		margin: '5px 0px'
	},
	labelsContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		margin: '0 1rem'
	},

	inputLabel: {
		position: 'relative',
		display: 'inline-block',
		fontSize: '1.4rem',
		fontWeight: 'bold',
		marginBottom: '0.5rem',
		color: (props) => (props.isError ? theme.palette.red : theme.palette.white),

		'&::before': {
			content: '"*"',
			position: 'absolute',
			right: -9,
			top: -2,
			fontSize: '1.5rem',
			fontWeight: 'bold',
			color: theme.palette.red,
			display: (props) => (props.isRequired ? 'inline-block' : 'none')
		}
	},
	radioContainer: {
		margin: '0 1rem',
		display: 'flex',
		justifyContent: 'space-between',
		width: '70%',
		padding: '1.2rem 0'
	},

	quizQuestionsDraftButtonWrapper: {
		marginTop: '20px'
	}
}));
