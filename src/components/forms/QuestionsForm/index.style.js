import { makeStyles } from '@material-ui/core';

export const useQuestionsStyles = makeStyles(() => ({
	answerFieldWrapper: {
		position: 'relative'
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
