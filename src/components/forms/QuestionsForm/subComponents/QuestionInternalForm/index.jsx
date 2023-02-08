import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { isEqual, pick, omit } from 'lodash';
import { FieldArray, useFormikContext } from 'formik';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { IconButton } from '@material-ui/core';

import AccordianLayout from '../../../../layouts/AccordianLayout';
import TabPanes from '../../../../ui/TabPanes';
import PollSummary from './PollSummary';
import QuizSummary from './QuizSummary';
import Button from '../../../../ui/Button';
import QuestionSlideForm from '../QuestionSlideForm';
import PublishAndStopModal from '../PublishAndStopModal';
import { QuestionsLibraryService } from '../../../../../data/services';
import { useFormStyles } from '../../../forms.style';
import {
	getGeoblockingQuestionsFeatureFlag,
	getRules,
	selectSpecificQuestion,
	selectTriviaFeatureFlag
} from '../../../../../data/selectors';
import AdvancedSettingsForm from '../../../common/AdvancedSettingsForm';
import {
	areAllFieldsEmpty,
	questionsFormInitialValues
} from '../../../../../data/helpers';
import SchedulerPopup from '../../../../common/SchedulerPopup';
import { Calendar, Edit } from '../../../../../assets/svg-icons';

const headings = ['Poll', 'Quiz'];

