import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { isEqual, pick, omit } from 'lodash';
import { FieldArray, useFormikContext } from 'formik';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AccordianLayout from '../../../../layouts/AccordianLayout';
import TabPanes from '../../../../ui/TabPanes';
import PollSummary from './PollSummary';
import QuizSummary from './QuizSummary';
import Button from '../../../../ui/Button';
import QuestionSlideForm from '../QuestionSlideForm';
import PublishAndStopModal from '../PublishAndStopModal';
import { QuestionsLibraryService } from '../../../../../data/services';
import { useFormStyles } from '../../../forms.style';
import { selectTriviaFeatureFlag } from '../../../../../data/selectors';
import {
	areAllFieldsEmpty,
	questionsFormInitialValues
} from '../../../../../data/helpers';

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

	// States
	const [openPublishModal, setPublishModalState] = useState(false);
	const [activeQuestionTitle, setActiveQuestionTitle] = useState('');

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

	useEffect(() => {
		validateForm();
		return () => {
			resetForm({ values: questionsFormInitialValues });
		};
	}, []);

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
		const editFormInitValues = {
			...questionsFormInitialValues,
			general_info: {
				...questionsFormInitialValues.general_info,
				question_type: val.toLowerCase()
			},
			question_id: values.question_id
		};

		resetForm({ values: editFormInitValues });
	};

	const handleSaveDraft = () => {
		onSubmitHandler(values, { setSubmitting, isSubmitting }, true);
	};

	const handlePublishBtnClick = async () => {
		if (!isPublished) {
			try {
				setSubmitting(true);
				const res = await QuestionsLibraryService.shouldRestrictUpload(
					questionType
				);

				if (res?.data?.can_upload) {
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
			pick(values, Object.keys(questionsFormInitialValues)),
			questionsFormInitialValues
		);

		return !dirty || isAnyQuestionSlideEmpty || isEqualToDefaultValues;
	}, [values, dirty]);

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
						<Button
							size='small'
							variant='outlined'
							disabled={isDraftDisabled}
							onClick={handleSaveDraft}
						>
							{status === 'draft' && isEdit ? 'SAVE DRAFT' : 'SAVE AS DRAFT'}
						</Button>
					)}
					<Button
						onClick={handlePublishBtnClick}
						type={isPublished ? 'submit' : 'button'}
						disabled={isPublished ? (!dirty ? isValid : !isValid) : !isValid}
					>
						{isPublished ? 'SAVE CHANGES' : `ADD ${questionType}`}
					</Button>
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
