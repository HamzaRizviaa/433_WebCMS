import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { Grid } from '@material-ui/core';
import { useQuestionsStyles } from '../../index.style';
import DrawerLayout from '../../../../layouts/DrawerLayout';
import GenerateQuestions from './GenerateQuestions';
import QuizQuestions from './QuizQuestions';
import { quizGeneratorFormatter } from '../../../../../data/helpers';

const QuestionGeneratorInternalForm = ({
	open,
	handleClose,
	onSubmitHandler
}) => {
	const classes = useQuestionsStyles();

	const { values, setFieldValue, setSubmitting, isSubmitting } =
		useFormikContext();

	useEffect(() => {
		const dummer = [
			{
				question: 'Which team had more aerial duels won in EPL this season?',
				correct_answer: 'Newcastle Utd (285)',
				wrong_answer_1: 'Manchester City (250)',
				wrong_answer_2: 'Manchester Utd (245)',
				wrong_answer_3: 'Liverpool (228)'
			},
			{
				question:
					'What was the percentage of aerial duels won of Liverpool in the EPL this season?',
				correct_answer: '48',
				wrong_answer_1: '44',
				wrong_answer_2: '50',
				wrong_answer_3: '47'
			},
			{
				question:
					'How many goal difference had Liverpool in the EPL this season?',
				correct_answer: '9',
				wrong_answer_1: '-19',
				wrong_answer_2: '28',
				wrong_answer_3: '6'
			},
			{
				question: 'How many fouls drawn had Liverpool in the EPL this season?',
				correct_answer: '159',
				wrong_answer_1: '167',
				wrong_answer_2: '157',
				wrong_answer_3: '153'
			},
			{
				question:
					'Which team had more expected goals assisted in EPL this season?',
				correct_answer: 'Liverpool (25.2)',
				wrong_answer_1: 'Leeds United (13.5)',
				wrong_answer_2: 'West Ham (12.8)',
				wrong_answer_3: 'Wolves (11.5)'
			},
			{
				question: 'How many shots total had Liverpool in the EPL this season?',
				correct_answer: '314',
				wrong_answer_1: '312',
				wrong_answer_2: '327',
				wrong_answer_3: '318'
			},
			{
				question:
					'How many dribbles attempted had Liverpool in the EPL this season?',
				correct_answer: '302',
				wrong_answer_1: '311',
				wrong_answer_2: '326',
				wrong_answer_3: '324'
			},
			{
				question: 'Which team had more dribbles attempted in EPL this season?',
				correct_answer: 'Crystal Palace (390)',
				wrong_answer_1: 'Chelsea (342)',
				wrong_answer_2: 'Leeds United (322)',
				wrong_answer_3: 'Liverpool (302)'
			},
			{
				question: 'Which team had more goals per shot in EPL this season?',
				correct_answer: 'Brentford (0.13)',
				wrong_answer_1: 'Brighton (0.12)',
				wrong_answer_2: 'Manchester Utd (0.11)',
				wrong_answer_3: 'Liverpool (0.1)'
			},
			{
				question:
					'How many aerial duels won had Liverpool in the EPL this season?',
				correct_answer: '228',
				wrong_answer_1: '233',
				wrong_answer_2: '236',
				wrong_answer_3: '239'
			}
		];

		setFieldValue('questions', quizGeneratorFormatter(dummer));
	}, []);

	const handleDraftClick = () => {
		setFieldValue('general_info.save_draft', true);
		onSubmitHandler(values, { setSubmitting, isSubmitting });
	};

	return (
		<DrawerLayout
			open={open}
			handleClose={handleClose}
			title={'Automatic Generation'}
			//	isLoading={isLoading}
			customWidth={850}
		>
			<Grid container className={classes.articlesGridBox}>
				<Grid className={classes.firstGridItem} item pr={1} md={6}>
					<GenerateQuestions />
				</Grid>

				<Grid className={classes.lastGridItem} item md={6}>
					<QuizQuestions onDraftClick={handleDraftClick} />
				</Grid>
			</Grid>
		</DrawerLayout>
	);
};

QuestionGeneratorInternalForm.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	onSubmitHandler: PropTypes.func.isRequired
};

export default QuestionGeneratorInternalForm;
