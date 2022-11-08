import React from 'react';
import PropTypes from 'prop-types';
import { pick, isEqual } from 'lodash';
import { useFormikContext } from 'formik';
import { useStyles } from '../index.styles';
import { useStyles as globalUseStyles } from '../../../../styles/global.style';

import { Tooltip, Fade } from '@mui/material';
import { ReactComponent as Info } from '../../../../assets/InfoButton.svg';
import { viralFormInitialValues } from '../../../../data/helpers';

import FormikField from '../../../ui/inputs/formik/FormikField';
import FormikDropzone from '../../../ui/inputs/formik/FormikDropzone';
import FormikLabelsSelect from '../../../ui/inputs/formik/FormikLabelsSelect';
import FormikSwitchField from '../../../ui/inputs/formik/FormikSwitchField';
import Button from '../../../ui/Button';

/**
 * ViralInternalForm Component is used as a child of the ViralForm and the link to that is given below.
 * ViralInternalForm serves the purpose of wrapping up all the form fields and buttons inside it.
 * @component
 * @see {@link http://127.0.0.1:5500/docs/ViralForm.html|ViralForm}
 */
const ViralInternalForm = ({
	isEdit,
	status,
	openPreviewer,
	onSubmitHandler,
	toggleDeleteModal
}) => {
	const classes = useStyles();
	const globalClasses = globalUseStyles();
	const {
		values,
		dirty,
		isValid,
		isSubmitting,
		handleSubmit,
		setFieldValue,
		setSubmitting
	} = useFormikContext();

	const isPublished = isEdit && status === 'published';

	const isDraftDisabled =
		!dirty ||
		isEqual(
			pick(values, Object.keys(viralFormInitialValues)),
			viralFormInitialValues
		);

	const saveDraftHandler = () =>
		onSubmitHandler(values, { setSubmitting, isSubmitting }, true);

	return (
		<div>
			<div>
				<div className={globalClasses.explanationWrapper}>
					<h5>
						{isEdit ? 'Media File' : 'Add Media File'}
						<span style={{ color: '#ff355a' }}>{'*'}</span>
					</h5>
					<Tooltip
						TransitionComponent={Fade}
						TransitionProps={{ timeout: 800 }}
						title='Default encoding for videos should be H.264'
						arrow
						componentsProps={{
							tooltip: { className: globalClasses.toolTip },
							arrow: { className: globalClasses.toolTipArrow }
						}}
						placement='bottom-start'
					>
						<Info style={{ cursor: 'pointer', marginLeft: '1rem' }} />
					</Tooltip>
				</div>
				<div className={classes.fieldWrapper}>
					<FormikDropzone
						name='uploadedFiles'
						accept='image/jpeg, image/png, video/mp4'
						formatMessage='Supported formats are jpeg, png and mp4'
						maxFiles={3}
						showPreview
						required
						onPreview={openPreviewer}
						onDelete={() => setFieldValue('uploadedFiles', [])}
					/>
				</div>
				<div className={globalClasses.dropBoxUrlContainer}>
					<FormikField
						label='DROPBOX URL'
						name='dropbox_url'
						placeholder='Please drop the dropbox URL here'
						multiline
						maxRows={2}
					/>
				</div>
				<FormikLabelsSelect
					label='LABELS'
					name='labels'
					placeholder={
						values && !values.labels.length
							? 'Select a minimum of 7 labels'
							: ''
					}
					disabled={isPublished}
					required
				/>
				<FormikField
					label='CAPTION'
					name='caption'
					placeholder='Please write your caption here'
					multiline
					maxRows={4}
					required
				/>
				<div className={classes.postMediaContainer}>
					<FormikSwitchField name='show_comments' label='Show comments' />
					<FormikSwitchField name='show_likes' label='Show likes' />
				</div>
			</div>
			<div className={classes.buttonDiv}>
				{isEdit && (
					<div className={classes.deleteBtnWrapper}>
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
							disabled={isDraftDisabled}
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

ViralInternalForm.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	previewFile: PropTypes.any,
	setDisableDropdown: PropTypes.func.isRequired,
	openPreviewer: PropTypes.func.isRequired,
	onSubmitHandler: PropTypes.func.isRequired,
	toggleDeleteModal: PropTypes.func.isRequired
};

export default ViralInternalForm;
