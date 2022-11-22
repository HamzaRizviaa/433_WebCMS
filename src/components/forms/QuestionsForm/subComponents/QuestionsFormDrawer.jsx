import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFormikContext } from 'formik';

import DrawerLayout from '../../../layouts/DrawerLayout';
import QuestionInternalForm from './QuestionInternalForm';
import { selectSpecificQuestionStatus } from '../../../../data/selectors';
import QuestionForm from './QuestionSlideForm/QuestionForm';

const QuestionsFormDrawer = ({
	open,
	handleClose,
	isEdit,
	status,
	onSubmitHandler,
	toggleDeleteModal,
	toggleStopModal,
	questionType,
	location
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
			{location === 'article' ? (
				<>
					{values.questions.length > 0 && <QuestionForm index={0} isArticle />}
				</>
			) : (
				<QuestionInternalForm
					isEdit={isEdit}
					status={status}
					openPreviewer={openPreviewer}
					onSubmitHandler={onSubmitHandler}
					toggleDeleteModal={toggleDeleteModal}
					toggleStopModal={toggleStopModal}
					defaultQuestionType={questionType}
					location={location}
				/>
			)}
		</DrawerLayout>
	);
};

QuestionsFormDrawer.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	onSubmitHandler: PropTypes.func.isRequired,
	toggleDeleteModal: PropTypes.func.isRequired,
	toggleStopModal: PropTypes.func.isRequired,
	questionType: PropTypes.string.isRequired,
	location: PropTypes.string.isRequired
};

export default QuestionsFormDrawer;
