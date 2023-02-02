import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Button from '../../../../ui/Button';
// import FormikSelect from '../../../../ui/inputs/formik/FormikSelect';
import RadioButton from '../../../../ui/inputs/RadioButton';
import SelectField from '../../../../ui/inputs/SelectField';
// import PropTypes from 'prop-types';
import { useQuestionsStyles } from '../../index.style';

const staticOptions = [
	{ name: 'random', key: 1 },
	{ name: 'ronaldo', key: 2 }
];

const GenerateQuestions = () => {
	// controlled fields state
	const [values, setValues] = useState({
		league: 'random',
		team: 'random',
		year: 'random',
		stat: 'random'
	});

	const { league, team, year, stat } = values;

	/**
	 * Hooks
	 */

	useEffect(() => {
		console.log('value changed', values);
	}, [league, team, year, stat]);

	/**
	 * Methods
	 */

	const handleValueChange = (value, name) => {
		setValues({ ...values, [name]: value });
	};

	// stylings
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
						<SelectField
							name='league'
							label='SELECT LEAGUE'
							options={staticOptions}
							mapOptions={{ valueKey: 'name', labelKey: 'name' }}
							placeholder='Please Select'
							value={values.league}
							onChange={(value) => handleValueChange(value, 'league')}
						/>
					</div>
					<div className={classes.filterField}>
						<SelectField
							name='team'
							label='SELECT TEAM'
							options={staticOptions}
							mapOptions={{ valueKey: 'name', labelKey: 'name' }}
							placeholder='Please Select'
							value={values.team}
							onChange={(value) => handleValueChange(value, 'team')}
						/>{' '}
					</div>
					<div className={classes.filterField}>
						<SelectField
							name='year'
							label='SELECT YEAR'
							options={staticOptions}
							mapOptions={{ valueKey: 'name', labelKey: 'name' }}
							placeholder='Please Select'
							value={values.year}
							onChange={(value) => handleValueChange(value, 'year')}
						/>{' '}
					</div>
					<div className={classes.filterField}>
						<SelectField
							name='stat'
							label='SELECT STAT'
							options={staticOptions}
							mapOptions={{ valueKey: 'name', labelKey: 'name' }}
							placeholder='Please Select'
							value={values.stat}
							onChange={(value) => handleValueChange(value, 'stat')}
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
