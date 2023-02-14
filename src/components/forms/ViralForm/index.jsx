import React, { useState, useRef, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Formik, Form } from 'formik';
import { useCommonParams } from '../../../hooks';
import { getRules, selectSpecificViral } from '../../../data/selectors';
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
import DeleteModal from '../../ui/modals/DeleteModal';

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
	const { rules } = useSelector(getRules);

	const {
		features: { hlsVideoFormatOnVirals }
	} = useSelector((state) => state.rootReducer.remoteConfig);

	const isHlsFormatEnabled = hlsVideoFormatOnVirals?._value === 'true';

	// States
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	// Refs
	const dialogWrapper = useRef(null);

	const initialValues = useMemo(
		() =>
			isEdit && !isEmpty(specificViral)
				? viralDataFormatterForForm(specificViral, rules)
				: viralFormInitialValues(rules),
		[isEdit, specificViral, rules]
	);

	const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
	const closeDeleteModal = () => setOpenDeleteModal(false);

	/**
	 * onSubmitHandler is fired whenever a user is saving a Viral as draft, published or saving changes.
	 * It's responsible for submitting that data to the backend and updating the UI accordingly.
	 * @param {Object} values - Formik form values.
	 * @param {Object} formikBag - Formik bag object which has all the utilities provided by formik.
	 */
	const onSubmitHandler = useCallback(
		async (values, formikBag) => {
			formikBag.setSubmitting(true);

			try {
				let uploadFileRes;

				if (values.uploadedFiles[0]?.file) {
					uploadFileRes = await uploadFileToServer(
						values.uploadedFiles[0],
						'virallibrary',
						isHlsFormatEnabled
					);
				}

				const viralData = viralDataFormatterForService(
					values,
					uploadFileRes,
					rules
				);

				const { type } = await dispatch(createOrEditViralThunk(viralData));

				if (type === 'viralLibary/createOrEditViralThunk/fulfilled') {
					handleClose();

					if (isEdit && !(status === 'draft' && values.save_draft === false)) {
						dispatch(getAllViralsApi(queryParams));
					} else if (isSearchParamsEmpty) {
						dispatch(getAllViralsApi());
					} else {
						navigate('/viral-library');
					}
				}
			} catch (e) {
				console.error(e);
			} finally {
				formikBag.setSubmitting(false);
			}
		},
		[queryParams, isSearchParamsEmpty, isHlsFormatEnabled]
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
			setSubmitting(true);
			setOpenDeleteModal(false);
			try {
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
			{({ setSubmitting, isSubmitting }) => (
				<Form>
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
						toggle={closeDeleteModal}
						deleteBtn={() => {
							onDeleteHandler(specificViral?.id, status, setSubmitting);
						}}
						text={'Viral'}
						wrapperRef={dialogWrapper}
						isSubmitting={isSubmitting}
					/>
				</Form>
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
