import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';

import Button from '../../../../ui/Button';
import DraggableCardLayout from '../../../../layouts/DraggableCardLayout';
import DraggableLayoutWrapper from '../../../../layouts/DraggableLayoutWrapper';
import TabPanes from '../../../../ui/TabPanes';
import QuestionForm from './QuestionForm';
import { AddIcon } from '../../../../../assets/svg-icons';
import { questionSlideInitialValues } from '../../../../../data/helpers';
import { useFormStyles } from '../../../forms.style';
import QuestionDetails from '../QuestionDetails';

const QuestionSlideForm = ({
	form,
	push,
	remove,
	swap,
	openPreviewer,
	isEdit,
	status
}) => {
	const classes = useFormStyles();

	const handleDeleteFile = (index) => {
		form.setFieldValue(`questions.${index}.uploadedFiles`, []);
	};

	const handleDeleteSlide = (_, index) => {
		remove(index);
	};

	const handleDragEnd = (draggedData) => {
		swap(draggedData.source.index, draggedData.destination.index);
	};

	const handleAddQuestionSlide = () => {
		push(questionSlideInitialValues);
	};

	const questionType = capitalize(form.values.general_info.question_type);

	const tabHeadings = ['Results', `Edit ${questionType}`];

	const isPublished = isEdit && status !== 'draft';
	const isClosed = isEdit && status === 'CLOSED';

	const defaultSelectedTab = isPublished ? 0 : 1;

	return (
		<div>
			<DraggableLayoutWrapper onDragEnd={handleDragEnd}>
				{form.values.questions.map((item, index) => (
					<DraggableCardLayout
						title={`${questionType} ${index + 1}`}
						key={index}
						index={index}
						item={item}
						onDeleteIconClick={handleDeleteSlide}
						disableActions={isPublished}
					>
						<TabPanes
							headings={tabHeadings}
							type='questions'
							defaultValue={defaultSelectedTab}
							hideTabsHead={!isPublished}
						>
							<TabPanes.TabPanel value={0}>
								<QuestionDetails questionId={item.id} />
							</TabPanes.TabPanel>
							<TabPanes.TabPanel value={1}>
								<QuestionForm
									index={index}
									handleDeleteFile={handleDeleteFile}
									openPreviewer={openPreviewer}
									isPublished={isPublished}
									isClosed={isClosed}
								/>
							</TabPanes.TabPanel>
						</TabPanes>
					</DraggableCardLayout>
				))}
			</DraggableLayoutWrapper>
			{!isPublished && form.values.questions.length < 10 && (
				<div className={classes.addNewsBtnWrapper}>
					<Button
						variant='outlined'
						size='xlarge'
						icon={<AddIcon />}
						onClick={handleAddQuestionSlide}
						fullWidth
					>
						ADD QUESTION
					</Button>
				</div>
			)}
		</div>
	);
};

QuestionSlideForm.propTypes = {
	form: PropTypes.object.isRequired,
	push: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired,
	swap: PropTypes.func.isRequired,
	openPreviewer: PropTypes.func.isRequired,
	isEdit: PropTypes.bool,
	status: PropTypes.string
};

export default QuestionSlideForm;
