import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFormikContext } from 'formik';
import { selectSpecificMediaStatus } from '../../../../data/selectors';

import DrawerLayout from '../../../layouts/DrawerLayout';
import MediaInternalForm from './MediaInternalForm';
import {
	useGetMainCategoriesQuery,
	useLazyGetSubCategoriesQuery
} from '../../../../data/features/mediaLibrary/media.query';

const MediaFormDrawer = ({
	open,
	handleClose,
	isEdit,
	status,
	onSubmitHandler,
	toggleDeleteModal
}) => {
	const { values, isSubmitting, resetForm, validateForm } = useFormikContext();

	const specificMediaStatus = useSelector(selectSpecificMediaStatus);
	// get categories
	const { isLoading: categoriesLoading } = useGetMainCategoriesQuery();

	//get sub categories
	const [, { isFetching: subFetching, isLoading: subLoading }] =
		useLazyGetSubCategoriesQuery();

	const [previewFile, setPreviewFile] = useState(null);
	const [loadingStatus, setLoadingStatus] = useState(false);

	const openPreviewer = (file) => {
		setPreviewFile(file);
	};

	const closePreviewer = () => {
		setPreviewFile(null);
	};

	const handleLoading = (status) => {
		setLoadingStatus(status);
	};

	const isCategoriesLoading = () =>
		categoriesLoading || subFetching || subLoading;

	console.table(
		categoriesLoading,
		subFetching,
		subLoading,
		isCategoriesLoading()
	);
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
	toggleDeleteModal: PropTypes.func.isRequired
};

export default MediaFormDrawer;
