import React from 'react';
import PropTypes from 'prop-types';

import { Formik, Form } from 'formik';

import QuestionGeneratorInternalForm from './subComponents/QuestionGeneratorInternalForm';

const QuestionsForm = ({ open, handleClose }) => {
	return (
		<Formik
			enableReinitialize
			// initialValues={initialValues}
			// validationSchema={getQuestionsValidationSchema(
			// 	isSummaryEnabled,
			// 	isTriviaEnabled
			// )}
			// onSubmit={onSubmitHandler}
			validateOnMount
		>
			{
				(/*{ setSubmitting, isSubmitting }*/) => (
					<Form>
						<QuestionGeneratorInternalForm
							open={open}
							handleClose={handleClose}
						/>
					</Form>
				)
			}
		</Formik>
	);
};

QuestionsForm.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	questionType: PropTypes.string.isRequired,
	location: PropTypes.string.isRequired
};

export default QuestionsForm;
