import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { isEqual, omit } from 'lodash';
import { useSelector } from 'react-redux';
import { useFormikContext } from 'formik';
import { selectSpecificMediaStatus } from '../../../../data/selectors';
import {
	mediaUnwantedKeysForDeepEqual,
	mediaFormStatusInitialValues
} from '../../../../data/helpers';

import DrawerLayout from '../../../layouts/DrawerLayout';
import MediaInternalForm from './MediaInternalForm';

const MediaFormDrawer = ({
	open,
	handleClose,
	isEdit,
	status,
	onSubmitHandler,
	toggleDeleteModal,
	initialValues
}) => {
	const { values, isSubmitting, resetForm, validateForm, setStatus } =
		useFormikContext();

	const specificMediaStatus = useSelector(selectSpecificMediaStatus);

	const [previewFile, setPreviewFile] = useState(null);
	const [loadingStatus, setLoadingStatus] = useState(false);

	useEffect(() => {
		setStatus({ ...mediaFormStatusInitialValues });
	}, []);

	useEffect(() => {
		setStatus({
			dirty: !isEqual(
				omit(values, mediaUnwantedKeysForDeepEqual),
				omit(initialValues, mediaUnwantedKeysForDeepEqual)
			)
		});
	}, [values, initialValues]);

	const openPreviewer = (file) => {
		setPreviewFile(file);
	};

	const closePreviewer = () => {
		setPreviewFile(null);
	};

	const handleLoading = (status) => {
		setLoadingStatus(status);
	};

	return (
		<DrawerLayout
			open={open}
			handleClose={() => {
				resetForm();
				validateForm();
				handleClose();
			}}
			title={isEdit ? 'Edit Media' : 'Upload Media'}
			notifID={isEdit ? values.id : ''}
			isLoading={
				loadingStatus || isSubmitting || specificMediaStatus === 'loading'
			}
			handlePreviewClose={closePreviewer}
			previewFile={previewFile}
		>
			<MediaInternalForm
				isEdit={isEdit}
				status={status}
				previewFile={previewFile}
				openPreviewer={openPreviewer}
				onSubmitHandler={onSubmitHandler}
				toggleDeleteModal={toggleDeleteModal}
				handleLoading={handleLoading}
				loadingStatus={loadingStatus}
			/>
		</DrawerLayout>
	);
};

MediaFormDrawer.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	onSubmitHandler: PropTypes.func.isRequired,
	toggleDeleteModal: PropTypes.func.isRequired,
	initialValues: PropTypes.object.isRequired
};

export default MediaFormDrawer;
