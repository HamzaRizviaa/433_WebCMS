import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';

import FormikDropzone from '../../../../ui/inputs/formik/FormikDropzone';
import FormikField from '../../../../ui/inputs/formik/FormikField';
import { useFormStyles } from '../../../forms.style';

const CommonFields = ({ questionType, openPreviewer, isClosed }) => {
	const { setFieldValue } = useFormikContext();

	const handleDeleteFile = () => {
		setFieldValue('coverImageUploadedFiles', []);
	};

	const classes = useFormStyles();

	return (
		<>
			<div className={classes.fieldContainer}>
				<FormikField
					name='general_info.question_title'
					label={`${questionType?.toUpperCase()} TITLE`}
					multiline
					maxRows={2}
					maxLength={43}
					disabled={isClosed}
					required
				/>
			</div>
			<div className={classes.fieldContainer}>
				<span className={classes.dropzoneLabel}>Cover Image</span>
				<FormikDropzone
					name='resultsUploadedFiles'
					accept='image/jpeg, image/png'
					formatMessage='Supported formats are jpeg and png'
					fileSizeMessage='Image file size should not exceed 1MB.'
					showPreview
					onPreview={openPreviewer}
					onDelete={() => handleDeleteFile()}
					hideDeleteIcon={isClosed}
				/>
			</div>
			<div className={classes.fieldContainer}>
				<FormikField
					name='general_info.cover_image_dropbox_url'
					label='DROPBOX URL'
					multiline
					maxRows={2}
					disabled={isClosed}
				/>
			</div>
		</>
	);
};

CommonFields.propTypes = {
	questionType: PropTypes.string.isRequired,
	openPreviewer: PropTypes.func.isRequired,
	isClosed: PropTypes.bool
};

export default CommonFields;
