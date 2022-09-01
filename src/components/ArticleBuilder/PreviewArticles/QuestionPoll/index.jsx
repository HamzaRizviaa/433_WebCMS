import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from '../index.style';

const QuestionPoll = ({ data }) => {
	const classes = useStyles();

	console.log('data Questions', data);

	return (
		<div>
			<div
				className={classes.questionDraggable}
				style={{
					backgroundImage: `url(${
						data?.data?.previewImage?.length > 0
							? data?.data?.previewImage[0]?.media_url
							: data?.data?.uploadedFiles?.length &&
							  data?.data?.uploadedFiles[0].media_url
					})`
				}}
			>
				<div className={classes.questionDiv}>
					<div className={classes.question}>{data?.data?.question}</div>
					<div className={classes.answer}>
						{data.data?.answers ? data?.data?.answers[0]?.answer : ' '}
					</div>
					<div className={classes.answer}>
						{data?.data?.answers ? data?.data?.answers[1]?.answer : ' '}
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuestionPoll;
QuestionPoll.propTypes = {
	data: PropTypes.array.isRequired,
	itemIndex: PropTypes.number
};
