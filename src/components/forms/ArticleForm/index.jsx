import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { isEmpty } from 'lodash';
import { selectSpecificArticle } from '../../../data/selectors';
import { useSelector } from 'react-redux';
// import { useCommonParams } from '../../../hooks';
// import { useNavigate } from 'react-router-dom';
import {
	articleDataFormatterForForm,
	articleFormInitialValues,
	articleFormValidationSchema
} from '../../../data/helpers';
import DeleteModal from '../../DeleteModal';
import ArticleGeneralForm from './subComonents/ArticleGeneralForm';

const ArticleForm = (
	open,
	handleClose,
	isEdit,
	status // draft or publish
) => {
	// const navigate = useNavigate();
	// const { queryParams, isSearchParamsEmpty } = useCommonParams();
	// const dispatch = useDispatch();
	const specificArticle = useSelector(selectSpecificArticle);

	const [openDeleteModal, setOpenDeleteModal] = useState(false);
	// const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);
	const closeDeleteModal = () => setOpenDeleteModal(false);

	// Refs
	const dialogWrapper = useRef(null);

	const initialValues = useMemo(() => {
		return isEdit && !isEmpty(specificArticle)
			? articleDataFormatterForForm(specificArticle)
			: articleFormInitialValues;
	}, [isEdit, specificArticle]);

	const onDeleteHandler = async (id, isDraft, setSubmitting) => {
		setSubmitting(true);
		setOpenDeleteModal(false);
		//Dispatch for delete here
	};

	const [previewFile, setPreviewFile] = useState(null);
	const [loadingStatus, setLoadingStatus] = useState(false);
	console.log(loadingStatus);

	const openPreviewer = (file) => {
		setPreviewFile(file);
	};

	const handleLoading = (status) => {
		setLoadingStatus(status);
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={articleFormValidationSchema}
			onSubmit={() => {}}
			enableReinitialize
			validateOnMount
		>
			{({ setSubmitting, isSubmitting }) => (
				<Form>
					<ArticleGeneralForm
						previewFile={previewFile}
						openPreviewer={openPreviewer}
						handleLoading={handleLoading}
					/>

					<DeleteModal
						open={openDeleteModal}
						toggle={closeDeleteModal}
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
