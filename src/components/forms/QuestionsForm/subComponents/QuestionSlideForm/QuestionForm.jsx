import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'formik';

import Answers from './Answers';
import FormikDropzone from '../../../../ui/inputs/formik/FormikDropzone';
import FormikField from '../../../../ui/inputs/formik/FormikField';
import FormikLabelsSelect from '../../../../ui/inputs/formik/FormikLabelsSelect';
import { useFormStyles } from '../../../forms.style';

const QuestionForm = ({
	index,
	handleDeleteFile,
	openPreviewer,
	isPublished,
	isClosed,
	isArticle
}) => {
	const classes = useFormStyles();

	return (
		<div>
			<div>
				{!isArticle && (
					<span className={classes.dropzoneLabel}>Add Background Image</span>
				)}
				<FormikDropzone
					name={`questions.${index}.uploadedFiles`}
					accept='image/jpeg, image/png'
					formatMessage='Supported formats are jpeg and png'
					fileSizeMessage='Image file size should not exceed 1MB.'
					onPreview={openPreviewer}
					onDelete={() => handleDeleteFile(index)}
					showPreview
					hideDeleteIcon={isClosed || isArticle}
					hidePreviewIcon={isArticle}
				/>
			</div>
			<div className={classes.fieldContainer}>
				<FormikField
					name={`questions.${index}.dropbox_url`}
					label='DROPBOX URL'
					placeholder='Please drop the dropbox URL here'
					multiline
					maxRows={2}
					disabled={isArticle}
				/>
			</div>
			<div className={classes.fieldContainer}>
				<FormikField
					name={`questions.${index}.question`}
					label='QUESTION'
					placeholder='Please write your question here'
					multiline
					maxRows={2}
					maxLength={55}
					disabled={isPublished || isArticle}
					required
				/>
			</div>
			<div>
				<FieldArray
					name={`questions.${index}.answers`}
					render={(props) => (
						<Answers
							{...props}
							questionIndex={index}
							isDisabled={isPublished || isArticle}
						/>
					)}
				/>
			</div>
			<div className={classes.fieldContainer}>
				<FormikLabelsSelect
					label='LABELS'
					name={`questions.${index}.labels`}
					placeholder='Select a minimum of 1 label'
					disabled={isPublished || isArticle}
					required
				/>
			</div>
		</div>
	);
};

QuestionForm.propTypes = {
	index: PropTypes.number.isRequired,
	handleDeleteFile: PropTypes.func,
	openPreviewer: PropTypes.func,
	isPublished: PropTypes.bool,
	isClosed: PropTypes.bool,
	isArticle: PropTypes.bool
};

export default QuestionForm;
