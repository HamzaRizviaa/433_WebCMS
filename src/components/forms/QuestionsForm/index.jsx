import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Formik, Form } from 'formik';

import { useCommonParams } from '../../../hooks';
import {
	getRules,
	selectSpecificQuestion,
	selectSummaryFeatureFlag,
	selectTriviaFeatureFlag
} from '../../../data/selectors';
import {
	questionDataFormatterForForm,
	questionDataFormatterForService,
	questionsFormInitialValues,
	getQuestionsValidationSchema
} from '../../../data/helpers';
import {
	createOrEditQuestionThunk,
	deleteQuestionThunk,
	stopQuestionThunk,
	getQuestions
} from '../../../data/features/questionsLibrary/questionsLibraryActions';

import DeleteModal from '../../ui/modals/DeleteModal';
import QuestionsFormDrawer from './subComponents/QuestionsFormDrawer';
import PublishAndStopModal from './subComponents/PublishAndStopModal';

const QuestionsForm = ({
	open,
	handleClose,
	isEdit,
	status,
	questionType,
	location
}) => {
	const summaryComponentOnQuestions = useSelector(selectSummaryFeatureFlag);
	const isSummaryEnabled = summaryComponentOnQuestions?._value === 'true';
	const triviaOnQuestions = useSelector(selectTriviaFeatureFlag);
	const isTriviaEnabled = triviaOnQuestions?._value === 'true';
	const navigate = useNavigate();
	const { queryParams, isSearchParamsEmpty } = useCommonParams();
	const dispatch = useDispatch();
	const specificQuestion = useSelector(selectSpecificQuestion);
	const { rules } = useSelector(getRules);
	// States
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [openStopModal, setOpenStopModal] = useState(false);

	const initialValues = useMemo(() => {
		return isEdit && !isEmpty(specificQuestion)
			? questionDataFormatterForForm(specificQuestion, rules)
			: questionsFormInitialValues(rules);
	}, [isEdit, specificQuestion, rules]);

	const closeDeleteModal = () => setOpenDeleteModal(false);
	const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
	const toggleStopModal = () => setOpenStopModal(!openStopModal);
	const closeStopModal = () => setOpenStopModal(false);

	const onSubmitHandler = async (values, formikBag) => {
		formikBag.setSubmitting(true);

		try {
			const payload = await questionDataFormatterForService(
				values,

				status,
				rules
			);

			const getApiVersion = (isSummaryEnabled, isTriviaEnabled) => {
				if (isSummaryEnabled && isTriviaEnabled) return 5;
				if (isSummaryEnabled && !isTriviaEnabled) return 1;
				if (!isSummaryEnabled && !isTriviaEnabled) return 2;
			};

			const modifiedPayload = {
				apiVersion: getApiVersion(isSummaryEnabled, isTriviaEnabled),
				...payload
			};

			if (values.active_question_id) modifiedPayload.shouldTransition = true;
			// if (status === 'CLOSED') delete modifiedPayload.general_info.end_date;

			const { type } = await dispatch(
				createOrEditQuestionThunk(modifiedPayload)
			);

			if (type === 'questionLibrary/createOrEditQuestionThunk/fulfilled') {
				handleClose();

				if (
					isEdit &&
					!(status === 'draft' && values?.general_info?.save_draft === false)
				) {
					dispatch(getQuestions(queryParams));
				} else if (isSearchParamsEmpty) {
					dispatch(getQuestions());
				} else {
					navigate('/question-library');
				}
			}
		} catch (e) {
			console.error(e);
		} finally {
			formikBag.setSubmitting(false);
		}
	};

	const onDeleteHandler = async (id, isDraft, setSubmitting) => {
		setSubmitting(true);
		setOpenDeleteModal(false);
		try {
			await dispatch(
				deleteQuestionThunk({
					question_meta_id: id,
					is_draft: isDraft?.toLowerCase()
				})
			);

			handleClose();
			dispatch(getQuestions(queryParams));
		} catch (e) {
			console.error(e);
		} finally {
			setSubmitting(false);
		}
	};

	const onStopHandler = async (id, setSubmitting, transitionTo) => {
		setSubmitting(true);
		setOpenStopModal(false);

		try {
			await dispatch(
				stopQuestionThunk({
					question_meta_id: id,
					transition_to: transitionTo,
					end_date: new Date().toISOString()
				})
			);

			handleClose();
			dispatch(getQuestions(queryParams));
		} catch (e) {
			console.error(e);
		} finally {
			setSubmitting(false);
		}
	};

	const stopModalActionInfo = (
		<p>
			You are about to stop this {questionType}. You won’t be able to restart
			the {questionType} again.
		</p>
	);

	return (
		<Formik
			enableReinitialize
			initialValues={initialValues}
			validationSchema={getQuestionsValidationSchema(
				isSummaryEnabled,
				isTriviaEnabled
			)}
			onSubmit={onSubmitHandler}
			validateOnMount
		>
			{({ setSubmitting, isSubmitting }) => (
				<Form>
					<QuestionsFormDrawer
						open={open}
						handleClose={handleClose}
						isEdit={isEdit}
						status={status}
						onSubmitHandler={onSubmitHandler}
						toggleDeleteModal={toggleDeleteModal}
						toggleStopModal={toggleStopModal}
						questionType={questionType}
						location={location}
					/>
					<DeleteModal
						open={openDeleteModal}
						toggle={closeDeleteModal}
						deleteBtn={() => {
							onDeleteHandler(specificQuestion?.id, status, setSubmitting);
						}}
						text={questionType}
						isSubmitting={isSubmitting}
					/>
					<PublishAndStopModal
						open={openStopModal}
						isSubmitting={isSubmitting}
						onClose={closeStopModal}
						questionType={questionType}
						actionInfo={stopModalActionInfo}
						onConfirm={(val) => {
							onStopHandler(specificQuestion?.id, setSubmitting, val);
						}}
						isStatusTrivia={status === 'TRIVIA'}
						isTriviaEnabled={isTriviaEnabled}
						isStopModal
					/>
				</Form>
			)}
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
