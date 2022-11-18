import React from 'react';
import FormikDropzone from '../../../../ui/inputs/formik/FormikDropzone';
import PropTypes from 'prop-types';
import FormikField from '../../../../ui/inputs/formik/FormikField';
import { useFormStyles } from '../../../forms.style';
import { useFormikContext } from 'formik';
import FormikDatePicker from '../../../../ui/inputs/formik/FormikDatePicker';

const QuizSummary = ({ openPreviewer }) => {
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
					isClearable
					required
				/>
			</div>
			<p className={classes.mainHeading}>Summary Component</p>
			<div className={classes.fieldContainer}>
				<FormikField
					name={'general_info.positive_results'}
					label='POSITIVE RESULTS'
					placeholder='Please write your positive results message here'
					maxLength={24}
					required
					multiline
					maxRows={2}
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
				/>
			</div>
			<div className={classes.fieldContainer}>
				<FormikField
					name={'general_info.positive_results_dropbox_url'}
					label='DROPBOX URL'
					placeholder='Please drop the URL here'
					multiline
					maxRows={2}
				/>
			</div>
			<div className={classes.fieldContainer}>
				<FormikField
					name={'general_info.negative_results'}
					label='NEGATIVE RESULTS'
					placeholder='Please write your negative results message here'
					maxLength={24}
					required
					multiline
					maxRows={2}
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
				/>
			</div>
			<div className={classes.fieldContainer}>
				<FormikField
					name={'general_info.negative_results_dropbox_url'}
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
	openPreviewer: PropTypes.func.isRequired
};

export default QuizSummary;
