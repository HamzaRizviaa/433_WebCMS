import { makeStyles } from '@material-ui/core';

export const useQuestionsStyles = makeStyles(() => ({
	answerFieldWrapper: {
		position: 'relative',
		marginTop: 14
	},

	answerFieldDeleteIcon: {
		position: 'absolute',
		right: 20,
		top: 31,
		cursor: 'pointer'
	},

	addAnswerIcon: {
		marginRight: 10
	}
}));
