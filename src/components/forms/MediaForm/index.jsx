import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Formik } from 'formik';
import { useCommonParams } from '../../../hooks';
import { selectSpecificMedia } from '../../../data/selectors';
import {
	completeUpload,
	fileUploadsArray,
	getUserDataObject,
	mediaDataFormatterForForm,
	mediaDataFormatterForServer,
	mediaFormInitialValues,
	mediaFormValidationSchema
} from '../../../data/helpers';
import {
	createOrEditMediaThunk,
	deleteMediaThunk,
	getMedia
} from '../../../data/features/mediaLibrary/mediaLibrarySlice';

import MediaFormDrawer from './subComponents/MediaFormDrawer';
import DeleteModal from '../../DeleteModal';

const MediaForm = ({
	open,
	handleClose,
	isEdit,
	status // draft or publish
}) => {
	const navigate = useNavigate();
	const { queryParams, isSearchParamsEmpty } = useCommonParams();
	const dispatch = useDispatch();
	const specificMedia = useSelector(selectSpecificMedia);

	// States
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	// Refs
	const dialogWrapper = useRef(null);

	const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

	const onSubmitHandler = useCallback(
		async (values, formikBag, isDraft = false) => {
			formikBag.setSubmitting(true);
			console.table(values);
			try {
				const uploadedImgs = await fileUploadsArray(values);
				await completeUpload(uploadedImgs, values);

				const getUser = getUserDataObject();

				const mediaData = mediaDataFormatterForServer(
					values,
					isDraft,
					uploadedImgs,
					getUser
				);

				console.log('MEDIA DATA', mediaData);

				const { type } = await dispatch(
					createOrEditMediaThunk(mediaData, formikBag, isDraft)
				);
				if (type === 'mediaLibrary/createOrEditMediaThunk/fulfilled') {
					handleClose();
					formikBag?.resetForm();
					if (isEdit && !(status === 'draft' && isDraft === false)) {
						dispatch(getMedia(queryParams));
					} else if (isSearchParamsEmpty) {
						dispatch(getMedia());
					} else {
						navigate('/media-library');
					}
				}
			} catch (e) {
				console.error(e);
			} finally {
				formikBag.setSubmitting(false);
			}
		}
	);

	const onDeleteHandler = async (id, isDraft, setSubmitting) => {
		try {
			setSubmitting(true);

			await dispatch(
				deleteMediaThunk({
					media_id: id,
					is_draft: isDraft
				})
			);

			handleClose();
			dispatch(getMedia(queryParams));
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
				isEdit && !isEmpty(specificMedia)
					? mediaDataFormatterForForm(specificMedia)
					: mediaFormInitialValues
			}
			validationSchema={mediaFormValidationSchema}
			validateOnMount
			onSubmit={onSubmitHandler}
		>
			{({ setSubmitting }) => (
				<div>
					<MediaFormDrawer
						open={open}
						handleClose={handleClose}
						isEdit={isEdit}
						status={status}
						onSubmitHandler={onSubmitHandler}
						toggleDeleteModal={toggleDeleteModal}
					/>
					<DeleteModal
						open={openDeleteModal}
						toggle={toggleDeleteModal}
						deleteBtn={() => {
							onDeleteHandler(specificMedia?.id, status, setSubmitting);
						}}
						text={'Media'}
						wrapperRef={dialogWrapper}
					/>
				</div>
			)}
		</Formik>
	);
};

MediaForm.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired
};

export default MediaForm;
