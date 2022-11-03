import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'formik';
import { useFormikContext } from 'formik';
import { useNewsFormStyles } from '../index.styles';
import { useStyles as globalUseStyles } from '../../../../styles/global.style';

import FormikField from '../../../ui/inputs/formik/FormikField';
import FormikSwitchField from '../../../ui/inputs/formik/FormikSwitchField';
import FormikLabelsSelect from '../../../ui/inputs/formik/FormikLabelsSelect';
import Button from '../../../ui/Button';
import NewsSlideForm from './NewsSlideForm';
import AccordianLayout from '../../../layouts/AccordianLayout';

const NewsInternalForm = ({
	isEdit,
	status,
	onSubmitHandler,
	toggleDeleteModal,
	openPreviewer
}) => {
	const classes = useNewsFormStyles();
	const globalClasses = globalUseStyles();
	const isPublished = isEdit && status === 'published';

	const { values, dirty, isValid, isSubmitting, handleSubmit, setSubmitting } =
		useFormikContext();

	const saveDraftHandler = () =>
		onSubmitHandler(values, { setSubmitting, isSubmitting }, true);

	return (
		<div>
			<div className={globalClasses.accordionRoot}>
				<AccordianLayout title='General Information'>
					<div className={globalClasses.captionContainer}>
						<FormikLabelsSelect
							name='labels'
							label='LABELS'
							placeholder='Select a minimum of 7 labels'
							required
						/>
					</div>

					{/* TODO need to where we are handlign this logic */}
					{/* <p className={globalClasses.mediaError}>
							{isError.selectedLabels
								? `You need to add ${
										7 - form.labels.length
								  } more labels in order to upload media`
								: isError.selectedLabelsDraft
								? 'You need to select atleast 1 label to save as draft'
								: ''}
						</p> */}

					<div className={globalClasses.captionContainer}>
						<FormikField
							label='BANNER TITLE'
							name='banner_title'
							placeholder='Please write you caption here'
							multiline
							maxLength={43}
							maxRows={2}
							required
						/>
					</div>

					<div
						style={{ marginTop: '15px' }}
						className={globalClasses.captionContainer}
					>
						<FormikField
							label='BANNER DESCRIPTION'
							name='banner_description'
							placeholder='Please write you caption here'
							multiline
							maxLength={84}
							minRows={3}
							maxRows={4}
						/>
					</div>
					<div className={globalClasses.postMediaContainer}>
						<div className={globalClasses.postMediaHeader}>
							<h5>Show comments</h5>
							<FormikSwitchField name={'show_comments'} />
						</div>
					</div>
					<div
						className={globalClasses.postMediaContainer}
						style={{ marginBottom: '1rem' }}
					>
						<div className={globalClasses.postMediaHeader}>
							<h5>Show likes</h5>
							<FormikSwitchField name={'show_likes'} />
						</div>
					</div>
				</AccordianLayout>
				<FieldArray
					name='newsSlides'
					render={(props) => (
						<NewsSlideForm {...props} openPreviewer={openPreviewer} />
					)}
				/>
			</div>
			<div className={classes.buttonDiv}>
				{isEdit && (
					<div className={classes.editBtn}>
						<Button
							size='small'
							variant={'outlined'}
							onClick={toggleDeleteModal}
						>
							DELETE VIRAL
						</Button>
					</div>
				)}
				<div className={classes.publishDraftDiv}>
					{(!isEdit || status === 'draft') && (
						<Button
							size='small'
							variant={'outlined'}
							disabled={!dirty}
							onClick={saveDraftHandler}
						>
							{status === 'draft' && isEdit ? 'SAVE DRAFT' : 'SAVE AS DRAFT'}
						</Button>
					)}
					<Button
						type='submit'
						disabled={isPublished ? (!dirty ? isValid : !isValid) : !isValid}
						onClick={handleSubmit}
					>
						{isPublished ? 'SAVE CHANGES' : 'PUBLISH'}
					</Button>
				</div>
			</div>
		</div>
	);
};

NewsInternalForm.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	previewFile: PropTypes.any,
	setDisableDropdown: PropTypes.func.isRequired,
	openPreviewer: PropTypes.func.isRequired,
	onSubmitHandler: PropTypes.func.isRequired,
	toggleDeleteModal: PropTypes.func.isRequired
};

export default NewsInternalForm;
