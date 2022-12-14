/* eslint-disable no-unused-vars */
import React, { useRef, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { isEmpty } from 'lodash';
import DeleteModal from '../../DeleteModal';
import ArticleFormDrawer from './subComonents/ArticleFormDrawer';
import { useCommonParams } from '../../../hooks';
import { ArticleLibraryService } from '../../../data/services';
import { selectSpecificArticle } from '../../../data/selectors/articleLibrarySelectors';
import {
	articleFormInitialValues,
	articleFormValidationSchema,
	articleDataFormatterForForm,
	articleDataFormatterForService,
	uploadArticleFiles
} from '../../../data/helpers/articleHelpers';
import {
	getAllArticlesApi,
	createOrEditArticleThunk,
	deleteArticleThunk,
	getArticleSubCategories
} from '../../../data/features/articleLibrary/articleLibrarySlice';

const ArticleForm = ({ open, handleClose, isEdit, status }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { queryParams, isSearchParamsEmpty } = useCommonParams();

	// Selectors
	const specificArticle = useSelector(selectSpecificArticle);

	// Refs
	const dialogWrapper = useRef(null);

	// States
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	useEffect(() => {
		if (specificArticle?.main_category_id)
			dispatch(getArticleSubCategories(specificArticle.main_category_id));
	}, [specificArticle]);

	const initialValues = useMemo(
		() =>
			isEdit && !isEmpty(specificArticle)
				? articleDataFormatterForForm(specificArticle)
				: articleFormInitialValues,
		[isEdit, specificArticle]
	);

	const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

	const onSubmitHandler = async (values, formikBag, isDraft = false) => {
		formikBag.setSubmitting(true);

		try {
			// if (
			// 	(!isDraft && specificArticle?.title !== values.title) ||
			// 	(!isDraft && status === 'draft')
			// ) {
			// 	const { data } = await ArticleLibraryService.getArticleCheckTitle(
			// 		values.title
			// 	);

			// 	if (data.response) {
			// 		formikBag.setSubmitting(false);
			// 		formikBag.setFieldError(
			// 			'title',
			// 			'An article item with this Title has already been published. Please amend the Title.'
			// 		);
			// 		return;
			// 	}
			// }

			const { uploadedFilesRes, elements } = await uploadArticleFiles(values);

			console.log({ elements });

			const articleData = articleDataFormatterForService(
				{ ...values, elements },
				uploadedFilesRes,
				isDraft
			);

			console.log({ articleData });

			const { type } = await dispatch(
				createOrEditArticleThunk(articleData, formikBag, isDraft)
			);

			if (type === 'articleLibary/createOrEditArticleThunk/fulfilled') {
				handleClose();

				if (isEdit && !(status === 'draft' && isDraft === false)) {
					dispatch(getAllArticlesApi(queryParams));
				} else if (isSearchParamsEmpty) {
					dispatch(getAllArticlesApi());
				} else {
					navigate('/article-library');
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
				deleteArticleThunk({
					article_id: id,
					is_draft: isDraft
				})
			);

			handleClose();
			dispatch(getAllArticlesApi(queryParams));
		} catch (e) {
			console.error(e);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={articleFormValidationSchema}
			onSubmit={onSubmitHandler}
			enableReinitialize
			validateOnMount
		>
			{({ setSubmitting, isSubmitting }) => (
				<Form>
					<ArticleFormDrawer
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
							onDeleteHandler(specificArticle?.id, status, setSubmitting);
						}}
						text={'Article'}
						wrapperRef={dialogWrapper}
						isSubmitting={isSubmitting}
					/>
				</Form>
			)}
		</Formik>
	);
};

ArticleForm.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired
};

export default ArticleForm;
