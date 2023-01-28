import React from 'react';
import PropTypes from 'prop-types';
import FormikField from '../../../../ui/inputs/formik/FormikField';
import { useFormStyles } from '../../../forms.style';

const QuizQuestionsForm = ({ index }) => {
	const classes = useFormStyles();
	console.log(index);

	return (
		<div>
			<div className={classes.fieldContainer}>
				<FormikField
					name={`question1`}
					label='QUESTION'
					placeholder='Please add the question here'
					multiline
					maxRows={2}
					maxLength={55}
				/>
			</div>
			<div className={classes.fieldContainer}>
				<FormikField
					name={`question1`}
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
		</div>
	);
};

QuizQuestionsForm.propTypes = {
	index: PropTypes.number.isRequired
};

export default QuizQuestionsForm;
