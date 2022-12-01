import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';

const ArticleForm = () => {
	return (
		<Formik
			initialValues={{}}
			validationSchema={{}}
			onSubmit={() => {}}
			enableReinitialize
			validateOnMount
		>
			{({ setSubmitting, isSubmitting }) => <Form></Form>}
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
