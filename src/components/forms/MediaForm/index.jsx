import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Form, Formik } from 'formik';

import MediaFormDrawer from './subComponents/MediaFormDrawer';
import { selectSpecificMedia, getRules } from '../../../data/selectors';
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
import { useLazyGetSubCategoriesQuery } from '../../../data/features/mediaLibrary/media.query';
import DeleteModal from '../../ui/modals/DeleteModal';
import { useCommonParams } from '../../../hooks';

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
	const { rules } = useSelector(getRules);

	// States
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	// Refs
	const dialogWrapper = useRef(null);

	const initialValues = useMemo(
		() =>
			isEdit && !isEmpty(specificMedia)
				? mediaDataFormatterForForm(specificMedia, rules)
				: mediaFormInitialValues(rules),
		[isEdit, specificMedia, rules]
	);

	const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
	const closeDeleteModal = () => setOpenDeleteModal(false);

	//get sub categories
	const [getSubCategories, subCategoryStates] = useLazyGetSubCategoriesQuery();

	// Submit Handler
	const onSubmitHandler = async (values, formikBag) => {
		const clonedValues = { ...values };

		clonedValues.main_category_id = values?.mainCategory;
		clonedValues.sub_category_id = values?.subCategory;

		const isDraft = values.save_draft;
		const isScheduled = values.is_scheduled;

		const { setSubmitting, setFieldValue, setFieldError } = formikBag;
		setSubmitting(true);

		// Title duplicate check cases
		const isScheduleEnabledAndChanged =
			isScheduled && specificMedia?.is_scheduled !== isScheduled;

		const isPublishedOrScheduledAndTitleModified =
			(!isDraft || isScheduled) && specificMedia?.title !== values.title;

		const isDraftChangingToPublishAndScheduleDisable =
			!isDraft && status === 'draft' && !specificMedia?.is_scheduled;

		const shouldCheckTitleDuplication =
			isScheduleEnabledAndChanged ||
			isPublishedOrScheduledAndTitleModified ||
			isDraftChangingToPublishAndScheduleDisable;

		try {
			if (shouldCheckTitleDuplication) {
				const { data } = await MediaLibraryService.checkTitleDuplication(
					values.title
				);

				if (data.response) {
					setSubmitting(false);
					setFieldError(
						'title',
						'A Media item with this Title has already been published. Please amend the Title.'
					);

					const titleField = document.querySelector("[name='title']");
					if (titleField) titleField.focus();
					return;
				}
			}

			const uploadedImgs = await fileUploadsArray(values);
			const completedUploadFiles = await completeUpload(uploadedImgs, values);
			const getUser = getUserDataObject();
			const mediaData = mediaDataFormatterForServer(
				clonedValues,
				uploadedImgs,
				getUser,
				completedUploadFiles,
				rules
			);

			const { type } = await dispatch(createOrEditMediaThunk(mediaData));

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
		} finally {
			setSubmitting(false);
			setFieldValue('save_draft', true, false);
			setFieldValue(
				'is_scheduled',
				specificMedia?.is_scheduled || false,
				false
			);
		}
	};

	const onDeleteHandler = async (id, isDraft, setSubmitting) => {
		setSubmitting(true);
		setOpenDeleteModal(false);
		try {
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
			{({ setSubmitting, isSubmitting }) => (
				<Form>
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
						toggle={closeDeleteModal}
						deleteBtn={() => {
							onDeleteHandler(specificMedia?.id, status, setSubmitting);
						}}
						text={'Media'}
						wrapperRef={dialogWrapper}
						isSubmitting={isSubmitting}
					/>
				</Form>
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
