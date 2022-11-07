/* eslint-disable no-unused-vars */
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
			let newsImages = values?.slides.map(async (item) => {
				let newsData = await uploadFileToServer(
					item?.uploadedFiles[0],
					'newslibrary'
				);
				return newsData;
			});
			Promise.all([...newsImages])
				.then((mediaFiles) => {
					const newsData = newsDataFormatterForService(
						values,
						mediaFiles,
						isDraft
					);
					dispatch(createOrEditNewsThunk(newsData, formikBag, isDraft));
					handleClose();
					if (isEdit && !(status === 'draft' && isDraft === false)) {
						dispatch(getAllNewsApi(queryParams));
					} else if (isSearchParamsEmpty) {
						dispatch(getAllNewsApi());
					} else {
						navigate('/news-library');
					}
				})
				.catch((err) => {
					console.log('errPromise', err);
				});
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
					viral_id: id,
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
						text={'News'}
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
