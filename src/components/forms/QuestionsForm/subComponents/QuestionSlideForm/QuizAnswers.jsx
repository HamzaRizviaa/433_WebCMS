import React from 'react';
import PropTypes from 'prop-types';
import FormikField from '../../../../ui/inputs/formik/FormikField';
import Button from '../../../../ui/Button';
import { DeleteIcon, AddIcon } from '../../../../../assets/svg-icons';
import { useQuestionsStyles } from '../../index.style';

const QuizAnswers = ({ form, remove, push, questionIndex }) => {
	const classes = useQuestionsStyles();

	const { quizAnswers } = form.values.questions[questionIndex];

	const handleAdd = () => {
		push({
			answer: ''
		});
	};

	return (
		<div>
			{quizAnswers.map((_, index) => (
				<div className={classes.answerFieldWrapper} key={index}>
					<FormikField
						label={`Answer ${index + 1}`}
						name={`questions.${questionIndex}.quizAnswers.${index}.answer`}
						placeholder='Please write your answer'
						maxLength={29}
						maxRows={2}
						multiline
						required
					/>
					{index > 1 && (
						<DeleteIcon
							className={classes.answerFieldDeleteIcon}
							onClick={() => remove(index)}
						/>
					)}
				</div>
			))}
			{quizAnswers.length < 4 && (
				<Button variant='text' onClick={handleAdd}>
					<AddIcon className={classes.addAnswerIcon} /> ADD ANSWER
				</Button>
			)}
		</div>
	);
};

QuizAnswers.propTypes = {
	form: PropTypes.object.isRequired,
	remove: PropTypes.func.isRequired,
	push: PropTypes.func.isRequired,
	questionIndex: PropTypes.number.isRequired
};

export default QuizAnswers;
