import { makeStyles } from '@material-ui/core';
import theme from '../../../assets/theme';

export const useQuestionsStyles = makeStyles(() => ({
	answerFieldWrapper: {
		position: 'relative',
		marginTop: 14
	},

	answerFieldDeleteIcon: {
		position: 'absolute',
		right: 20,
		top: 31,
		cursor: 'pointer',
		pointerEvents: ({ isDisabled }) => (isDisabled ? 'none' : 'auto'),

		'& path': {
			fill: ({ isDisabled }) =>
				isDisabled ? theme.palette.red : theme.palette.neonYellow
		}
	},

	addAnswerIcon: {
		marginRight: 10
	}
}));
