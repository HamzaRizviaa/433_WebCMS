import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './elementPreviewers.styles';

const QuestionPoolPreviewer = ({ data }) => {
	// extract url based on data
	const getUrl = () =>
		data?.data?.previewImage?.length > 0
			? data?.data?.previewImage[0]?.media_url
			: data?.data?.uploadedFiles?.length &&
			  data?.data?.uploadedFiles[0].media_url;

	// pass url to the styles
	const classes = useStyles({ questionImgUrl: getUrl() });
	return (
		<div>
			<div className={classes.questionDraggable}>
				<div className={classes.questionDiv}>
					<div className={classes.question}>{data?.data?.question}</div>
					<div className={classes.answer}>
						{data?.data?.answers?.[0]?.answer || ' '}
					</div>
					<div className={classes.answer}>
						{data?.data?.answers?.[1]?.answer || ' '}
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
