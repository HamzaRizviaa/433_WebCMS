import React from 'react';
import PropTypes from 'prop-types';
import TemplateModal from '../TemplateModal';
import TemplateSVG from '../../../../assets/TemplateAdd.svg';
import SmartQuiz from '../../../../assets/SmartQuiz.svg';
import { useStyles } from './index.style';
import { Box, Typography } from '@material-ui/core';

const QuestionModal = ({
	showQuestionModal,
	setShowQuestionModal,
	questionForm,
	questionGeneratorForm
}) => {
	const classes = useStyles();

	return (
		<TemplateModal
			title={'UPLOAD QUESTION'}
			open={showQuestionModal}
			onClose={() => setShowQuestionModal(false)}
			customWidth={630}
		>
			<Box className={classes.cardContentBox}>
				<div className={classes.card} onClick={() => questionForm()}>
					<img src={TemplateSVG} className={classes.icons} />
					<Typography className={classes.text}>Empty Question </Typography>
					<Typography className={classes.subText}>
						Create poll or quiz from scratch
					</Typography>
				</div>

				<div className={classes.card} onClick={() => questionGeneratorForm()}>
					<img src={SmartQuiz} className={classes.icons} />
					<Typography className={classes.text}>Generate Smart Quiz</Typography>
					<Typography className={classes.subText}>
						Only available for quizzes
					</Typography>
				</div>
			</Box>
		</TemplateModal>
	);
};

QuestionModal.propTypes = {
	showQuestionModal: PropTypes.bool.isRequired,
	setShowQuestionModal: PropTypes.func.isRequired,
	questionForm: PropTypes.func.isRequired,
	questionGeneratorForm: PropTypes.func.isRequired
};

export default QuestionModal;
