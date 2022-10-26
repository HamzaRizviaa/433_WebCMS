import React, { useState, useRef } from 'react';
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
	const contentWrapperRef = useRef(null);
	const dialogWrapper = useRef(null);

	const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

	const onSubmitHandler = async (values, formikBag, isDraft = false) => {
		formikBag.setSubmitting(true);
		contentWrapperRef.current.scrollIntoView({ behavior: 'smooth' });

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

			console.log({ uploadFileRes, viralData });

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
	};

	const onDeleteHandler = async (id, isDraft, setSubmitting) => {
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
	};

	return (
		<Formik
			enableReinitialize
			initialValues={
				isEdit && !isEmpty(specificViral)
					? viralDataFormatterForForm(specificViral)
					: viralFormInitialValues
			}
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
						contentWrapperRef={contentWrapperRef}
						onSubmitHandler={onSubmitHandler}
						toggleDeleteModal={toggleDeleteModal}
					/>
					<DeleteModal
						open={openDeleteModal}
						toggle={toggleDeleteModal}
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
