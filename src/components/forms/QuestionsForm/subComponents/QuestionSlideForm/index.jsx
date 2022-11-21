import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'formik';
import { capitalize } from 'lodash';

import Answers from './Answers';
import FormikDropzone from '../../../../ui/inputs/formik/FormikDropzone';
import FormikField from '../../../../ui/inputs/formik/FormikField';
import FormikLabelsSelect from '../../../../ui/inputs/formik/FormikLabelsSelect';
import Button from '../../../../ui/Button';
import DraggableCardLayout from '../../../../layouts/DraggableCardLayout';
import DraggableLayoutWrapper from '../../../../layouts/DraggableLayoutWrapper';
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
						<div>
							<FormikDropzone
								name={`questions.${index}.uploadedFiles`}
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
								name={`questions.${index}.dropbox_url`}
								label='DROPBOX URL'
								placeholder='Please drop the URL here'
								multiline
								maxRows={2}
							/>
						</div>
						<div className={classes.fieldContainer}>
							<FormikField
								name={`questions.${index}.question`}
								label='QUESTION'
								placeholder='Please write your question here'
								multiline
								maxRows={2}
								maxLength={43}
							/>
						</div>
						<div>
							<FieldArray
								name={`questions.${index}.answers`}
								render={(props) => <Answers {...props} questionIndex={index} />}
							/>
						</div>
						<div className={classes.fieldContainer}>
							<FormikLabelsSelect
								label='LABELS'
								name={`questions.${index}.labels`}
								placeholder='Select a minimum of 1 label'
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
