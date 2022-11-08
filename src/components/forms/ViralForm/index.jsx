import React, { useState, useRef, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Formik } from 'formik';
import { useCommonParams } from '../../../hooks';
import { selectSpecificViral } from '../../../data/selectors';
import {
	viralDataFormatterForForm,
	viralDataFormatterForService,
	viralFormInitialValues,
	viralFormValidationSchema
} from '../../../data/helpers';
import {
	createOrEditViralThunk,
	deleteViralThunk,
	getAllViralsApi
} from '../../../data/features/viralLibrary/viralLibrarySlice';
import { uploadFileToServer } from '../../../data/utils';

import ViralFormDrawer from './subComponents/ViralFormDrawer';
import DeleteModal from '../../DeleteModal';

/**
 * ViralForm Component is used as a child of the ViralLibrary and the link to that is given below.
 * ViralForm serves the purpose of a form wrapper component which is using formik for form handling.
 * @component
 * @see {@link http://127.0.0.1:5500/docs/ViralLibrary.html|ViralLibrary}
 */
const ViralForm = ({
	open,
	handleClose,
	isEdit,
	status // draft or publish
}) => {
	const navigate = useNavigate();
	const { queryParams, isSearchParamsEmpty } = useCommonParams();
	const dispatch = useDispatch();
	const specificViral = useSelector(selectSpecificViral);

	// States
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	// Refs
	const dialogWrapper = useRef(null);

	const initialValues = useMemo(
		() =>
			isEdit && !isEmpty(specificViral)
				? viralDataFormatterForForm(specificViral)
				: viralFormInitialValues,
		[isEdit, specificViral]
	);

	const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

	/**
	 * onSubmitHandler is fired whenever a user is saving a Viral as draft, published or saving changes.
	 * It's responsible for submitting that data to the backend and updating the UI accordingly.
	 * @param {Object} values - Formik form values.
	 * @param {Object} formikBag - Formik bag object which has all the utilities provided by formik.
	 * @param {boolean} isDraft - isDraft param is only being passed when the form is being save in draft mode
	 */
	const onSubmitHandler = useCallback(
		async (values, formikBag, isDraft = false) => {
			formikBag.setSubmitting(true);

			try {
				const uploadFileRes = await uploadFileToServer(
					values.uploadedFiles[0],
					'virallibrary'
				);
				const viralData = viralDataFormatterForService(
					values,
					uploadFileRes,
					isDraft
				);

				await dispatch(createOrEditViralThunk(viralData, formikBag, isDraft));

				handleClose();

				if (isEdit && !(status === 'draft' && isDraft === false)) {
					dispatch(getAllViralsApi(queryParams));
				} else if (isSearchParamsEmpty) {
					dispatch(getAllViralsApi());
				} else {
					navigate('/viral-library');
				}
			} catch (e) {
				console.error(e);
			} finally {
				formikBag.setSubmitting(false);
			}
		},
		[queryParams, isSearchParamsEmpty]
	);

	/**
	 * onDeleteHandler is fired whenever a user wants to delete a viral.
	 * It's responsible for calling the backend for deletion of viral and updating the UI accordingly.
	 * @param {string} id - Id of the viral which is to be deleted
	 * @param {boolean} isDraft - isDraft status of a viral
	 * @param {Function} setSubmitting - Function which receives a boolean value as a param and changes the state of form if it is submitting or not
	 */
	const onDeleteHandler = useCallback(
		async (id, isDraft, setSubmitting) => {
			try {
				setSubmitting(true);

				await dispatch(
					deleteViralThunk({
						viral_id: id,
						is_draft: isDraft
					})
				);

				handleClose();
				dispatch(getAllViralsApi(queryParams));
			} catch (e) {
				console.error(e);
			} finally {
				setSubmitting(false);
				setOpenDeleteModal(false);
			}
		},
		[queryParams]
	);

	return (
		<Formik
			enableReinitialize
			initialValues={initialValues}
			validationSchema={viralFormValidationSchema}
			validateOnMount
			onSubmit={onSubmitHandler}
		>
			{({ setSubmitting }) => (
				<div>
					<ViralFormDrawer
						open={open}
						handleClose={handleClose}
						isEdit={isEdit}
						status={status}
						onSubmitHandler={onSubmitHandler}
						toggleDeleteModal={toggleDeleteModal}
					/>
					<DeleteModal
						open={openDeleteModal}
						toggle={() => toggleDeleteModal()}
						deleteBtn={() => {
							onDeleteHandler(specificViral?.id, status, setSubmitting);
						}}
						text={'Viral'}
						wrapperRef={dialogWrapper}
					/>
				</div>
			)}
		</Formik>
	);
};

ViralForm.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired
};

export default ViralForm;