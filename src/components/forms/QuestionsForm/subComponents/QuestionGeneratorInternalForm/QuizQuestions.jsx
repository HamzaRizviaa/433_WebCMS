import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'formik';
import { useQuestionsStyles } from '../../index.style';
import { EmptyQuizQuestions } from '../../../../../assets/svg-icons';
import QuizQuestionsForm from './QuizQuestionsForm';

const QuizQuestions = ({ data = true }) => {
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
				<FieldArray
					name='questions'
					render={(props) => <QuizQuestionsForm {...props} />}
				/>
			)}
		</div>
	);
};

QuizQuestions.propTypes = {
	data: PropTypes.object.isRequired
};

export default QuizQuestions;
