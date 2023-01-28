import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { useQuestionsStyles } from './index.style';
import DrawerLayout from '../../layouts/DrawerLayout';
import QuizQuestions from './subComponents/QuestionGeneratorInternalForm/QuizQuestions';

const QuestionGeneratorForm = ({ open, handleClose }) => {
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
					Quiz Questions
				</Grid>

				<Grid className={classes.lastGridItem} item md={6}>
					<QuizQuestions />
				</Grid>
			</Grid>
		</DrawerLayout>
	);
};

QuestionGeneratorForm.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired
};

export default QuestionGeneratorForm;
