import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { pick, isEqual, xor } from 'lodash';
import { useFormikContext } from 'formik';
import { useFormStyles } from '../../forms.style';

import { InfoIcon } from '../../../../assets/svg-icons';
import { selectSpecificViral } from '../../../../data/selectors';
import { viralFormInitialValues } from '../../../../data/helpers';

import FormikField from '../../../ui/inputs/formik/FormikField';
import FormikDropzone from '../../../ui/inputs/formik/FormikDropzone';
import FormikLabelsSelect from '../../../ui/inputs/formik/FormikLabelsSelect';
import FormikSwitchField from '../../../ui/inputs/formik/FormikSwitchField';
import TextTooltip from '../../../ui/TextTooltip';
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
	const classes = useFormStyles();
	const specificViral = useSelector(selectSpecificViral);

	const {
		values,
		dirty,
		isValid,
		isSubmitting,
		handleSubmit,
		setFieldValue,
		setSubmitting,
		validateForm,
		resetForm
	} = useFormikContext();

	useEffect(() => {
		validateForm();
		return () => {
			resetForm(viralFormInitialValues);
		};
	}, []);

	const isPublished = isEdit && status === 'published';

	const isDraftDisabled = useMemo(() => {
		const isEqualToDefaultValues = isEqual(
			pick(values, Object.keys(viralFormInitialValues)),
			viralFormInitialValues
		);

		const doLabelsContainSameElements =
			specificViral?.labels?.length === values.labels.length &&
			xor(
				specificViral?.labels,
				values.labels.map((item) => item.name)
			).length === 0;

		const isDisabledOnUpload = !dirty || isEqualToDefaultValues;
		
		return isEdit
			? isDisabledOnUpload && doLabelsContainSameElements
			: isDisabledOnUpload;
	}, [dirty, values, specificViral, isEdit]);

	const saveDraftHandler = () =>
		onSubmitHandler(values, { setSubmitting, isSubmitting }, true);

	return (
		<div>
			<div>
				<div className={classes.explanationWrapper}>
					<h5>
						{isEdit ? 'Media File' : 'Add Media File'}
						<span style={{ color: '#ff355a' }}>{'*'}</span>
					</h5>
					<TextTooltip
						title='Default encoding for videos should be H.264'
						placement='bottom-start'
					>
						<InfoIcon className={classes.infoIcon} />
					</TextTooltip>
				</div>
				<div className={classes.fieldWrapper}>
					<FormikDropzone
						name='uploadedFiles'
						accept='image/jpeg, image/png, video/mp4'
						formatMessage='Supported formats are jpeg, png and mp4'
						maxFiles={1}
						showPreview
						required
						onPreview={openPreviewer}
						onDelete={() => setFieldValue('uploadedFiles', [])}
					/>
				</div>
				<div className={classes.fieldContainer}>
					<FormikField
						label='DROPBOX URL'
						name='dropbox_url'
						placeholder='Please drop the dropbox URL here'
						multiline
						maxRows={2}
					/>
				</div>
				<div className={classes.fieldContainer}>
					<FormikLabelsSelect
						label='LABELS'
						name='labels'
						placeholder={'Select a minimum of 7 labels'}
						disabled={isPublished}
						required
					/>
				</div>
				<div className={classes.fieldContainer}>
					<FormikField
						label='CAPTION'
						name='caption'
						placeholder='Please write your caption here'
						multiline
						maxRows={4}
						required
					/>
				</div>
				<div className={classes.fieldContainer}>
					<div className={classes.switchContainer}>
						<FormikSwitchField name='show_comments' label='Show comments' />
						<FormikSwitchField name='show_likes' label='Show likes' />
					</div>
				</div>
			</div>
			<div className={classes.buttonDiv}>
				<div>
					{isEdit && (
						<Button
							size='small'
							variant={'outlined'}
							onClick={toggleDeleteModal}
						>
							DELETE VIRAL
						</Button>
					)}
				</div>
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
