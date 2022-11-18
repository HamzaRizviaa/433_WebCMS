import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFormikContext } from 'formik';

import DrawerLayout from '../../../layouts/DrawerLayout';
import QuestionInternalForm from './QuestionInternalForm';
import { selectSpecificQuestionStatus } from '../../../../data/selectors';

const QuestionsFormDrawer = ({
	open,
	handleClose,
	isEdit,
	status,
	onSubmitHandler,
	toggleDeleteModal
}) => {
	const { values, isSubmitting } = useFormikContext();

	const specificQuestionStatus = useSelector(selectSpecificQuestionStatus);

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
			title={isEdit ? 'Edit Question' : 'Upload Question'}
			notifID={isEdit ? values.id : ''}
			isLoading={isSubmitting || specificQuestionStatus === 'loading'}
			handlePreviewClose={closePreviewer}
			previewFile={previewFile}
		>
			<QuestionInternalForm
				isEdit={isEdit}
				status={status}
				openPreviewer={openPreviewer}
				onSubmitHandler={onSubmitHandler}
				toggleDeleteModal={toggleDeleteModal}
			/>
		</DrawerLayout>
	);
};

QuestionsFormDrawer.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	onSubmitHandler: PropTypes.func.isRequired,
	toggleDeleteModal: PropTypes.func.isRequired
};

export default QuestionsFormDrawer;
