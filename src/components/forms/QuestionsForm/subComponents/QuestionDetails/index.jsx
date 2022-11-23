import React from 'react';
import PropTypes from 'prop-types';
import ResultSliders from './ResultSliders';
import ParticipantsTable from './ParticipantsTable';

const QuestionDetails = ({ questionId, isArticle }) => (
	<div>
		<ResultSliders questionId={questionId} isArticle={isArticle} />
		<ParticipantsTable questionId={questionId} />
	</div>
);

QuestionDetails.propTypes = {
	questionId: PropTypes.string,
	isArticle: PropTypes.bool
};

export default QuestionDetails;
