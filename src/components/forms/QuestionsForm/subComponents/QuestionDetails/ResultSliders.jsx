/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useQuestionsStyles } from '../../index.style';
import DefaultImage from '../../../../../assets/defaultImage.png';
import { styled } from '@mui/material/styles';
import LinearProgress, {
	linearProgressClasses
} from '@mui/material/LinearProgress';

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

const ResultSliders = () => {
	const classes = useQuestionsStyles();

	//dummy data
	const answers = [{ answer: 'abc' }, { answer: 'abc2' }];
	//location and end date will come from props
	const location = 'homepage';

	// const calculateAnswerPercentage = (data) => {
	// 	return totalParticipants !== 0
	// 		? Math.round(data?.users_count / totalParticipants) * 100
	// 		: 0;
	// };

	return (
		<>
			{location === 'article' ? (
				<div className={classes.articlesQuizDetails}>
					<div className={classes.articlesbox}>
						<div>
							<img
								//src={articleImage}
								className={classes.articlesImagebox}
								alt='no img'
								onError={(e) => (
									(e.target.onerror = null), (e.target.src = DefaultImage)
								)}
							/>
						</div>
						<div className={classes.articlesTextbox}>
							<div className={classes.articleText}>ARTICLE</div>
							<div className={classes.articleTitle}>
								It is the article title.
							</div>
						</div>
					</div>
				</div>
			) : (
				<></>
			)}
			<div className={classes.QuizQuestion}>
				{/* {editQuestionResultDetail.question} */}
				It is a Question
			</div>
			{answers?.length > 0 &&
				answers.map((data, index) => {
					return (
						<div className={classes.QuizDetailsProgressBars} key={index}>
							<div className={classes.progressBars}>
								<BorderLinearProgress
									variant='determinate'
									value={'80'}
									//value={calculateAnswerPercentage(data)}
								/>
								<div className={classes.progressbarTextBox}>
									<div>
										<span className={classes.leftprogressbarText}>
											answer
											{/* {data?.answer} */}
										</span>
										<span className={classes.rightProgressText}>
											% 0 | 80 Users
											{/* {calculateAnswerPercentage(data)}| {data?.users_count} */}
											{/* {data?.users_count === 1 ? 'User' : 'Users'} */}
										</span>
									</div>
								</div>
							</div>
						</div>
					);
				})}

			<div className={classes.QuizDetailstextUsers}>
				<span>
					100 Participants
					{/* {totalParticipants}{' '}
					{totalParticipants === 1 ? 'Participant' : 'Participants'} */}
				</span>
				{location === 'article' ? (
					''
				) : (
					<span>
						Ends 20-11-2022
						{/* Ends {formatDate(endDate)}  */}
					</span>
				)}
			</div>
		</>
	);
};

export default ResultSliders;
