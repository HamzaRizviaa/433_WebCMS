import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import FormikField from '../../../../ui/inputs/formik/FormikField';
import { useFormStyles } from '../../../forms.style';
import AccordianLayout from '../../../../layouts/AccordianLayout';
import {
	Unlocked,
	Locked,
	Checkmark,
	Negative
} from '../../../../../assets/svg-icons';

const QuizQuestionsForm = ({ index }) => {
	const classes = useFormStyles();
	const { values, setFieldValue } = useFormikContext();

	const handleLockQuestion = (e) => {
		e.preventDefault();
		e.stopPropagation();

		setFieldValue(
			`questions[${index}].isLocked`,
			!values?.questions[index]?.isLocked
		);
	};

	return (
		<div>
			<AccordianLayout
				title={`Question ${index + 1}`}
				SecondIcon={values?.questions[index]?.isLocked ? Locked : Unlocked}
				onSecondIconClick={handleLockQuestion}
				defaultExpanded={!values?.questions[index]?.isLocked}
			>
				<div className={classes.fieldContainer}>
					<FormikField
						name={`questions.${index}.question`}
						label='QUESTION'
						placeholder='Please add the question here'
						multiline
						maxRows={2}
						removeMaxLengthLabel
						maxLength={55}
					/>
				</div>
				{values?.questions[index]?.answers.map((_, idx) => (
					<div className={classes.fieldContainer} key={idx}>
						<FormikField
							name={`questions.${index}.answers.${idx}.answer`}
							label={idx === 0 ? 'RIGHT ANSWER' : 'WRONG ANSWER'}
							placeholder='Please write your answer'
							multiline
							maxRows={2}
							rightLabel={idx === 0 ? <Checkmark /> : <Negative />}
							removeMaxLengthLabel
							maxLength={29}
						/>
					</div>
				))}
			</AccordianLayout>
		</div>
	);
};

QuizQuestionsForm.propTypes = {
	index: PropTypes.number.isRequired
};

export default QuizQuestionsForm;
