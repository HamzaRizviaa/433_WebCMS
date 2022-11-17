import React from 'react';
import PropTypes from 'prop-types';
import FormikDropzone from '../../../ui/inputs/formik/FormikDropzone';
import FormikField from '../../../ui/inputs/formik/FormikField';
import Button from '../../../ui/Button';
import DraggableCardLayout from '../../../layouts/DraggableCardLayout';
import DraggableLayoutWrapper from '../../../layouts/DraggableLayoutWrapper';
import { AddIcon } from '../../../../assets/svg-icons';
import { useFormStyles } from '../../forms.style';
import FormikLabelsSelect from '../../../../ui/inputs/formik/FormikLabelsSelect';

const QuestionSlideForm = ({ form, push, remove, swap, openPreviewer }) => {
	const classes = useFormStyles();

	const handleDeleteFile = (index) => {
		form.setFieldValue(`slides.${index}.uploadedFiles`, []);
	};

	const handleDeleteSlide = (_, index) => {
		remove(index);
	};

	const handleDragEnd = (draggedData) => {
		swap(draggedData.source.index, draggedData.destination.index);
	};

	const handleAddNewsSlide = () => {
		push({
			question: '',
			uploadedFiles: [],
			position: 1,
			labels: [],
			dropbox_url: ''
			// pollAnswers: [
			// 	{
			// 		answer: '',
			// 		type: 'poll',
			// 		position: 0
			// 	},
			// 	{
			// 		answer: '',
			// 		type: 'poll',
			// 		position: 1
			// 	}
			// ],
			// quizAnswers: [
			// 	{
			// 		answer: '',
			// 		type: 'right_answer',
			// 		position: 0
			// 	},
			// 	{
			// 		answer: '',
			// 		type: 'wrong_answer_1',
			// 		position: 1
			// 	}
			// ]
		});
	};

	return (
		<div>
			<DraggableLayoutWrapper onDragEnd={handleDragEnd}>
				{form.values.slides.map((item, index) => (
					<DraggableCardLayout
						title={`POLL/QUIZ ${index + 1}`}
						key={index}
						index={index}
						item={item}
						onDeleteIconClick={handleDeleteSlide}
					>
						<div>
							<FormikDropzone
								name={`slides.${index}.uploadedFiles`}
								accept='image/jpeg, image/png'
								formatMessage='Supported formats are jpeg and png'
								fileSizeMessage='Image file size should not exceed 1MB.'
								showPreview
								onPreview={openPreviewer}
								onDelete={() => handleDeleteFile(index)}
							/>
						</div>
						<div className={classes.fieldContainer}>
							<FormikField
								name={`slides.${index}.dropbox_url`}
								label='DROPBOX URL'
								placeholder='Please drop the URL here'
								multiline
								maxRows={2}
							/>
						</div>
						<div className={classes.fieldContainer}>
							<FormikField
								name={`slides.${index}.question`}
								label='QUESTION'
								placeholder='Please write your question here'
								multiline
								maxRows={2}
								maxLength={43}
							/>
						</div>
						<div className={classes.fieldContainer}>
							<FormikLabelsSelect
								label='LABELS'
								name='labels'
								placeholder={'Select a minimum of 7 labels'}
								// disabled={isPublished}
								required
							/>
						</div>
					</DraggableCardLayout>
				))}
			</DraggableLayoutWrapper>
			<div className={classes.addNewsBtnWrapper}>
				<Button
					variant='outlined'
					size='xlarge'
					icon={<AddIcon />}
					onClick={handleAddNewsSlide}
					fullWidth
				>
					ADD NEWS SLIDE
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
