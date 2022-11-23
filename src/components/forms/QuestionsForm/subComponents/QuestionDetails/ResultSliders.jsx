import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import LinearProgress, {
	linearProgressClasses
} from '@mui/material/LinearProgress';

import DefaultImage from '../../../../../assets/defaultImage.png';
import { useQuestionsStyles } from '../../index.style';
import { formatDate } from '../../../../../data/utils';
import useGetQuestionResultDetail from '../../../../../hooks/libraries/questions/useGetQuestionResultDetail';
import ResultSlidersSkeleton from './ResultSlidersSkeleton';

// this styles can't be move to styles file.
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: '54px',
	borderRadius: '8px',
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: '#404040 !important'
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: '8px',
		backgroundColor: theme.palette.mode === '#404040' ? 'red' : '#808080'
	}
}));

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

	if (isLoading) return <ResultSlidersSkeleton isArticle={isArticle} />;

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
