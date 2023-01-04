import React from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';

import FormikDropzone from '../../../../ui/inputs/formik/FormikDropzone';
import FormikField from '../../../../ui/inputs/formik/FormikField';
import CommonFields from './CommonFields';
import FeatureWrapper from '../../../../../components/FeatureWrapper';
import { useFormStyles } from '../../../forms.style';

const PollSummary = ({ openPreviewer, isClosed }) => {
	const classes = useFormStyles();

	const { setFieldValue } = useFormikContext();

	const handleDeleteFile = () => {
		setFieldValue('resultsUploadedFiles', []);
	};

	return (
		<div>
			<FeatureWrapper name='triviaOnQuestions'>
				<CommonFields
					questionType='poll'
					openPreviewer={openPreviewer}
					isClosed={isClosed}
				/>
			</FeatureWrapper>

			<FeatureWrapper name='summaryComponentOnQuestions'>
				<p className={classes.mainHeading}>Summary Component</p>
				<div className={classes.fieldContainer}>
					<FormikField
						name='general_info.results'
						label='RESULTS'
						placeholder='Please write your result here'
						maxLength={26}
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
			</FeatureWrapper>
		</div>
	);
};

PollSummary.propTypes = {
	openPreviewer: PropTypes.func.isRequired,
	isClosed: PropTypes.bool.isRequired
};

export default PollSummary;
