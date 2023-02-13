import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { FieldArray, useFormikContext } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual, pick } from 'lodash';

import FormikField from '../../../ui/inputs/formik/FormikField';
import FormikLabelsSelect from '../../../ui/inputs/formik/FormikLabelsSelect';
import Button from '../../../ui/Button';
import NewsSlideForm from './NewsSlideForm';
import AccordianLayout from '../../../layouts/AccordianLayout';
import AdvancedSettingsForm from '../../common/AdvancedSettingsForm';
import SchedulerPopup from '../../../common/SchedulerPopup';
import { Calendar } from '../../../../assets/svg-icons';
import useSchedulerHandlers from '../../../../hooks/useSchedulerHandlers';
import { getRules, selectSpecificNews } from '../../../../data/selectors';
import { resetSpecificNews } from '../../../../data/features/newsLibrary/newsLibrarySlice';
import {
	areAllFieldsEmpty,
	newsFormInitialValues
} from '../../../../data/helpers';
import { useFormStyles } from '../../forms.style';
import ScheduledInfoBox from '../../common/ScheduledInfoBox';

const NewsInternalForm = ({
	isEdit,
	status,
	onSubmitHandler,
	toggleDeleteModal,
	openPreviewer
}) => {
	const classes = useFormStyles();
	const dispatch = useDispatch();
	const isPublished = isEdit && status === 'published';
	const { rules } = useSelector(getRules);

	// scheduler states
	const [schedularModalState, setSchedulerModalState] = useState(false);
	const specificNews = useSelector(selectSpecificNews);

	// scheduler methods
	const closeSchedulerModal = () => setSchedulerModalState(false);
	const openSchedulerModal = () => setSchedulerModalState(true);

	/// Scheduler hook
	const {
		handleDraftClick,
		handlePublishClick,
		handleRemoveSchedule,
		handleSaveChangesClick,
		handleScheduleConfirm
	} = useSchedulerHandlers({ onSubmitHandler, closeSchedulerModal });

	// formik hook
	const { values, dirty, isValid, isSubmitting, resetForm, validateForm } =
		useFormikContext();

	useEffect(() => {
		validateForm();
		return () => {
			resetForm(newsFormInitialValues(rules));
			// reset specific news dispatch
			dispatch(resetSpecificNews());
		};
	}, []);

	const isDraftDisabled = useMemo(() => {
		const isAnyNewsSlideEmpty = values.slides.some((item) =>
			areAllFieldsEmpty(item)
		);
		const isEqualToDefaultValues = isEqual(
			pick(values, Object.keys(newsFormInitialValues(rules))),
			newsFormInitialValues(rules)
		);

		return !dirty || isAnyNewsSlideEmpty || isEqualToDefaultValues;
	}, [values, dirty]);

	const initialScheduleDate = specificNews?.is_scheduled
		? specificNews?.schedule_date
		: '';

	return (
		<div>
			<SchedulerPopup
				open={schedularModalState}
				onClose={closeSchedulerModal}
				onConfirm={handleScheduleConfirm}
				onRemove={handleRemoveSchedule}
				initialStartDate={initialScheduleDate}
				isScheduled={values.is_scheduled}
				isSubmitting={isSubmitting}
			/>
			{values.is_scheduled && (
				<ScheduledInfoBox
					scheduleDate={values.schedule_date}
					openSchedulerModal={openSchedulerModal}
					isValid={isValid}
				/>
			)}
			<AccordianLayout title='General Information'>
				<div>
					<FormikLabelsSelect
						name='labels'
						label='LABELS'
						placeholder='Select a minimum of 4 labels'
						disabled={isPublished}
						required
						library='News'
					/>
				</div>
				<div className={classes.fieldContainer}>
					<FormikField
						label='BANNER TITLE'
						name='banner_title'
						placeholder='Please write your banner title here'
						multiline
						maxLength={43}
						maxRows={2}
						required
					/>
				</div>
				<div className={classes.fieldContainer}>
					<FormikField
						label='BANNER DESCRIPTION'
						name='banner_description'
						placeholder='Please write your banner description here'
						multiline
						maxLength={84}
						minRows={3}
						maxRows={4}
						required
					/>
				</div>
			</AccordianLayout>

			<AdvancedSettingsForm featureFlagLibrary='geoblockingRestrictionsNews' />

			<FieldArray
				name='slides'
				render={(props) => (
					<NewsSlideForm {...props} openPreviewer={openPreviewer} />
				)}
			/>
			<div className={classes.buttonDiv}>
				<div>
					{isEdit && (
						<Button size='small' variant='outlined' onClick={toggleDeleteModal}>
							DELETE NEWS
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
						onClick={handlePublishClick}
						type='submit'
						disabled={isPublished ? (!dirty ? isValid : !isValid) : !isValid}
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

NewsInternalForm.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	previewFile: PropTypes.any,
	openPreviewer: PropTypes.func.isRequired,
	onSubmitHandler: PropTypes.func.isRequired,
	toggleDeleteModal: PropTypes.func.isRequired
};

export default NewsInternalForm;
