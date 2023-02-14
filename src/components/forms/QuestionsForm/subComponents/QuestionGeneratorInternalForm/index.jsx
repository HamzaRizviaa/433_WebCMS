import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { Grid } from '@material-ui/core';
import { useQuestionsStyles } from '../../index.style';
import DrawerLayout from '../../../../layouts/DrawerLayout';
import GenerateQuestions from './GenerateQuestions';
import QuizQuestions from './QuizQuestions';
import {
	quizGeneratorFormatter,
	replaceLockedQuestion
} from '../../../../../data/helpers';
import { useLazyGenerateQuestionsQuery } from '../../../../../data/features/questionsLibrary/questionLibrary.query';
import { toast } from 'react-toastify';

const QuestionGeneratorInternalForm = ({
	open,
	handleClose,
	onSubmitHandler
}) => {
	const classes = useQuestionsStyles();

	// Formik HOOK to extract methods and state
	const { values, setFieldValue, setSubmitting, isSubmitting } =
		useFormikContext();

	/// generate questions query ==> To generate AI Questions
	const [generateQuestion, response] = useLazyGenerateQuestionsQuery();

	// Effect hooko to set Field Values
	useEffect(() => {
		if (response.isLoading || response.isFetching || response.isError) return;
		response.data || [];
		let replacedQuestions = replaceLockedQuestion(
			values.questions,
			quizGeneratorFormatter(response.data || [])
		);
		setFieldValue('questions', replacedQuestions || []);
	}, [response?.data]);

	// Through error if quiz not generated
	useEffect(() => {
		if (response.isError) {
			toast.error(
				'Failed to generate questions. Please try again with different options.'
			);
		}
	}, [response.isError]);

	/**
	 * Methods
	 */

	// Export and save draft questions
	const handleDraftClick = () => {
		setFieldValue('general_info.save_draft', true);
		onSubmitHandler(values, { setSubmitting, isSubmitting, setFieldValue });
	};

	// Close Drawer and reset state
	const closeDrawer = () => {
		handleClose();
		// reset form values
		setFieldValue('questions', []);
	};

	// Generate Questions

	const handleGenerateQuestions = (filterData) => {
		generateQuestion({ body: filterData, currentQuestions: values.questions });
	};
	return (
		<DrawerLayout
			open={open}
			handleClose={closeDrawer}
			title={'Automatic Generation'}
			isLoading={response.isLoading || response.isFetching || isSubmitting}
			customWidth={850}
		>
			<Grid container className={classes.articlesGridBox}>
				<Grid className={classes.firstGridItem} item pr={1} md={6}>
					<GenerateQuestions
						onGenerate={(filterData) => handleGenerateQuestions(filterData)}
						formValues={values?.questions}
					/>
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
