import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFormikContext } from 'formik';
import { selectSpecificViralStatus } from '../../../../data/selectors';

import DrawerLayout from '../../../layouts/DrawerLayout';
import ViralInternalForm from './ViralInternalForm';

const ViralFormDrawer = ({
	open,
	handleClose,
	isEdit,
	status,
	onSubmitHandler,
	toggleDeleteModal
}) => {
	const { values, isSubmitting, resetForm, validateForm } = useFormikContext();

	const specificViralStatus = useSelector(selectSpecificViralStatus);

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
			handleClose={() => {
				resetForm();
				validateForm();
				handleClose();
			}}
			title={isEdit ? 'Edit Viral' : 'Upload Viral'}
			notifID={isEdit ? values.id : ''}
			isLoading={isSubmitting || specificViralStatus === 'loading'}
			handlePreviewClose={closePreviewer}
			previewFile={previewFile}
		>
			<ViralInternalForm
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

ViralFormDrawer.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	onSubmitHandler: PropTypes.func.isRequired,
	toggleDeleteModal: PropTypes.func.isRequired
};

export default ViralFormDrawer;
