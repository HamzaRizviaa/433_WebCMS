import React from 'react';
import PropTypes from 'prop-types';
import {
	questionQuizGeneratorFormValidationSchema,
	questionsFormInitialValues
} from '../../../data/helpers';
import { Formik, Form } from 'formik';

import QuestionGeneratorInternalForm from './subComponents/QuestionGeneratorInternalForm';

const QuestionsForm = ({ open, handleClose }) => {
	const onSubmitHandler = async () => {};

	return (
		<Formik
			enableReinitialize
			initialValues={questionsFormInitialValues([])}
			validationSchema={questionQuizGeneratorFormValidationSchema}
			onSubmit={onSubmitHandler}
			validateOnMount
		>
			{
				(/*{ setSubmitting, isSubmitting }*/) => (
					<Form>
						<QuestionGeneratorInternalForm
							open={open}
							handleClose={handleClose}
							onSubmitHandler={onSubmitHandler}
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
