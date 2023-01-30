import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { useQuestionsStyles } from '../../index.style';
import DrawerLayout from '../../../../layouts/DrawerLayout';
import GenerateQuestions from './GenerateQuestions';
import QuizQuestions from './QuizQuestions'
const QuestionGeneratorInternalForm = ({ open, handleClose }) => {
	const classes = useQuestionsStyles();

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
					<GenerateQuestions/>
				</Grid>

				<Grid className={classes.lastGridItem} item md={6}>
					<QuizQuestions />
				</Grid>
			</Grid>
		</DrawerLayout>
	);
};

QuestionGeneratorInternalForm.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired
};

export default QuestionGeneratorInternalForm;
