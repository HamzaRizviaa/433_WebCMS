import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFormikContext } from 'formik';

import DrawerLayout from '../../../layouts/DrawerLayout';
import QuestionFormWrapper from './QuestionFormWrapper';
import QuestionInternalForm from './QuestionInternalForm';
import QuestionForm from './QuestionSlideForm/QuestionForm';
import QuestionDetails from './QuestionDetails';
import { selectSpecificQuestionStatus } from '../../../../data/selectors';
import { capitalize } from 'lodash';

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

	let title = 'Upload Question';

	if (location === 'article') title = `${capitalize(questionType)} Detail`;
	else if (isEdit) title = 'Edit Question';

	return (
		<DrawerLayout
			open={open}
			handleClose={handleClose}
			title={title}
			notifID={isEdit ? values.question_id : ''}
			isLoading={isSubmitting || specificQuestionStatus === 'loading'}
			handlePreviewClose={closePreviewer}
			previewFile={previewFile}
		>
			<QuestionFormWrapper>
				{location === 'article' ? (
					<>
						{status === 'draft' && values.questions.length > 0 && (
							<QuestionForm index={0} isArticle />
						)}
						{status !== 'draft' && values.questions.length > 0 && (
							<QuestionDetails questionId={values.questions[0].id} isArticle />
						)}
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
			</QuestionFormWrapper>
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
