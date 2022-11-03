import React from 'react';
import PropTypes from 'prop-types';
import FormikDropzone from '../../../ui/inputs/formik/FormikDropzone';
import FormikField from '../../../ui/inputs/formik/FormikField';
import Button from '../../../ui/Button';
import DraggableCardLayout from '../../../layouts/DraggableCardLayout';
import DraggableLayoutWrapper from '../../../layouts/DraggableLayoutWrapper';
import { AddIcon } from '../../../../assets/svg-icons';
import { useNewsFormStyles } from '../index.styles';

const NewsSlideForm = ({ form, push, remove, swap, openPreviewer }) => {
	const classes = useNewsFormStyles();

	const handleDeleteFile = (index) => {
		form.setFieldValue(`newsSlides.${index}.uploadedFiles`, []);
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
				{form.values.newsSlides.map((item, index) => (
					<DraggableCardLayout
						title={`NEWS SLIDE ${index + 1}`}
						key={index}
						index={index}
						item={item}
						onDeleteIconClick={handleDeleteSlide}
					>
						<div>
							<FormikDropzone
								name={`newsSlides.${index}.uploadedFiles`}
								accept='image/jpeg, image/png'
								formatMessage='Supported formats are jpeg and png'
								showPreview
								onPreview={openPreviewer}
								onDelete={handleDeleteFile}
							/>
						</div>
						<div className={classes.fieldContainer}>
							<FormikField
								name={`newsSlides.${index}.dropbox_url`}
								label='DROPBOX URL'
								placeholder='Please drop the URL here'
								multiline
								maxRows={2}
							/>
						</div>
						<div className={classes.fieldContainer}>
							<FormikField
								name={`newsSlides.${index}.title`}
								label='TITLE'
								placeholder='Please write your title here'
								multiline
								maxRows={2}
							/>
						</div>
						<div className={classes.fieldContainer}>
							<FormikField
								name={`newsSlides.${index}.description`}
								label='DESCRIPTION'
								placeholder='Please write your description here'
								multiline
								maxRows={4}
							/>
						</div>
						<div className={classes.fieldContainer}>
							<FormikField
								name={`newsSlides.${index}.name`}
								label='NAME'
								placeholder='Please write the topic name here'
								multiline
								maxRows={2}
							/>
						</div>
					</DraggableCardLayout>
				))}
			</DraggableLayoutWrapper>
			<Button
				variant='outlined'
				size='xlarge'
				icon={<AddIcon />}
				onClick={handleAddNewsSlide}
			>
				ADD NEWS SLIDE
			</Button>
		</div>
	);
};

NewsSlideForm.propTypes = {
	form: PropTypes.object.isRequired,
	push: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired,
	swap: PropTypes.func.isRequired,
	openPreviewer: PropTypes.func.isRequired
};

export default NewsSlideForm;
