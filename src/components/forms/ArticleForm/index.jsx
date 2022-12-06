/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import {
	articleFormInitialValues,
	articleFormValidationSchema
} from '../../../data/helpers/articleHelpers';
import DeleteModal from '../../DeleteModal';
import ArticleFormDrawer from './subComonents/ArticleFormDrawer';

const ArticleForm = ({ open, handleClose, isEdit, status }) => {
	// Refs
	const dialogWrapper = useRef(null);

	// States
	const [openDeleteModal, setOpenDeleteModal] = useState(false);

	const toggleDeleteModal = () => setOpenDeleteModal(!openDeleteModal);

	const onSubmitHandler = () => {};

	// const onDeleteHandler = () => {};

	return (
		<Formik
			initialValues={articleFormInitialValues}
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
							// onDeleteHandler(specificArticle?.id, status, setSubmitting);
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
