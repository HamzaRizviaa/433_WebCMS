import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from '../index.style';

const QuestionPoll = ({ data, isEdit }) => {
	console.log(data, isEdit);
	const classes = useStyles();

	return (
		<div>
			<div
				className={classes.questionDraggable}
				style={{
					backgroundImage: `https://icdn.football-espana.net/wp-content/uploads/2022/05/Kylian-Mbappe-4.jpeg`
				}}
			>
				<div className={classes.questionDiv}>
					<div className={classes.question}>This is a Question</div>
					<div className={classes.answer}>Answer 1</div>
					<div className={classes.answer}>Answer 2 </div>
				</div>
			</div>
		</div>
	);
};

export default QuestionPoll;
QuestionPoll.propTypes = {
	data: PropTypes.array.isRequired,
	isEdit: PropTypes.bool.isRequired
};
