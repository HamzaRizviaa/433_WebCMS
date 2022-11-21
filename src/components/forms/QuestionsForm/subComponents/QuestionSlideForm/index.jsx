import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';

import Button from '../../../../ui/Button';
import DraggableCardLayout from '../../../../layouts/DraggableCardLayout';
import DraggableLayoutWrapper from '../../../../layouts/DraggableLayoutWrapper';
import QuestionForm from './QuestionForm';
import { AddIcon } from '../../../../../assets/svg-icons';
import { questionSlideInitialValues } from '../../../../../data/helpers';
import { useFormStyles } from '../../../forms.style';

const QuestionSlideForm = ({ form, push, remove, swap, openPreviewer }) => {
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
					>
						<QuestionForm
							index={index}
							handleDeleteFile={handleDeleteFile}
							openPreviewer={openPreviewer}
						/>
					</DraggableCardLayout>
				))}
			</DraggableLayoutWrapper>
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
		</div>
	);
};

QuestionSlideForm.propTypes = {
	form: PropTypes.object.isRequired,
	push: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired,
	swap: PropTypes.func.isRequired,
	openPreviewer: PropTypes.func.isRequired
};

export default QuestionSlideForm;
