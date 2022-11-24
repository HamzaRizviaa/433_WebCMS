/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Formik, Form } from 'formik';

import { useCommonParams } from '../../../hooks';
import {
	selectSpecificQuestion,
	selectSummaryFeatureFlag
} from '../../../data/selectors';
import {
	questionDataFormatterForForm,
	questionDataFormatterForService,
	questionsFormInitialValues,
	// questionsFormValidationSchema,
	getQuestionsValidationSchema
} from '../../../data/helpers';
import {
	createOrEditQuestionThunk,
	deleteQuestionThunk,
	stopQuestionThunk,
	getQuestions
} from '../../../data/features/questionsLibrary/questionsLibraryActions';

import QuestionsFormDrawer from './subComponents/QuestionsFormDrawer';
import DeleteModal from '../../DeleteModal';
import StopModal from '../../StopModal';

const QuestionsForm = ({
	open,
	handleClose,
	isEdit,
	status, // draft or publish
	questionType,
	location
}) => {
	const summaryComponentOnQuestions = useSelector(selectSummaryFeatureFlag);
	const isSummaryEnabled = summaryComponentOnQuestions?._value === 'true';
	const navigate = useNavigate();
	const { queryParams, isSearchParamsEmpty } = useCommonParams();
	const dispatch = useDispatch();
	const specificQuestion = useSelector(selectSpecificQuestion);

	// States
	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	const [openStopModal, setOpenStopModal] = useState(false);

	// Refs
	const dialogWrapper = useRef(null);

	const initialValues = useMemo(() => {
		return isEdit && !isEmpty(specificQuestion)
			? questionDataFormatterForForm(specificQuestion)
			: questionsFormInitialValues;
	}, [isEdit, specificQuestion]);

	const closeDeleteModal = () => setOpenDeleteModal(false);
	const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
	const toggleStopModal = () => setOpenStopModal(!openStopModal);
	const closeStopModal = () => setOpenStopModal(false);

	const onSubmitHandler = async (values, formikBag, isDraft = false) => {
		formikBag.setSubmitting(true);

		try {
			const payload = await questionDataFormatterForService(values, isDraft);

			const modifiedPayload = {
				apiVersion: isSummaryEnabled ? 1 : 2,
				...payload
			};

			if (status === 'CLOSED') delete modifiedPayload.general_info.end_date;

			const { type } = await dispatch(
				createOrEditQuestionThunk(modifiedPayload)
			);

			if (type === 'questionLibrary/createOrEditQuestionThunk/fulfilled') {
				handleClose();

				if (isEdit && !(status === 'draft' && isDraft === false)) {
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

	const onStopHandler = async (id, setSubmitting) => {
		setSubmitting(true);
		setOpenStopModal(false);

		try {
			await dispatch(
				stopQuestionThunk({
					question_meta_id: id
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

	return (
		<Formik
			enableReinitialize
			initialValues={initialValues}
			validationSchema={getQuestionsValidationSchema(isSummaryEnabled)}
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
						wrapperRef={dialogWrapper}
						isSubmitting={isSubmitting}
					/>
					<StopModal
						open={openStopModal}
						toggle={closeStopModal}
						stopBtn={() => {
							onStopHandler(specificQuestion?.id, setSubmitting);
						}}
						text={questionType}
						wrapperRef={dialogWrapper}
						stop={true}
						isSubmitting={isSubmitting}
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
