import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';

import DraggableLayoutWrapper from '../../../../../layouts/DraggableLayoutWrapper';
import DraggableCardLayout from '../../../../../layouts/DraggableCardLayout';
import { useFormStyles } from '../../../../forms.style';
import FormikDropzone from '../../../../../ui/inputs/formik/FormikDropzone';
import FormikField from '../../../../../ui/inputs/formik/FormikField';

const ImageVideo = ({ index, item }) => {
	const classes = useFormStyles();

	const { setFieldValue } = useFormikContext();

	const handleDeleteFile = () => {
		setFieldValue(`elements.${index}.uploadedFiles`, []);
	};

	return (
		<DraggableLayoutWrapper>
			<DraggableCardLayout
				title={'Add Image / Video'}
				key={index}
				index={index}
				item={item}
			>
				<div className={classes.dropzoneWrapper}>
					<FormikDropzone
						name={`elements.${index}.uploadedFiles`}
						accept='image/jpeg, image/png, video/mp4'
						formatMessage='Supported formats are jpeg,png and mp4'
						fileSizeMessage='Image file size should not exceed 1MB.'
						onDelete={() => handleDeleteFile()}
						showPreview
						hidePreviewIcon
					/>
				</div>

				<div className={classes.fieldContainer}>
					<FormikField
						name={`elements.${index}.dropbox_url`}
						label='DROPBOX URL'
						placeholder='Please drop the dropbox URL here'
						multiline
						maxRows={2}
					/>
				</div>
			</DraggableCardLayout>
		</DraggableLayoutWrapper>
	);
};

ImageVideo.propTypes = {
	index: PropTypes.number.isRequired,
	item: PropTypes.object
};

export default ImageVideo;
