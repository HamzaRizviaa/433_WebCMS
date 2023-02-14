import { RadioGroup } from '@material-ui/core';
import React from 'react';
import { useState } from 'react';
import { useGetFilterOptionsQuery } from '../../../../../data/features/questionsLibrary/questionLibrary.query';
import Button from '../../../../ui/Button';
// import FormikSelect from '../../../../ui/inputs/formik/FormikSelect';
import RadioButton from '../../../../ui/inputs/RadioButton';
import SelectField from '../../../../ui/inputs/SelectField';
import PropTypes from 'prop-types';
import { useQuestionsStyles } from '../../index.style';
import {
	addDefaultOption,
	defaultOption,
	defaultState,
	disableGenerateQuestions,
	formatOptions
} from '../../../../../data/helpers';

const GenerateQuestions = ({ onGenerate, formValues }) => {
	// controlled fields state
	const [values, setValues] = useState(defaultState);

	const { mode } = values;

	const [selectedRow, setSelectedRow] = useState([defaultOption]);
	/**
	 * Hooks
	 */

	// query hook => To feth all the available options for quiz generator
	const { data } = useGetFilterOptionsQuery();

	/**
	 * Methods
	 */

	// Set Field Values to state
	const handleValueChange = (value, name, row) => {
		if (name === 'league') {
			if (mode === 'teams') {
				setValues({ ...values, [name]: value, team: 'Random', player: null });
				setSelectedRow(formatOptions(row?.teams) || []);

				return;
			}
			if (mode === 'players') {
				setValues({ ...values, [name]: value, player: 'Random', team: null });
				setSelectedRow(formatOptions(row?.players) || []);
				return;
			}
		}
		setValues({ ...values, [name]: value });
	};

	// Change Mode e.g: Team || Player
	const handleChangeMode = (e, value) => {
		setValues({
			...defaultState,
			mode: value
		});
		setSelectedRow([defaultOption]);
	};

	const getStats = () => {
		if (values.mode === 'players') {
			return formatOptions(data?.['stats-player']);
		}
		if (values.mode === 'teams') {
			return formatOptions(data?.['stats-team']);
		}
		return [defaultOption];
	};

	const handleGenerate = () => {
		onGenerate(values);
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

					<RadioGroup
						aria-label='status'
						name='status'
						value={mode}
						onChange={handleChangeMode}
						className=''
					>
						<div className={classes.radioContainer}>
							<RadioButton label={'Teams'} value='teams' />
							<RadioButton label={'Players'} value='players' />
						</div>
					</RadioGroup>
				</div>

				{/* Filter Dropdown Fields */}
				<div>
					<div className={classes.filterField}>
						<SelectField
							name='league'
							label='SELECT LEAGUE'
							options={addDefaultOption(data?.leagues) || [defaultOption]}
							mapOptions={{ valueKey: 'name', labelKey: 'name' }}
							placeholder='Please Select'
							value={values.league}
							onChange={(value, _, row) =>
								handleValueChange(value, 'league', row)
							}
						/>
					</div>
					{mode === 'teams' && (
						<div className={classes.filterField}>
							<SelectField
								name='team'
								label='SELECT TEAM'
								options={selectedRow || []}
								mapOptions={{ valueKey: 'name', labelKey: 'name' }}
								placeholder='Please Select'
								value={values.team}
								onChange={(value) => handleValueChange(value, 'team')}
							/>{' '}
						</div>
					)}
					{mode === 'players' && (
						<div className={classes.filterField}>
							<SelectField
								name='player'
								label='SELECT PLAYER'
								options={selectedRow || []}
								mapOptions={{ valueKey: 'name', labelKey: 'name' }}
								placeholder='Please Select'
								value={values.player}
								onChange={(value) => handleValueChange(value, 'player')}
							/>{' '}
						</div>
					)}
					<div className={classes.filterField}>
						<SelectField
							name='year'
							label='SELECT YEAR'
							options={formatOptions(data?.years)}
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
							options={getStats()}
							mapOptions={{ valueKey: 'name', labelKey: 'name' }}
							placeholder='Please Select'
							value={values.stat}
							onChange={(value) => handleValueChange(value, 'stat')}
						/>{' '}
					</div>
				</div>

				{/* Button */}
				<Button
					fullWidth
					size='large'
					className={classes.filterField}
					onClick={handleGenerate}
					disabled={disableGenerateQuestions(formValues)}
				>
					GENERATE QUESTION
				</Button>
			</div>
		</div>
	);
};

GenerateQuestions.propTypes = {
	onGenerate: PropTypes.func.isRequired,
	formValues: PropTypes.array
};

export default GenerateQuestions;
