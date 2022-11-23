import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton } from '@material-ui/lab';
import { useQuestionsStyles } from '../../index.style';

const ResultSlidersSkeleton = ({ isArticle }) => {
	const classes = useQuestionsStyles();

	return (
		<>
			{isArticle && (
				<div className={classes.articlesQuizDetails}>
					<div className={classes.skeletonWrapper}>
						<Skeleton variant='rect' animation='wave' height={50} />
					</div>
				</div>
			)}
			<div className={classes.QuizQuestion}>
				<div className={classes.skeletonWrapper} style={{ width: '70%' }}>
					<Skeleton variant='text' animation='wave' height={30} />
				</div>
			</div>
			<div className={classes.QuizDetailsProgressBars}>
				<div className={classes.skeletonWrapper}>
					<Skeleton variant='rect' animation='wave' height={54} />
				</div>
			</div>
			<div className={classes.QuizDetailsProgressBars}>
				<div className={classes.skeletonWrapper}>
					<Skeleton variant='rect' animation='wave' height={54} />
				</div>
			</div>
		</>
	);
};

ResultSlidersSkeleton.propTypes = {
	isArticle: PropTypes.bool
};

export default ResultSlidersSkeleton;
