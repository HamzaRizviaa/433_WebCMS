/* eslint-disable no-unused-vars */
import React from 'react';
import DefaultImage from '../../../../../assets/defaultImage.png';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles';
import { useQuestionsStyles } from '../../index.style';
import { formatDate } from '../../../../../data/utils';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import useGetQuestionResultDetail from '../../../../../hooks/libraries/questions/useGetQuestionResultDetail';
const BorderLinearProgress = withStyles((theme) => ({
	root: {
		height: '54px',
		borderRadius: '8px'
	},
	colorPrimary: {
		backgroundColor: '#404040 !important'
	},
	bar: {
		borderRadius: '8px',
		backgroundColor: theme.palette.mode === '#404040' ? 'red' : '#808080'
	}
}))(LinearProgress);

const calculateAnswerPercentage = (totalParticipants, usersCount) => {
	return totalParticipants !== 0
		? Math.round(usersCount / totalParticipants) * 100
		: 0;
};

const ResultSliders = ({ questionId, isArticle }) => {
	const { data, isLoading } = useGetQuestionResultDetail(questionId);

	const handleImageError = (e) => {
		e.target.onerror = null;
		e.target.src = DefaultImage;
	};

	const articleImage = `${process.env.REACT_APP_MEDIA_ENDPOINT}/${data?.article_image}`;

	const classes = useQuestionsStyles();

	if (isLoading) {
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
	}

	return (
		<>
			{isArticle && (
				<div className={classes.articlesQuizDetails}>
					<div className={classes.articlesbox}>
						<div>
							<img
								src={articleImage}
								className={classes.articlesImagebox}
								alt='no img'
								onError={handleImageError}
							/>
						</div>
						<div className={classes.articlesTextbox}>
							<div className={classes.articleText}>ARTICLE</div>
							<div className={classes.articleTitle}>{data?.article_title}</div>
						</div>
					</div>
				</div>
			)}

			<div className={classes.QuizQuestion}>{data?.question}</div>

			{data?.answers?.length > 0 &&
				data?.answers.map((ans, index) => {
					const answerPercent = calculateAnswerPercentage(
						data?.total_participants,
						ans?.users_count
					);

					return (
						<div className={classes.QuizDetailsProgressBars} key={index}>
							<div className={classes.progressBars}>
								<BorderLinearProgress
									variant='determinate'
									value={answerPercent}
								/>
								<div className={classes.progressbarTextBox}>
									<div>
										<span className={classes.leftprogressbarText}>
											{ans?.answer}
										</span>
										<span className={classes.rightProgressText}>
											{answerPercent}% | {ans?.users_count}
											{ans?.users_count === 1 ? ' User' : ' Users'}
										</span>
									</div>
								</div>
							</div>
						</div>
					);
				})}

			<div className={classes.QuizDetailstextUsers}>
				<span>
					{data?.total_participants}
					{data?.total_participants === 1 ? ' Participant' : ' Participants'}
				</span>
				{!isArticle && <span>Ends {formatDate(data?.end_date)}</span>}
			</div>
		</>
	);
};

ResultSliders.propTypes = {
	questionId: PropTypes.string.isRequired,
	isArticle: PropTypes.bool.isRequired
};

export default ResultSliders;
