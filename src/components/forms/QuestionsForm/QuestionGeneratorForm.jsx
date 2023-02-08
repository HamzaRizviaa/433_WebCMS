import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import {
	questionDataFormatterForService,
	questionQuizGeneratorFormValidationSchema,
	questionsFormInitialValues
} from '../../../data/helpers';

import QuestionGeneratorInternalForm from './subComponents/QuestionGeneratorInternalForm';
import {
	createOrEditQuestionThunk,
	getQuestions
} from '../../../data/features/questionsLibrary/questionsLibraryActions';

const QuestionsForm = ({ open, handleClose }) => {
	const dispatch = useDispatch();

	const onSubmitHandler = async (values, formikBag) => {
		formikBag.setSubmitting(true);

		try {
			const payload = await questionDataFormatterForService(
				values,
				'draft',
				[],
				true
			);

			const modifiedPayload = {
				apiVersion: 3,
				...payload
			};

			const { type } = await dispatch(
				createOrEditQuestionThunk(modifiedPayload)
			);

			if (type === 'questionLibrary/createOrEditQuestionThunk/fulfilled') {
				handleClose();
				// reset form
				formikBag.setFieldValue('questions', []);

				dispatch(getQuestions());
			}
		} catch (e) {
			console.error(e);
		} finally {
			formikBag.setSubmitting(false);
		}
	};

	return (
		<Formik
			enableReinitialize
			initialValues={questionsFormInitialValues([], true)}
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
