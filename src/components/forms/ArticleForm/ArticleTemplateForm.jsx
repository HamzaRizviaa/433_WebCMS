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
	articleTemplateFormInitialValues,
	articleTemplateFormValidationSchema,
	articleDataFormatterForForm,
	articleDataFormatterForService,
	uploadArticleFiles
} from '../../../data/helpers/articleHelpers/index';
import {
	getAllArticleTemplatesThunk,
	createOrEditArticleTemplateThunk,
	deleteArticleTemplateThunk,
	getArticleSubCategories
} from '../../../data/features/articleLibrary/articleLibrarySlice';
import { getRules } from '../../../data/selectors';
import { deleteReadMoreApi } from '../../../data/services/readMoreArticleService';

const ArticleTemplateForm = ({
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
	const { rules } = useSelector(getRules);

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
				? articleDataFormatterForForm(specificArticle, rules)
				: articleTemplateFormInitialValues(rules),
		[isEdit, specificArticle, rules]
	);

	const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

	const onSubmitHandler = async (values, formikBag) => {
		formikBag.setSubmitting(true);

		try {
			if (
				specificArticle?.template_name !== values.template_name ||
				status === 'draft'
			) {
				const { data } = await ArticleLibraryService.articleTemplateCheckName(
					values.template_name
				);

				if (data.response) {
					formikBag.setSubmitting(false);
					formikBag.setFieldError(
						'template_name',
						'An article template item with this Name has already been created. Please amend the Template Name.'
					);
					return;
				}
			}

			const { uploadedFilesRes, elements } = await uploadArticleFiles(values);

			const articleData = articleDataFormatterForService(
				{ ...values, elements },
				uploadedFilesRes,
				false,
				rules
			);

			const { type } = await dispatch(
				createOrEditArticleTemplateThunk(articleData, formikBag, false)
			);

			if (type === 'articleLibary/createOrEditArticleTemplateThunk/fulfilled') {
				handleClose();

				if (isEdit && !(status === 'draft')) {
					dispatch(getAllArticleTemplatesThunk(queryParams));
				} else if (isSearchParamsEmpty) {
					dispatch(getAllArticleTemplatesThunk());
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

	const onDeleteHandler = async (id, setSubmitting) => {
		setSubmitting(true);
		setOpenDeleteModal(false);
		try {
			const { payload } = await dispatch(deleteArticleTemplateThunk(id));

			if (payload.status === 200) {
				deleteReadMoreApi(id);
			}

			handleClose();
			dispatch(getAllArticleTemplatesThunk(queryParams));
		} catch (e) {
			console.error(e);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={articleTemplateFormValidationSchema}
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
							onDeleteHandler(specificArticle?.id, setSubmitting);
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

ArticleTemplateForm.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	selectedOption: PropTypes.oneOf(['', 'article', 'template']).isRequired
};

export default ArticleTemplateForm;
