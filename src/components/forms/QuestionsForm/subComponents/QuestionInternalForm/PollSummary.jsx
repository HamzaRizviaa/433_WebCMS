import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';

import FormikDropzone from '../../../../ui/inputs/formik/FormikDropzone';
import FormikField from '../../../../ui/inputs/formik/FormikField';
import FormikDatePicker from '../../../../ui/inputs/formik/FormikDatePicker';
import { useFormStyles } from '../../../forms.style';

const PollSummary = ({ openPreviewer, isClosed }) => {
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
					isClearable={!isClosed}
					disabled={isClosed}
					required
				/>
			</div>
			<p className={classes.mainHeading}>Summary Component</p>
			<div className={classes.fieldContainer}>
				<FormikField
					name='general_info.results'
					label='RESULTS'
					placeholder='Please write your result here'
					maxLength={24}
					required
					multiline
					maxRows={2}
					disabled={isClosed}
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
					hideDeleteIcon={isClosed}
				/>
			</div>
			<div className={classes.fieldContainer}>
				<FormikField
					name='general_info.results_dropbox_url'
					label='DROPBOX URL'
					placeholder='Please drop the dropbox URL here'
					multiline
					maxRows={2}
				/>
			</div>
		</div>
	);
};

PollSummary.propTypes = {
	openPreviewer: PropTypes.func.isRequired,
	isClosed: PropTypes.bool.isRequired
};

export default PollSummary;
