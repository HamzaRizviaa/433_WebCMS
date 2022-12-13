import React from 'react';
import PropTypes from 'prop-types';
import FormikDropzone from '../../../../../ui/inputs/formik/FormikDropzone';
import FormikField from '../../../../../ui/inputs/formik/FormikField';
import FormikLabelsSelect from '../../../../../ui/inputs/formik/FormikLabelsSelect';
import { useElementsStyles } from '../elements.styles';
import { useFormikContext } from 'formik';

const ArticleQuestionForm = ({
	type,
	index,
	isPublished,
	openPreviewer
}) => {
	const classes = useElementsStyles();
	const { setFieldValue } = useFormikContext();

	const handleDeleteFile = () => {
		setFieldValue(`elements.${index}.uploadedFiles`, []);
	};

	return (
		<div>
			<div>
				<span className={classes.slideImageLabel}>
					Add Background Image
					<span className={classes.requiredImage}>{'*'}</span>
				</span>
				<div className={classes.dropzoneWrapper}>
					<FormikDropzone
						name={`elements.${index}.question_data.uploadedFiles`}
						accept='image/jpeg, image/png'
						formatMessage='Supported formats are jpeg and png'
						fileSizeMessage='Image file size should not exceed 1MB.'
						onPreview={openPreviewer}
						onDelete={() => handleDeleteFile()}
						hideDeleteIcon={isPublished}
						showPreview
						hidePreviewIcon
					/>
				</div>
			</div>
			<div className={classes.fieldContainer}>
				<FormikField
					name={`elements.${index}.question_data.dropbox_url`}
					label='DROPBOX URL'
					placeholder='Please drop the dropbox URL here'
					multiline
					maxRows={2}
				/>
			</div>
			<div className={classes.fieldContainer}>
				<FormikField
					name={`elements.${index}.question_data.question`}
					label='QUESTION'
					placeholder='Please write your question here'
					multiline
					maxRows={2}
					maxLength={43}
					disabled={isPublished}
					required
				/>
			</div>
			<div className={classes.fieldContainer}>
				<FormikField
					name={`elements.${index}.question_data.answers.0.answer`}
					label={type === 'quiz' ? 'RIGHT ANSWER' : 'ANSWER 1'}
					placeholder='Please write your answer here'
					multiline
					maxRows={2}
					maxLength={29}
					disabled={isPublished}
					required
				/>
			</div>
			<div className={classes.fieldContainer}>
				<FormikField
					name={`elements.${index}.question_data.answers.1.answer`}
					label={type === 'quiz' ? 'WRONG ANSWER' : 'ANSWER 2'}
					placeholder='Please write your answer here'
					multiline
					maxRows={2}
					maxLength={29}
					disabled={isPublished}
					required
				/>
			</div>
			<div className={classes.fieldContainer}>
				<FormikLabelsSelect
					name={`elements.${index}.question_data.labels`}
					label='LABELS'
					placeholder='Select a minimum of 1 labels'
					disabled={isPublished}
					required
					library='Articles'
				/>
			</div>
		</div>
	);
};

ArticleQuestionForm.propTypes = {
	type: PropTypes.string,
	openPreviewer: PropTypes.any,
	isPublished: PropTypes.bool,
	index: PropTypes.number.isRequired,
	item: PropTypes.object
};

export default ArticleQuestionForm;
