import React from 'react';
import PropTypes from 'prop-types';
import { useQuestionsStyles } from '../../index.style';
import { EmptyQuizQuestions } from '../../../../../assets/svg-icons';

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
				<div></div>
			)}
		</div>
	);
};

QuizQuestions.propTypes = {
	data: PropTypes.object.isRequired
};

export default QuizQuestions;
