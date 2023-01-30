import React from 'react';
import Button from '../../../../ui/Button';
import FormikSelect from '../../../../ui/inputs/formik/FormikSelect';
import RadioButton from '../../../../ui/inputs/RadioButton';
// import PropTypes from 'prop-types';
import { useQuestionsStyles } from '../../index.style';

const GenerateQuestions = () => {
	const classes = useQuestionsStyles();
	return (
		<div>
			{/* Heading */}
			<h2 className={classes.quizTitle}>Generate Questions</h2>
			<div className={classes.filterContainer}>
				{/* Radio Button Fields */}
				<div>
					<div className={classes.labelsContainer}>
						<span className={classes.inputLabel}>Select Mode</span>
					</div>

					<div className={classes.radioContainer}>
						<RadioButton label={'Teams'} />
						<RadioButton label={'Players'} />
					</div>
				</div>

				{/* Filter Dropdown Fields */}
				<div>
					<div className={classes.filterField}>
						<FormikSelect
							name='league'
							label='SELECT LEAGUE'
							options={[]}
							placeholder='Please Select'
						/>
					</div>
					<div className={classes.filterField}>
						<FormikSelect
							name='team'
							label='SELECT TEAM'
							options={[]}
							placeholder='Please Select'
						/>{' '}
					</div>
					<div className={classes.filterField}>
						<FormikSelect
							name='year'
							label='SELECT YEAR'
							options={[]}
							placeholder='Please Select'
						/>{' '}
					</div>
					<div className={classes.filterField}>
						<FormikSelect
							name='stat'
							label='SELECT STAT'
							options={[]}
							placeholder='Please Select'
						/>{' '}
					</div>
				</div>

				{/* Button */}
				<Button fullWidth size='large' className={classes.filterField}>
					GENERATE QUESTION
				</Button>
			</div>
		</div>
	);
};

GenerateQuestions.propTypes = {
	// data: PropTypes.object.isRequired
};

export default GenerateQuestions;
