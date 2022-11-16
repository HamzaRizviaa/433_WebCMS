import React, { useState, useRef, useMemo } from 'react';
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
import { MediaLibraryService } from '../../../data/services';
import {
	useGetMainCategoriesQuery,
	useLazyGetSubCategoriesQuery
} from '../../../data/features/mediaLibrary/media.query';

import MediaFormDrawer from './subComponents/MediaFormDrawer';
import DeleteModal from '../../DeleteModal';
import { toast } from 'react-toastify';

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

	const initialValues = useMemo(
		() =>
			isEdit && !isEmpty(specificMedia)
				? mediaDataFormatterForForm(specificMedia)
				: mediaFormInitialValues,
		[isEdit, specificMedia]
	);

	const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

	// get categories
	const { data: mainCategories } = useGetMainCategoriesQuery();
	//get sub categories
	const [getSubCategories, subCategoryStates] = useLazyGetSubCategoriesQuery();

	const { data } = subCategoryStates;

	const onSubmitHandler = async (values, formikBag, isDraft = false) => {
		formikBag.setSubmitting(true);
		const clonedValues = { ...values };

		const mainCategoryId = (mainCategories || []).find(
			(u) => u.name === values.mainCategory
		)?.id;

		const subCategoryId = (data || []).find(
			(u) => u.name === values.subCategory
		)?.id;

		clonedValues.main_category_id = mainCategoryId;
		clonedValues.sub_category_id = subCategoryId;

		try {
			if (
				(!isDraft && specificMedia?.title !== values.title) ||
				(!isDraft && status === 'draft')
			) {
				const { data } = await MediaLibraryService.checkTitleDuplication(
					values.title
				);

				if (data.response) {
					formikBag.setSubmitting(false);
					formikBag.setFieldError(
						'title',
						'A Media item with this Title has already been published. Please amend the Title.'
					);
					return;
				}
			}

			const uploadedImgs = await fileUploadsArray(values);
			const completedUploadFiles = await completeUpload(uploadedImgs, values);
			const getUser = getUserDataObject();
			const mediaData = mediaDataFormatterForServer(
				clonedValues,
				isDraft,
				uploadedImgs,
				getUser,
				completedUploadFiles
			);

			const { type } = await dispatch(
				createOrEditMediaThunk(mediaData, formikBag, isDraft)
			);

			if (type === 'mediaLibrary/createOrEditMediaThunk/fulfilled') {
				handleClose();

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
			toast.error(e.message || 'something comes up');
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
			initialValues={initialValues}
			validationSchema={mediaFormValidationSchema}
			validateOnMount
			onSubmit={onSubmitHandler}
		>
			{({ setSubmitting }) => (
				<div>
					<MediaFormDrawer
						getSubCategories={getSubCategories}
						subCategoryStates={subCategoryStates}
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
