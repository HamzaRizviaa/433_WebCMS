import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';

import FormikDropzone from '../../../../ui/inputs/formik/FormikDropzone';
import FormikField from '../../../../ui/inputs/formik/FormikField';
import FormikDatePicker from '../../../../ui/inputs/formik/FormikDatePicker';
import { useFormStyles } from '../../../forms.style';

const QuizSummary = ({ openPreviewer, isPublished, isClosed }) => {
	const classes = useFormStyles();

	const { setFieldValue } = useFormikContext();

	const handleDeletePositiveFile = () => {
		setFieldValue('positiveResultsUploadedFiles', []);
	};

	const handleDeleteNegativeFile = () => {
		setFieldValue('negativeResultsUploadedFiles', []);
	};

	return (
		<div>
			<div>
				<FormikDatePicker
					name='general_info.end_date'
					placeholder='Please select an end date'
					label='QUIZ END DATE'
					isClearable={!isPublished}
					disabled={isPublished}
					required
				/>
			</div>
			<p className={classes.mainHeading}>Summary Component</p>
			<div className={classes.fieldContainer}>
				<FormikField
					name='general_info.positive_results'
					label='POSITIVE RESULTS'
					placeholder='Please write your positive results message here'
					maxLength={24}
					required
					multiline
					maxRows={2}
					disabled={isClosed}
				/>
			</div>
			<div className={classes.dropzoneWrapper}>
				<FormikDropzone
					name='positiveResultsUploadedFiles'
					accept='image/jpeg, image/png'
					formatMessage='Supported formats are jpeg and png'
					fileSizeMessage='Image file size should not exceed 1MB.'
					showPreview
					onPreview={openPreviewer}
					onDelete={() => handleDeletePositiveFile()}
					hideDeleteIcon={isClosed}
				/>
			</div>
			<div className={classes.fieldContainer}>
				<FormikField
					name='general_info.positive_results_dropbox_url'
					label='DROPBOX URL'
					placeholder='Please drop the URL here'
					multiline
					maxRows={2}
				/>
			</div>
			<div className={classes.fieldContainer}>
				<FormikField
					name='general_info.negative_results'
					label='NEGATIVE RESULTS'
					placeholder='Please write your negative results message here'
					maxLength={24}
					required
					multiline
					maxRows={2}
					disabled={isClosed}
				/>
			</div>
			<div className={classes.dropzoneWrapper}>
				<FormikDropzone
					name='negativeResultsUploadedFiles'
					accept='image/jpeg, image/png'
					formatMessage='Supported formats are jpeg and png'
					fileSizeMessage='Image file size should not exceed 1MB.'
					showPreview
					onPreview={openPreviewer}
					onDelete={() => handleDeleteNegativeFile()}
					hideDeleteIcon={isClosed}
				/>
			</div>
			<div className={classes.fieldContainer}>
				<FormikField
					name='general_info.negative_results_dropbox_url'
					label='DROPBOX URL'
					placeholder='Please drop the URL here'
					multiline
					maxRows={2}
				/>
			</div>
		</div>
	);
};

QuizSummary.propTypes = {
	openPreviewer: PropTypes.func.isRequired,
	isPublished: PropTypes.bool.isRequired,
	isClosed: PropTypes.bool.isRequired
};

export default QuizSummary;
