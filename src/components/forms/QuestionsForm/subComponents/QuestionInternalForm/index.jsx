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
	openPreviewer,
	onSubmitHandler
}) => {
	const classes = useFormStyles();
	const isPublished = isEdit && status !== 'draft';

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
				areAllFieldsEmpty(omit(item, ['pollAnswers', 'quizAnswers'])) &&
				item.pollAnswers.every((pollAns) => !pollAns.answer) &&
				item.quizAnswers.every((quizAns) => !quizAns.answer)
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

	return (
		<div>
			<AccordianLayout title='General Information'>
				<div>
					<TabPanes
						headings={headings}
						onClick={handleTabClick}
						type='questions'
					>
						<TabPanes.TabPanel value={0}>
							<PollSummary openPreviewer={openPreviewer} />
						</TabPanes.TabPanel>
						<TabPanes.TabPanel value={1}>
							<QuizSummary openPreviewer={openPreviewer} />
						</TabPanes.TabPanel>
					</TabPanes>
				</div>
			</AccordianLayout>
			<FieldArray
				name='questions'
				render={(props) => (
					<QuestionSlideForm {...props} openPreviewer={openPreviewer} />
				)}
			/>
			<div className={classes.buttonDiv}>
				<div>
					{isEdit && (
						<Button size='small' variant='outlined' onClick={toggleDeleteModal}>
							DELETE {questionType}
						</Button>
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
	toggleDeleteModal: PropTypes.func.isRequired
};
export default QuestionInternalForm;
