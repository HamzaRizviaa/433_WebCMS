import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'formik';
import { useQuestionsStyles } from '../../index.style';
import { EmptyQuizQuestions } from '../../../../../assets/svg-icons';
import QuizQuestionsForm from './QuizQuestionsForm';
import Button from '../../../../ui/Button';

const QuizQuestions = ({ data = true, onDraftClick }) => {
	const classes = useQuestionsStyles();

	return (
		<div>
			<h2 className={classes.quizTitle}>Quiz</h2>

			{!data ? (
				<div className={classes.emptyQuizInfoPage}>
					<EmptyQuizQuestions />
					<p className={classes.emptyQuizInfoText}>
						Please complete the information on the left before generating the
						questions.
					</p>
				</div>
			) : (
				<>
					{new Array(3).fill(0).map((item, index) => (
						<FieldArray
							key={item}
							name='questions'
							render={(props) => <QuizQuestionsForm {...props} index={index} />}
						/>
					))}
					<Button
						fullWidth
						size='large'
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
