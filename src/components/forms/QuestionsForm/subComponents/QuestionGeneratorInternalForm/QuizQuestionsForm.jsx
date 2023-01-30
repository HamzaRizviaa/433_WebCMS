import React from 'react';
import PropTypes from 'prop-types';
import FormikField from '../../../../ui/inputs/formik/FormikField';
import { useFormStyles } from '../../../forms.style';
import AccordianLayout from '../../../../layouts/AccordianLayout';
import { Unlocked } from '../../../../../assets/svg-icons';

const QuizQuestionsForm = ({ index }) => {
	const classes = useFormStyles();

	const handleLockQuestion = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	return (
		<div>
			<AccordianLayout
				title={`Question ${index + 1}`}
				SecondIcon={Unlocked}
				onSecondIconClick={handleLockQuestion}
			>
				<div className={classes.fieldContainer}>
					<FormikField
						name={`questions.${index}.question`}
						label='QUESTION'
						placeholder='Please add the question here'
						multiline
						maxRows={2}
						maxLength={55}
					/>
				</div>
				<div className={classes.fieldContainer}>
					<FormikField
						name={`questions.${index}.answers.right_answer`}
						label='RIGHT ANSWER'
						placeholder='Please write your answer'
						multiline
						maxRows={2}
						maxLength={29}
					/>
				</div>
				<div className={classes.fieldContainer}>
					<FormikField
						name={`question1`}
						label='WRONG ANSWER'
						placeholder='Please write your answer'
						multiline
						maxRows={2}
						maxLength={29}
					/>
				</div>
				<div className={classes.fieldContainer}>
					<FormikField
						name={`question1`}
						label='WRONG ANSWER'
						placeholder='Please write your answer'
						multiline
						maxRows={2}
						maxLength={29}
					/>
				</div>
				<div className={classes.fieldContainer}>
					<FormikField
						name={`question1`}
						label='WRONG ANSWER'
						placeholder='Please write your answer'
						multiline
						maxRows={2}
						maxLength={29}
					/>
				</div>
			</AccordianLayout>
		</div>
	);
};

QuizQuestionsForm.propTypes = {
	index: PropTypes.number.isRequired
};

export default QuizQuestionsForm;
