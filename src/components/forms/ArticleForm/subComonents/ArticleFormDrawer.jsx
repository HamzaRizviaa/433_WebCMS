import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import DrawerLayout from '../../../layouts/DrawerLayout';

const ArticleFormDrawer = ({
	open,
	handleClose,
	isEdit,
	status,
	onSubmitHandler,
	toggleDeleteModal
}) => {
	const { values, isSubmitting } = useFormikContext();

	return (
		<DrawerLayout
			open={open}
			handleClose={handleClose}
			title={isEdit ? 'Edit Article' : 'Article Builder'}
			notifID={isEdit ? values.id : ''}
			isLoading={isSubmitting || specificQuestionStatus === 'loading'}
			fromArticle
		></DrawerLayout>
	);
};

ArticleFormDrawer.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	onSubmitHandler: PropTypes.func.isRequired,
	toggleDeleteModal: PropTypes.func.isRequired
};

export default ArticleFormDrawer;
