import React, { useState, useRef } from 'react';
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
	getAllMedia,
	getMainCategories,
	getMedia,
	getSubCategoryThunk
} from '../../../data/features/mediaLibrary/mediaLibrarySlice';

// import { uploadFileToServer } from '../../../data/utils';

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

	const onSubmitHandler = async (values, formikBag, isDraft = false) => {
		formikBag.setSubmitting(true);

		try {
			// const uploadedFiles = await uploadFileToServer(
			// 	values.uploadedFiles[0],
			// 	'medialibrary'
			// );
			// const uploadedCoverImage = await uploadFileToServer(
			// 	values.uploadedCoverImage[0],
			// 	'medialibrary'
			// );
			// const uploadedLandscapeCoverImage = await uploadFileToServer(
			// 	values.uploadedLandscapeCoverImage[0],
			// 	'medialibrary'
			// );

			const uploadedImgs = await fileUploadsArray(values);
			await completeUpload(uploadedImgs, values);

			const getUser = getUserDataObject();
			const mainCategory = await dispatch(getMainCategories());
			const subCategory = await dispatch(getSubCategoryThunk());
			console.log('MAIN CATEGORY', mainCategory);
			console.log('Sub CAtegory', subCategory);

			const mediaData = mediaDataFormatterForServer(
				values,
				isDraft,
				uploadedImgs,
				getUser
			);

			console.log('MEDIA DATA', mediaData);
			await dispatch(createOrEditMediaThunk(mediaData, formikBag, isDraft));

			handleClose();

			if (isEdit && !(status === 'draft' && isDraft === false)) {
				dispatch(getAllMedia(queryParams));
			} else if (isSearchParamsEmpty) {
				dispatch(getAllMedia());
			} else {
				navigate('/media-library');
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
