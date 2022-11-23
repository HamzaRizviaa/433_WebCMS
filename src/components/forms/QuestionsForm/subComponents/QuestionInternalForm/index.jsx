import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { isEqual, pick, omit } from 'lodash';
import { FieldArray, useFormikContext } from 'formik';

import { useFormStyles } from '../../../forms.style';
import AccordianLayout from '../../../../layouts/AccordianLayout';
import TabPanes from '../../../../ui/TabPanes';
import PollSummary from './PollSummary';
import QuizSummary from './QuizSummary';
import Button from '../../../../ui/Button';
import QuestionSlideForm from '../QuestionSlideForm';
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
	const classes = useFormStyles();
	const isPublished = isEdit && status !== 'draft';
	const isClosed = isEdit && status === 'CLOSED';

	const {
		dirty,
		isValid,
		values,
		setFieldValue,
		setFieldError,
		setSubmitting,
		isSubmitting,
		validateForm,
		resetForm
	} = useFormikContext();

	const questionType = values.general_info.question_type;

	useEffect(() => {
		validateForm();
		return () => {
			resetForm(questionsFormInitialValues);
		};
	}, []);

	const handleTabClick = (val) => {
		resetForm(questionsFormInitialValues);
		setFieldValue('general_info.question_type', val.toLowerCase());
	};

	const handleSaveDraft = () => {
		if (!values.general_info.end_date) {
			setFieldError(
				'general_info.end_date',
				`You need to select end date in order to add ${questionType}`
			);
			return;
		}
		onSubmitHandler(values, { setSubmitting, isSubmitting }, true);
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

		return (
			!dirty ||
			isAnyQuestionSlideEmpty ||
			isEqualToDefaultValues ||
			!values.general_info.end_date
		);
	}, [values, dirty]);

	const defaultSelectedTab = defaultQuestionType === 'quiz' ? 1 : 0;

	return (
		<div>
			<AccordianLayout title='General Information'>
				<div>
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
					{isEdit && status === 'ACTIVE' && (
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
						type='submit'
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
