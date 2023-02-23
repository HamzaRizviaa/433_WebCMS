import React from 'react';
import PropTypes from 'prop-types';
import FormikDropzone from '../../../ui/inputs/formik/FormikDropzone';
import FormikField from '../../../ui/inputs/formik/FormikField';
import Button from '../../../ui/Button';
import DraggableCardLayout from '../../../layouts/DraggableCardLayout';
import DraggableLayoutWrapper from '../../../layouts/DraggableLayoutWrapper';
import { AddIcon } from '../../../../assets/svg-icons';
import { useFormStyles } from '../../forms.style';

const NewsSlideForm = ({
	form,
	push,
	remove,
	swap,
	openPreviewer,
	isFieldInteractionAllowed
}) => {
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
			uploadedFiles: [],
			dropbox_url: '',
			title: '',
			description: '',
			name: ''
		});
	};

	return (
		<div>
			<DraggableLayoutWrapper onDragEnd={handleDragEnd}>
				{form.values.slides.map((item, index) => (
					<DraggableCardLayout
						title={`NEWS SLIDE ${index + 1}`}
						key={index}
						index={index}
						item={item}
						onDeleteIconClick={handleDeleteSlide}
						disableActions={!isFieldInteractionAllowed}
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
								disabled={!isFieldInteractionAllowed}
								hideDeleteIcon={!isFieldInteractionAllowed}
							/>
						</div>
						<div className={classes.fieldContainer}>
							<FormikField
								name={`slides.${index}.dropbox_url`}
								label='DROPBOX URL'
								placeholder='Please drop the URL here'
								multiline
								maxRows={2}
								disabled={!isFieldInteractionAllowed}
							/>
						</div>
						<div className={classes.fieldContainer}>
							<FormikField
								name={`slides.${index}.title`}
								label='TITLE'
								placeholder='Please write your title here'
								multiline
								maxRows={2}
								maxLength={43}
								disabled={!isFieldInteractionAllowed}
							/>
						</div>
						<div className={classes.fieldContainer}>
							<FormikField
								name={`slides.${index}.description`}
								label='DESCRIPTION'
								placeholder='Please write your description here'
								multiline
								minRows={3}
								maxRows={4}
								maxLength={250}
								disabled={!isFieldInteractionAllowed}
							/>
						</div>
						<div className={classes.fieldContainer}>
							<FormikField
								name={`slides.${index}.name`}
								label='NAME'
								placeholder='Please write the topic name here'
								multiline
								maxRows={2}
								maxLength={50}
								disabled={!isFieldInteractionAllowed}
							/>
						</div>
					</DraggableCardLayout>
				))}
			</DraggableLayoutWrapper>
			<div className={classes.addNewsBtnWrapper}>
				{form.values.slides?.length < 10 && (
					<Button
						variant='outlined'
						size='xlarge'
						icon={<AddIcon />}
						onClick={handleAddNewsSlide}
						fullWidth
					>
						ADD NEWS SLIDE
					</Button>
				)}
			</div>
		</div>
	);
};

NewsSlideForm.propTypes = {
	form: PropTypes.object.isRequired,
	push: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired,
	swap: PropTypes.func.isRequired,
	openPreviewer: PropTypes.func.isRequired,
	isFieldInteractionAllowed: PropTypes.bool.isRequired
};

export default NewsSlideForm;
