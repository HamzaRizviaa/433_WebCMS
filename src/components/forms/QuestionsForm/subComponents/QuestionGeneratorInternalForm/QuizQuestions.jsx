import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { useQuestionsStyles } from '../../index.style';
import { EmptyQuizQuestions } from '../../../../../assets/svg-icons';
import QuizQuestionsForm from './QuizQuestionsForm';
import Button from '../../../../ui/Button';
import { isEqual, omit, pick } from 'lodash';
import {
	areAllFieldsEmpty,
	questionsFormInitialValues
} from '../../../../../data/helpers';

const QuizQuestions = ({ onDraftClick }) => {
	const classes = useQuestionsStyles();
	const { values, dirty } = useFormikContext();

	const isDraftDisabled = useMemo(() => {
		const isAnyQuestionSlideEmpty = values.questions.some((item) =>
			areAllFieldsEmpty(omit(item, ['answers']))
		);

		const isEqualToDefaultValues = isEqual(
			pick(values, Object.keys(questionsFormInitialValues([], true))),
			questionsFormInitialValues([], true)
		);

		return !dirty || isAnyQuestionSlideEmpty || isEqualToDefaultValues;
	}, [values, dirty]);

	return (
		<div>
			<h2 className={classes.quizTitle}>Quiz</h2>

			{!values.questions.length ? (
				<div className={classes.emptyQuizInfoPage}>
					<EmptyQuizQuestions />
					<p className={classes.emptyQuizInfoText}>
						Please complete the information on the left before generating the
						questions.
					</p>
				</div>
			) : (
				<>
					{values.questions.map((_, index) => (
						<QuizQuestionsForm key={index} index={index} />
					))}
					<Button
						fullWidth
						size='large'
						disabled={isDraftDisabled}
						variant='outlined'
						onClick={onDraftClick}
						className={classes.quizQuestionsDraftButtonWrapper}
					>
						SAVE AS A DRAFT
					</Button>
				</>
			)}
		</div>
	);
};

QuizQuestions.propTypes = {
	data: PropTypes.object.isRequired,
	onDraftClick: PropTypes.func.isRequired
};

export default QuizQuestions;