const QuestionInternalForm = ({
	isEdit,
	status,
	toggleDeleteModal,
	toggleStopModal,
	openPreviewer,
	onSubmitHandler,
	defaultQuestionType
}) => {
	// Feature flag for TRIVIA
	const triviaOnQuestions = useSelector(selectTriviaFeatureFlag);
	const isTriviaEnabled = triviaOnQuestions?._value === 'true';

	const geoblockingRestrictionsQuestions = useSelector(
		getGeoblockingQuestionsFeatureFlag
	);
	const isGeoblockingEnabled =
		geoblockingRestrictionsQuestions?._value === 'true';

	const { rules } = useSelector(getRules);

	// States
	const [openPublishModal, setPublishModalState] = useState(false);
	const [activeQuestionTitle, setActiveQuestionTitle] = useState('');

	const [schedularModalState, setSchedulerModalState] = useState(false);

	const closeSchedulerModal = () => setSchedulerModalState(false);
	const openSchedulerModal = () => setSchedulerModalState(true);
	//
	const {
		dirty,
		isValid,
		values,
		setFieldValue,
		setSubmitting,
		isSubmitting,
		validateForm,
		resetForm,
		submitForm
	} = useFormikContext();

	const isPublished = isEdit && status !== 'draft';
	const isClosed = isEdit && status === 'CLOSED';
	const questionType = values.general_info.question_type;
	const defaultSelectedTab = defaultQuestionType === 'quiz' ? 1 : 0;

	const specificQuestion = useSelector(selectSpecificQuestion);

	useEffect(() => {
		validateForm();
	}, [values.general_info.question_type]);

	const handleClosePublishModal = () => {
		setPublishModalState(false);
		setActiveQuestionTitle('');
		setFieldValue('active_question_id', null);
		setFieldValue('active_question_end_date', null);
		setFieldValue('transition_to', null);
	};

	const handleTabClick = (val) => {
		const initialValues = questionsFormInitialValues(rules);
		const editFormInitValues = {
			...initialValues,
			general_info: {
				...initialValues.general_info,
				question_type: val.toLowerCase()
			},
			question_id: values.question_id
		};

		resetForm({ values: editFormInitValues });
	};

	const handlePublishBtnClick = async () => {
		if (!isPublished) {
			try {
				setSubmitting(true);
				const res = await QuestionsLibraryService.shouldRestrictUpload(
					questionType
				);

				if (res?.data?.can_upload) {
					handlePublishClick();
					submitForm();
				} else {
					setSubmitting(false);
					setFieldValue('active_question_id', res?.data?.id);
					setFieldValue('active_question_end_date', new Date().toISOString());
					setActiveQuestionTitle(res?.data?.title);
					setPublishModalState(true);
				}
			} catch (err) {
				console.error(err);
				setSubmitting(false);
			}
		}
	};

	const handleConfirm = (val) => {
		setFieldValue('transition_to', val);
		handlePublishClick();
		submitForm();
		setPublishModalState(false);
	};

	const isDraftDisabled = useMemo(() => {
		const isAnyQuestionSlideEmpty = values.questions.some(
			(item) =>
				areAllFieldsEmpty(omit(item, ['answers'])) &&
				item.answers.every((ans) => !ans.answer)
		);

		const isEqualToDefaultValues = isEqual(
			pick(values, Object.keys(questionsFormInitialValues(rules))),
			questionsFormInitialValues(rules)
		);

		return !dirty || isAnyQuestionSlideEmpty || isEqualToDefaultValues;
	}, [values, dirty]);

	/**
	 * Methods for scheduling Questions
	 */
	const handleScheduleConfirm = (values) => {
		closeSchedulerModal();

		const { date, hour, min } = values.startStamp;

		const selectedDate = dayjs(date).format('YYYY-MM-DD');
		const selectedTime = `${hour}:${min.length === 1 ? '0' : ''}${min}`;
		const selectedDateTime = `${selectedDate}T${selectedTime}`;

		setFieldValue(
			'general_info.start_date',
			new Date(selectedDateTime).toISOString()
		);
		// end stamp
		const { date: endDate, hour: endHour, min: endMin } = values.endStamp;

		const endSelectedDate = dayjs(endDate).format('YYYY-MM-DD');
		const endSelectedTime = `${endHour}:${
			endMin.length === 1 ? '0' : ''
		}${endMin}`;
		const endSelectedDateTime = `${endSelectedDate}T${endSelectedTime}`;

		setFieldValue(
			'general_info.end_date',
			new Date(endSelectedDateTime).toISOString()
		);

		setFieldValue('general_info.save_draft', true);
		submitForm();
	};

	const handleRemoveSchedule = () => {
		setFieldValue('general_info.start_date', undefined);
		setFieldValue('general_info.end_date', undefined);
		setFieldValue('general_info.save_draft', true);
		submitForm();
	};

	const handleDraftClick = () => {
		setFieldValue('general_info.save_draft', true);
		onSubmitHandler(values, { setSubmitting, isSubmitting });
	};

	const handlePublishClick = () => {
		setFieldValue('general_info.save_draft', false);
		setFieldValue('general_info.start_date', undefined);
		setFieldValue('general_info.end_date', undefined);
	};

	const handleSaveChangesClick = () => {
		setFieldValue('general_info.save_draft', true);
	};
	/**
	 * **********************************
	 */
	const classes = useFormStyles();

	const actionInfo = (
		<p>
			You are about to publish a new {questionType} on the homepage while{' '}
			<Link
				className={classes.link}
				to={`/question-library?q=${values.active_question_id}`}
				target='_blank'
			>
				<b>“{activeQuestionTitle}”</b>
			</Link>{' '}
			is currently the {questionType} active.{' '}
			{isTriviaEnabled
				? `Where do you want to move this ${questionType}?`
				: `You have to stop this ${questionType} before publishing the new one.`}
		</p>
	);

	return (
		<div>
			<SchedulerPopup
				selectsRange
				open={schedularModalState}
				onClose={closeSchedulerModal}
				onConfirm={handleScheduleConfirm}
				onRemove={handleRemoveSchedule}
				initialStartDate={values.is_scheduled && specificQuestion?.start_date}
				initialEndDate={values.is_scheduled && specificQuestion?.end_date}
				isScheduled={values.is_scheduled}
				isSubmitting={isSubmitting}
			/>
			{values.is_scheduled && (
				<div className={classes.scheduledTime}>
					<h2>
						<span className={classes.scheduleTimeLabel}>Scheduled Time:</span>
						{dayjs(values.general_info.start_date).format('DD-MM-YYYY, HH:mm')}
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
			<AccordianLayout title='General Information'>
				<div>
					<PublishAndStopModal
						open={openPublishModal}
						isSubmitting={isSubmitting}
						onClose={handleClosePublishModal}
						questionType={questionType}
						actionInfo={actionInfo}
						onConfirm={handleConfirm}
						isTriviaEnabled={isTriviaEnabled}
					/>
					<TabPanes
						headings={headings}
						onClick={handleTabClick}
						type='questions'
						defaultValue={defaultSelectedTab}
						hideTabsHead={isPublished}
					>
						<TabPanes.TabPanel value={0}>
							<PollSummary
								openPreviewer={openPreviewer}
								isPublished={isPublished}
								isClosed={isClosed}
							/>
						</TabPanes.TabPanel>
						<TabPanes.TabPanel value={1}>
							<QuizSummary
								openPreviewer={openPreviewer}
								isPublished={isPublished}
								isClosed={isClosed}
							/>
						</TabPanes.TabPanel>
					</TabPanes>
				</div>
			</AccordianLayout>

			{isGeoblockingEnabled ? (
				<AdvancedSettingsForm
					featureFlagLibrary='geoblockingRestrictionsQuestions'
					isQuestions={true}
					questionsClosed={isClosed}
				/>
			) : (
				<></>
			)}

			<FieldArray
				name='questions'
				render={(props) => (
					<QuestionSlideForm
						{...props}
						openPreviewer={openPreviewer}
						status={status}
						isEdit={isEdit}
					/>
				)}
			/>
			<div className={classes.buttonDiv}>
				<div className={classes.leftButtonSection}>
					{isEdit && (
						<Button size='small' variant='outlined' onClick={toggleDeleteModal}>
							DELETE {questionType}
						</Button>
					)}
					{isEdit && (status === 'ACTIVE' || status === 'TRIVIA') && (
						<>
							<div className={classes.stopBtn}>
								<Button
									size='small'
									variant='outlined'
									onClick={toggleStopModal}
									color='danger'
								>
									{`STOP ${questionType}`}
								</Button>
							</div>
						</>
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
						onClick={handlePublishBtnClick}
						type={isPublished ? 'submit' : 'button'}
						disabled={isPublished ? (!dirty ? isValid : !isValid) : !isValid}
					>
						{isPublished ? 'SAVE CHANGES' : `ADD ${questionType}`}
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

QuestionInternalForm.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string.isRequired,
	openPreviewer: PropTypes.func.isRequired,
	onSubmitHandler: PropTypes.func.isRequired,
	toggleDeleteModal: PropTypes.func.isRequired,
	toggleStopModal: PropTypes.func.isRequired,
	defaultQuestionType: PropTypes.string.isRequired
};

export default QuestionInternalForm;
