import React from 'react';
import PropTypes from 'prop-types';
import FormikField from '../../../../ui/inputs/formik/FormikField';
import Button from '../../../../ui/Button';
import { DeleteIcon, AddIcon } from '../../../../../assets/svg-icons';
import { useQuestionsStyles } from '../../index.style';

const Answers = ({ form, remove, push, questionIndex }) => {
	const classes = useQuestionsStyles();

	const { answers } = form.values.questions[questionIndex];

	const handleAdd = () => {
		push({
			answer: ''
		});
	};

	const questionType = form.values.general_info.question_type;

	return (
		<div>
			{answers.map((_, index) => (
				<div className={classes.answerFieldWrapper} key={index}>
					<FormikField
						label={
							questionType === 'poll'
								? `Answer ${index + 1}`
								: index === 0
								? 'Right Answer'
								: `Wrong Answer ${index}`
						}
						name={`questions.${questionIndex}.answers.${index}.answer`}
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
			{answers.length < 4 && (
				<Button variant='text' onClick={handleAdd}>
					<AddIcon className={classes.addAnswerIcon} /> ADD ANSWER
				</Button>
			)}
		</div>
	);
};

Answers.propTypes = {
	form: PropTypes.object.isRequired,
	remove: PropTypes.func.isRequired,
	push: PropTypes.func.isRequired,
	questionIndex: PropTypes.number.isRequired
};

export default Answers;
