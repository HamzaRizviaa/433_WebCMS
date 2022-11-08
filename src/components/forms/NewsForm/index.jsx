import React, { useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Formik, Form } from 'formik';
import { useCommonParams } from '../../../hooks';
import { selectSpecificNews } from '../../../data/selectors';
import {
	newsDataFormatterForForm,
	newsDataFormatterForService,
	newsFormInitialValues,
	newsFormValidationSchema
} from '../../../data/helpers';
import {
	createOrEditNewsThunk,
	deleteNewsThunk,
	getAllNewsApi
} from '../../../data/features/newsLibrary/newsLibrarySlice';
import { uploadFileToServer } from '../../../data/utils';

import NewsFormDrawer from './subComponents/NewsFormDrawer';
import DeleteModal from '../../DeleteModal';
import { NewsLibraryService } from '../../../data/services';

const NewsForm = ({
	open,
	handleClose,
	isEdit,
	status // draft or publish
}) => {
	const navigate = useNavigate();
	const { queryParams, isSearchParamsEmpty } = useCommonParams();
	const dispatch = useDispatch();
	const specificNews = useSelector(selectSpecificNews);

	// States
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	// Refs
	const dialogWrapper = useRef(null);

	const initialValues = useMemo(() => {
		return isEdit && !isEmpty(specificNews)
			? newsDataFormatterForForm(specificNews)
			: newsFormInitialValues;
	}, [isEdit, specificNews]);

	const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

	const onSubmitHandler = async (values, formikBag, isDraft = false) => {
		formikBag.setSubmitting(true);

		try {
			if (!isDraft && specificNews.banner_title !== values.banner_title) {
				const { data } = await NewsLibraryService.duplicateTitleCheck(
					values.banner_title
				);

				if (data.response) {
					formikBag.setSubmitting(false);
					formikBag.setFieldError(
						'banner_title',
						'A News item with this Banner Title has already been published. Please amend the Banner Title.'
					);
					return;
				}
			}

			const newsImages = values?.slides.map(async (item) => {
				if (item.uploadedFiles[0].file) {
					const newsData = await uploadFileToServer(
						item?.uploadedFiles[0],
						'newslibrary'
					);

					return newsData;
				}

				return item.uploadedFiles[0];
			});

			const mediaFiles = await Promise.all([...newsImages]);

			const newsData = newsDataFormatterForService(values, mediaFiles, isDraft);

			await dispatch(createOrEditNewsThunk(newsData, formikBag, isDraft));

			handleClose();

			if (isEdit && !(status === 'draft' && isDraft === false)) {
				dispatch(getAllNewsApi(queryParams));
			} else if (isSearchParamsEmpty) {
				dispatch(getAllNewsApi());
			} else {
				navigate('/news-library');
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
				deleteNewsThunk({
					news_id: id,
					is_draft: isDraft
				})
			);

			handleClose();
			dispatch(getAllNewsApi(queryParams));
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
			validationSchema={newsFormValidationSchema}
			validateOnMount
			onSubmit={onSubmitHandler}
		>
			{({ setSubmitting }) => (
				<Form>
					<NewsFormDrawer
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
							onDeleteHandler(specificNews?.id, status, setSubmitting);
						}}
						text='News'
						wrapperRef={dialogWrapper}
					/>
				</Form>
			)}
		</Formik>
	);
};

NewsForm.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired
};

export default NewsForm;