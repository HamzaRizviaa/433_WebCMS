import React from 'react';
import PropTypes from 'prop-types';
import { useFormStyles } from '../../../forms.style';
import { FieldArray, useFormikContext } from 'formik';
import AccordianLayout from '../../../../layouts/AccordianLayout';
import TabPanes from '../../../../ui/TabPanes';
import PollSummary from './PollSummary';
import QuizSummary from './QuizSummary';
import Button from '../../../../ui/Button';
import QuestionSlideForm from '../QuestionSlideForm';

const headings = ['Poll', 'Quiz'];

const QuestionInternalForm = ({
	isEdit,
	status,
	toggleDeleteModal,
	openPreviewer
}) => {
	const classes = useFormStyles();
	const isPublished = isEdit && status === 'published';

	const { values, setFieldValue } = useFormikContext();

	const handleTabClick = (val) => {
		setFieldValue('general_info.question_type', val.toLowerCase());
	};

	const questionType = values.general_info.question_type;

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
							// disabled={isDraftDisabled}
							// onClick={saveDraftHandler}
						>
							{status === 'draft' && isEdit ? 'SAVE DRAFT' : 'SAVE AS DRAFT'}
						</Button>
					)}
					<Button
						type='submit'
						// disabled={isPublished ? (!dirty ? isValid : !isValid) : !isValid}
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
	toggleDeleteModal: PropTypes.func.isRequired
};
export default QuestionInternalForm;
