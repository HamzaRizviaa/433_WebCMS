import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import { useFormikContext } from 'formik';
import { useElementsStyles } from '../elements.styles';
import FormikDropzone from '../../../../../ui/inputs/formik/FormikDropzone';
import FormikField from '../../../../../ui/inputs/formik/FormikField';
import FormikLabelsSelect from '../../../../../ui/inputs/formik/FormikLabelsSelect';

const ArticleQuestionForm = ({ type, index, item, isPublished }) => {
	const classes = useElementsStyles();
	const { setFieldValue } = useFormikContext();
	const isItemCreated = !isEmpty(item.id);

	const displayDropzoneTitle = !(
		isPublished &&
		isItemCreated &&
		item.question_data.uploadedFiles.length
	);

	const handleDeleteFile = () => {
		setFieldValue(`elements.${index}.question_data.uploadedFiles`, []);
	};

	return (
		<div>
			<div>
				{displayDropzoneTitle && (
					<span className={classes.slideImageLabel}>
						Add Background Image
						<span className={classes.requiredImage}>{'*'}</span>
					</span>
				)}
				<div className={classes.dropzoneWrapper}>
					<FormikDropzone
						name={`elements.${index}.question_data.uploadedFiles`}
						accept='image/jpeg, image/png'
						formatMessage='Supported formats are jpeg and png'
						fileSizeMessage='Image file size should not exceed 1MB.'
						onDelete={() => handleDeleteFile()}
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
					maxLength={55}
					disabled={isPublished && isItemCreated}
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
					disabled={isPublished && isItemCreated}
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
					disabled={isPublished && isItemCreated}
					required
				/>
			</div>
			<div className={classes.fieldContainer}>
				<FormikLabelsSelect
					name={`elements.${index}.question_data.labels`}
					label='LABELS'
					placeholder='Select a minimum of 1 labels'
					disabled={isPublished && isItemCreated}
					required
					library='Articles'
				/>
			</div>
		</div>
	);
};

ArticleQuestionForm.propTypes = {
	type: PropTypes.string.isRequired,
	index: PropTypes.number.isRequired,
	item: PropTypes.object.isRequired,
	isPublished: PropTypes.bool.isRequired
};

export default ArticleQuestionForm;
