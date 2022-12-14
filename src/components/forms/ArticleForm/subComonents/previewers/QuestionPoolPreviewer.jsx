import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './elementPreviewers.styles';

const QuestionPoolPreviewer = ({ data }) => {
	//extracted question data
	const { question_data } = data;
	const { uploadedFiles: media } = question_data;
	
	// extract url based on data
	const getUrl = () => media?.[0]?.media_url;

	// pass url to the styles
	const classes = useStyles({ questionImgUrl: getUrl() });
	return (
		<div>
			<div className={classes.questionDraggable}>
				<div className={classes.questionDiv}>
					<div className={classes.question}>{question_data?.question}</div>
					<div className={classes.answer}>
						{question_data?.answers?.[0]?.answer || ' '}
					</div>
					<div className={classes.answer}>
						{question_data?.answers?.[1]?.answer || ' '}
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuestionPoolPreviewer;
QuestionPoolPreviewer.propTypes = {
	data: PropTypes.array.isRequired,
	itemIndex: PropTypes.number
};
