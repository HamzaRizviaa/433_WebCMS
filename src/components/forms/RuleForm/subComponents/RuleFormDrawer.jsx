import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFormikContext } from 'formik';
import { selectSpecificViralStatus } from '../../../../data/selectors';

import DrawerLayout from '../../../layouts/DrawerLayout';
import RuleInternalForm from './RuleInternalForm';

const RuleFormDrawer = ({
	open,
	handleClose,
	isEdit,
	status,
	onSubmitHandler,
	toggleDeleteModal
}) => {
	const { values, isSubmitting } = useFormikContext();

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
			handleClose={handleClose}
			title={isEdit ? 'Edit Rule' : 'Create New Rule'}
			notifID={isEdit && values ? values.id : ''}
			isLoading={isSubmitting || specificViralStatus === 'loading'}
			handlePreviewClose={closePreviewer}
			previewFile={previewFile}
		>
			<RuleInternalForm
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

RuleFormDrawer.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	onSubmitHandler: PropTypes.func.isRequired,
	toggleDeleteModal: PropTypes.func.isRequired
};

export default RuleFormDrawer;
