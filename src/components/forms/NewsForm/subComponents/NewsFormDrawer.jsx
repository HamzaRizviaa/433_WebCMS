import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFormikContext } from 'formik';
import { selectSpecificNewsStatus } from '../../../../data/selectors';

import DrawerLayout from '../../../layouts/DrawerLayout';
import NewsInternalForm from './NewsInternalForm';

const NewsFormDrawer = ({
	open,
	handleClose,
	isEdit,
	status,
	onSubmitHandler,
	toggleDeleteModal
}) => {
	const { values, isSubmitting } = useFormikContext();

	const specificNewsStatus = useSelector(selectSpecificNewsStatus);

	const [previewFile, setPreviewFile] = useState(null);

	const openPreviewer = (file) => {
		setPreviewFile(file);
	};

	const closePreviewer = () => {
		setPreviewFile(null);
	};

	return (
		<DrawerLayout
			open={open}
			handleClose={handleClose}
			title={isEdit ? 'Edit News' : 'Upload News'}
			notifID={isEdit ? values.id : ''}
			isLoading={isSubmitting || specificNewsStatus === 'loading'}
			handlePreviewClose={closePreviewer}
			previewFile={previewFile}
		>
			<NewsInternalForm
				isEdit={isEdit}
				status={status}
				previewFile={previewFile}
				openPreviewer={openPreviewer}
				onSubmitHandler={onSubmitHandler}
				toggleDeleteModal={toggleDeleteModal}
			/>
		</DrawerLayout>
	);
};

NewsFormDrawer.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	onSubmitHandler: PropTypes.func.isRequired,
	toggleDeleteModal: PropTypes.func.isRequired
};

export default NewsFormDrawer;
