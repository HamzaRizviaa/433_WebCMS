import React from 'react';
import FormikDropzone from '../../../../ui/inputs/formik/FormikDropzone';
import PropTypes from 'prop-types';
import FormikField from '../../../../ui/inputs/formik/FormikField';
import { useFormStyles } from '../../../forms.style';
import { useFormikContext } from 'formik';
import FormikDatePicker from '../../../../ui/inputs/formik/FormikDatePicker';

const PollSummary = ({ openPreviewer }) => {
	const classes = useFormStyles();

	const { setFieldValue } = useFormikContext();

	const handleDeleteFile = () => {
		setFieldValue('resultsUploadedFiles', []);
	};

	return (
		<div>
			<div>
				<FormikDatePicker
					name='general_info.end_date'
					placeholder='Please select an end date'
					label='POLL END DATE'
					isClearable
					required
				/>
			</div>
			<p className={classes.mainHeading}>Summary Component</p>
			<div className={classes.fieldContainer}>
				<FormikField
					name={'general_info.results'}
					label='RESULT'
					placeholder='Please write your result here'
					maxLength={24}
					required
					multiline
					maxRows={2}
				/>
			</div>
			<div className={classes.dropzoneWrapper}>
				<FormikDropzone
					name='resultsUploadedFiles'
					accept='image/jpeg, image/png'
					formatMessage='Supported formats are jpeg and png'
					fileSizeMessage='Image file size should not exceed 1MB.'
					showPreview
					onPreview={openPreviewer}
					onDelete={() => handleDeleteFile()}
				/>
			</div>
			<div className={classes.fieldContainer}>
				<FormikField
					name={'general_info.results_dropbox_url'}
					label='DROPBOX URL'
					placeholder='Please drop the URL here'
					multiline
					maxRows={2}
				/>
			</div>
		</div>
	);
};

PollSummary.propTypes = {
	openPreviewer: PropTypes.func.isRequired
};

export default PollSummary;
