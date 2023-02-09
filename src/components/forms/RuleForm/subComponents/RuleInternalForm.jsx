/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, InputAdornment } from '@material-ui/core';
import FormikField from '../../../ui/inputs/formik/FormikField';
import TextTooltip from '../../../ui/TextTooltip';
import { QuestionMarkInfoIcon } from '../../../../assets/svg-icons';
import Button from '../../../ui/Button';
import CardLayoutWithToggleBtn from '../../../layouts/CardLayoutWithToggleBtn';
import { selectSpecificRule, getCountries } from '../../../../data/selectors';
import FormikSelect from '../../../ui/inputs/formik/FormikSelect';
import { getCountriesApi } from '../../../../data/features/ruleLibrary/ruleLibrarySlice';
//styles
import { useFormStyles } from '../../forms.style';
import { useStyles } from '../index.style';
import { ruleFormInitialValues } from '../../../../data/helpers';
import { resetSpecificRule } from '../../../../data/features/ruleLibrary/ruleLibrarySlice';

const RuleInternalForm = ({ isEdit, toggleDeleteModal }) => {
	const dispatch = useDispatch();
	const isPublished = isEdit;
	const classes = useFormStyles();
	const internalFormClasses = useStyles();
	const {
		values,
		dirty,
		isValid,
		setFieldValue,
		errors,
		resetField,
		setErrors,
		setFieldError,
		setFieldTouched,
		validateForm,
		validateField,
		isSubmitting,
		resetForm
	} = useFormikContext();

	useEffect(() => {
		dispatch(getCountriesApi());
		validateForm();
		return () => {
			resetForm(ruleFormInitialValues);
			dispatch(resetSpecificRule());
		};
	}, []);

	const specificRule = useSelector(selectSpecificRule);
	const countries = useSelector(getCountries);

	const [geoBlockToggle, setGeoBlockToggle] = useState(false);
	const [ageRestrictionToggle, setAgeRestrictionToggle] = useState(false);

	const geoBlockBtnHandler = (value) => {
		setGeoBlockToggle(value);
		setFieldValue('toggleObject.geoblockToggle', value);
		if (value === false) {
			setFieldValue('geoblocking.countries', [], false);
			setFieldValue('geoblocking.duration', '', false);
		} else {
			setFieldTouched('geoblocking.countries', false);
		}
	};

	const ageRestrictionBtnHandler = (value) => {
		setAgeRestrictionToggle(value);
		setFieldValue('toggleObject.ageToggle', value);
		if (value === false) {
			setFieldValue('age.min', '', false);
			setFieldValue('age.max', '', false);
		} else {
			setFieldTouched('age.min', false);
			setFieldTouched('age.max', false);
		}
	};

	return (
		<div>
			<div>
				<CardLayoutWithToggleBtn title={'General Information'}>
					<div className={classes.fieldContainer}>
						<FormikField
							label='TITLE'
							name='title'
							placeholder='Write a title here'
							multiline
							maxRows={4}
							required
							rightLabel={
								<TextTooltip title='Title is a required field' placement='top'>
									<QuestionMarkInfoIcon className={classes.infoIcon} />
								</TextTooltip>
							}
						/>
					</div>
				</CardLayoutWithToggleBtn>

				<CardLayoutWithToggleBtn
					title={'Geoblock'}
					onChange={geoBlockBtnHandler}
					checked={values.toggleObject.geoblockToggle}
					toggleBtn={true}
					name={'geoblock'}
				>
					<div className={classes.fieldContainer}>
						<FormikSelect
							label='LOCATION'
							required
							placeholder={'Please select countries'}
							name={'geoblocking.countries'}
							filterSelectedOptions
							disabled={!values.toggleObject.geoblockToggle}
							options={countries.length ? countries : []}
							searchable
							multiple
						/>
					</div>
					<div className={classes.fieldContainer}>
						<FormikField
							label='GEOBLOCK DURATION'
							name='geoblocking.duration'
							placeholder='Set a time duration of the geoblock in hours'
							disabled={!values.toggleObject.geoblockToggle}
							endIcon={<p>Hours</p>}
							allowOnlyNumbers
						/>
					</div>
				</CardLayoutWithToggleBtn>

				<CardLayoutWithToggleBtn
					title={'Age restrictions'}
					onChange={ageRestrictionBtnHandler}
					checked={values.toggleObject.ageToggle}
					toggleBtn={true}
					name={'agerestrictions'}
				>
					<Grid container className={internalFormClasses.ageContainers}>
						<Grid item md={6}>
							<div className={internalFormClasses.fieldContainer}>
								<FormikField
									label='MINIMUM AGE'
									name='age.min'
									placeholder='Select a minimum age'
									allowOnlyNumbers
									disabled={!values.toggleObject.ageToggle}
									rightLabel={
										<TextTooltip
											title='Content item will not be visible to users below this age'
											placement='top'
										>
											<QuestionMarkInfoIcon className={classes.infoIcon} />
										</TextTooltip>
									}
								/>
							</div>
						</Grid>
						<Grid item md={6}>
							<div className={internalFormClasses.fieldContainer}>
								<FormikField
									label='MAXIMUM AGE'
									name='age.max'
									placeholder='Select a maximum age'
									allowOnlyNumbers
									disabled={!values.toggleObject.ageToggle}
									rightLabel={
										<TextTooltip
											title='Content item will not be visible to users above this age'
											placement='top'
										>
											<QuestionMarkInfoIcon className={classes.infoIcon} />
										</TextTooltip>
									}
								/>
							</div>
						</Grid>
					</Grid>
				</CardLayoutWithToggleBtn>
			</div>
			<div className={classes.buttonDiv}>
				<div>
					{isEdit && (
						<Button
							size='small'
							variant={'outlined'}
							onClick={toggleDeleteModal}
						>
							DELETE RULE
						</Button>
					)}
				</div>
				<div className={classes.publishDraftDiv}>
					<Button
						type='submit'
						disabled={isPublished ? (!dirty ? isValid : !isValid) : !isValid}
						//onClick={handlePublishClick}
					>
						{isPublished ? 'SAVE CHANGES' : 'PUBLISH'}
					</Button>
				</div>
			</div>
		</div>
	);
};

RuleInternalForm.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	setDisableDropdown: PropTypes.func.isRequired,
	onSubmitHandler: PropTypes.func.isRequired,
	toggleDeleteModal: PropTypes.func.isRequired
};

export default RuleInternalForm;
