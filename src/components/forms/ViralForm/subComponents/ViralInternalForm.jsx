import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { pick, isEqual } from 'lodash';
import { useFormikContext } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { IconButton } from '@material-ui/core';

import { InfoIcon, Calendar, Edit } from '../../../../assets/svg-icons';
import FormikField from '../../../ui/inputs/formik/FormikField';
import FormikDropzone from '../../../ui/inputs/formik/FormikDropzone';
import FormikLabelsSelect from '../../../ui/inputs/formik/FormikLabelsSelect';
import TextTooltip from '../../../ui/TextTooltip';
import Button from '../../../ui/Button';
import AdvancedSettingsForm from '../../common/AdvancedSettingsForm';
import SchedulerPopup from '../../../common/SchedulerPopup';
import { getRules, selectSpecificViral } from '../../../../data/selectors';
import { resetSpecificViral } from '../../../../data/features/viralLibrary/viralLibrarySlice';
import { viralFormInitialValues } from '../../../../data/helpers';
import { useFormStyles } from '../../forms.style';
import useSchedulerHandlers from '../../../../hooks/useSchedulerHandlers';

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
	const dispatch = useDispatch();
	const [schedularModalState, setSchedulerModalState] = useState(false);

	const closeSchedulerModal = () => setSchedulerModalState(false);
	const openSchedulerModal = () => setSchedulerModalState(true);

	const {
		values,
		dirty,
		isValid,
		setFieldValue,
		validateForm,
		isSubmitting,
		resetForm
	} = useFormikContext();

	const specificViral = useSelector(selectSpecificViral);

	useEffect(() => {
		validateForm();
		return () => {
			resetForm(viralFormInitialValues);
			dispatch(resetSpecificViral());
		};
	}, []);

	const isPublished = isEdit && status === 'published';
	const { rules } = useSelector(getRules);

	const isDraftDisabled = useMemo(() => {
		const isEqualToDefaultValues = isEqual(
			pick(values, Object.keys(viralFormInitialValues(rules))),
			viralFormInitialValues(rules)
		);
		return !dirty || isEqualToDefaultValues;
	}, [dirty, values]);

	const {
		handleDraftClick,
		handlePublishClick,
		handleRemoveSchedule,
		handleSaveChangesClick,
		handleScheduleConfirm
	} = useSchedulerHandlers({ onSubmitHandler, closeSchedulerModal });

	const classes = useFormStyles();

	return (
		<div>
			<SchedulerPopup
				open={schedularModalState}
				onClose={closeSchedulerModal}
				onConfirm={handleScheduleConfirm}
				onRemove={handleRemoveSchedule}
				initialStartDate={values.is_scheduled && specificViral?.schedule_date}
				isScheduled={values.is_scheduled}
				isSubmitting={isSubmitting}
			/>
			<div>
				{values.is_scheduled && (
					<div className={classes.scheduledTime}>
						<h2>
							<span className={classes.scheduleTimeLabel}>Scheduled Time:</span>
							{dayjs(values.schedule_date).format('DD-MM-YYYY, HH:mm')}
						</h2>
						<IconButton onClick={openSchedulerModal} disabled={!isValid}>
							<Edit
								className={`${classes.editScheduleIcon} ${
									!isValid ? classes.disabledIcon : ''
								}`}
							/>
						</IconButton>
					</div>
				)}
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
						placeholder={'Select a minimum of 4 labels'}
						disabled={isPublished}
						required
						library='Viral'
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
				<AdvancedSettingsForm featureFlagLibrary='geoblockingRestrictionsVirals' />
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
						<>
							{values.is_scheduled ? (
								<Button
									size='small'
									variant='outlined'
									type='submit'
									disabled={isValid ? !dirty : !isValid}
									onClick={handleSaveChangesClick}
								>
									SAVE CHANGES
								</Button>
							) : (
								<Button
									size='small'
									variant='outlined'
									disabled={isDraftDisabled}
									onClick={handleDraftClick}
								>
									{status === 'draft' && isEdit
										? 'SAVE DRAFT'
										: 'SAVE AS DRAFT'}
								</Button>
							)}
						</>
					)}
					<Button
						type='submit'
						disabled={isPublished ? (!dirty ? isValid : !isValid) : !isValid}
						onClick={handlePublishClick}
					>
						{isPublished ? 'SAVE CHANGES' : 'PUBLISH'}
					</Button>
					{!isPublished && !values.is_scheduled && (
						<Button
							disabled={values.is_scheduled || isPublished ? true : !isValid}
							onClick={openSchedulerModal}
							iconBtn
						>
							<Calendar />
						</Button>
					)}
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
