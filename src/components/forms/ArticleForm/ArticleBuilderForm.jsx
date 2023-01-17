import React, { useRef, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import { isEmpty, omit } from 'lodash';
import DeleteModal from '../../DeleteModal';
import ArticleFormDrawer from './subComonents/ArticleFormDrawer';
import { useCommonParams } from '../../../hooks';
import { ArticleLibraryService } from '../../../data/services';
import {
	selectSpecificArticle,
	selectSpecificArticleTemplate
} from '../../../data/selectors/articleLibrarySelectors';
import {
	articleFormInitialValues,
	articleFormValidationSchema,
	articleDataFormatterForForm,
	articleDataFormatterForService,
	uploadArticleFiles
} from '../../../data/helpers/articleHelpers/index';
import {
	getAllArticlesApi,
	createOrEditArticleThunk,
	deleteArticleThunk,
	getArticleSubCategories
} from '../../../data/features/articleLibrary/articleLibrarySlice';
import { getRules } from '../../../data/selectors';

const ArticleBuilderForm = ({
	open,
	handleClose,
	isEdit,
	status,
	selectedOption
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { queryParams, isSearchParamsEmpty } = useCommonParams();

	// Selectors
	const specificArticle = useSelector(selectSpecificArticle);
	const specificArticleTemplate = useSelector(selectSpecificArticleTemplate);
	const { rules } = useSelector(getRules);

	// Refs
	const dialogWrapper = useRef(null);

	// States
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	useEffect(() => {
		if (specificArticle?.main_category_id)
			dispatch(getArticleSubCategories(specificArticle.main_category_id));
	}, [specificArticle, specificArticleTemplate]);

	const initialValues = useMemo(() => {
		if (!isEmpty(specificArticleTemplate) && !isEdit)
			return articleDataFormatterForForm(
				omit(specificArticleTemplate, ['id']),
				rules
			);

		if (isEdit && !isEmpty(specificArticle)) {
			return articleDataFormatterForForm(specificArticle, rules);
		} else {
			return articleFormInitialValues(rules);
		}
	}, [isEdit, specificArticle, rules, specificArticleTemplate]);

	const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

	const onSubmitHandler = async (values, formikBag) => {
		const isDraft = values.save_draft;

		const { setSubmitting, setFieldValue, setFieldError } = formikBag;

		setSubmitting(true);

		try {
			if (
				(values.is_scheduled &&
					specificArticle?.is_scheduled !== values.is_scheduled) ||
				((!isDraft || values.is_scheduled) &&
					specificArticle?.title !== values.title) ||
				(!isDraft && status === 'draft' && !specificArticle?.is_scheduled)
			) {
				const { data } = await ArticleLibraryService.getArticleCheckTitle(
					values.title
				);

				if (data.response) {
					setSubmitting(false);
					setFieldError(
						'title',
						'An article item with this Title has already been published. Please amend the Title.'
					);

					const titleField = document.querySelector("[name='title']");
					if (titleField) titleField.focus();
					return;
				}
			}

			const { uploadedFilesRes, elements } = await uploadArticleFiles(values);

			const articleData = articleDataFormatterForService(
				{ ...values, elements },
				uploadedFilesRes,
				rules
			);

			const { type } = await dispatch(createOrEditArticleThunk(articleData));

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
			setSubmitting(false);
			setFieldValue(
				'is_scheduled',
				specificArticle?.is_scheduled || false,
				false
			);
			setFieldValue('save_draft', true, false);
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
						selectedOption={selectedOption}
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

ArticleBuilderForm.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	selectedOption: PropTypes.oneOf(['', 'article', 'template']).isRequired
};

export default ArticleBuilderForm;
