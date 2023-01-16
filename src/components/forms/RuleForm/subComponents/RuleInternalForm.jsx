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
import { selectSpecificRule } from '../../../../data/selectors';
import FormikSelect from '../../../ui/inputs/formik/FormikSelect';
//styles
import { useFormStyles } from '../../forms.style';
import { useStyles } from '../index.style';
import { rulesFormInitialValues } from '../../../../data/helpers';

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
		validateForm,
		isSubmitting,
		resetForm
	} = useFormikContext();

	// useEffect(() => {
	// 	validateForm();
	// 	return () => {
	// 		resetForm(viralFormInitialValues);
	// 		dispatch(resetSpecificViral());
	// 	};
	// }, []);
	// useEffect(() => {
	// 	dispatch(getCountries());
	// }, []);

	const specificRule = useSelector(selectSpecificRule);
	//const countries = useSelector(getCountries);
	//console.log(countries, 'c o u n t r i e s ');

	const [geoBlockToggle, setGeoBlockToggle] = useState(false);
	const [ageRestrictionToggle, setAgeRestrictionToggle] = useState(false);

	const geoBlockBtnHandler = (value) => {
		setGeoBlockToggle(value);
	};

	const ageRestrictionBtnHandler = (value) => {
		setAgeRestrictionToggle(value);
	};

	const data = ['Germany', 'Austria'];

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
					title={'GeoBlock'}
					onChange={geoBlockBtnHandler}
					checked={geoBlockToggle}
					toggleBtn={true}
					name={'geoblock'}
				>
					<div className={classes.fieldContainer}>
						<FormikSelect
							label='LOCATION'
							placeholder={'Please select countries'}
							name={'geoblocking.countries'}
							disabled={!geoBlockToggle}
							options={data}
							searchable
							multiple
						/>
					</div>
					<div className={classes.fieldContainer}>
						<FormikField
							label='GEOBLOCK DURATION'
							name='geoblocking.duration'
							placeholder='Set a time duration of the geoblock in hours'
							disabled={!geoBlockToggle}
							endIcon={<p>Hours</p>}
						/>
					</div>
				</CardLayoutWithToggleBtn>

				<CardLayoutWithToggleBtn
					title={'Age Restrictions'}
					onChange={ageRestrictionBtnHandler}
					checked={ageRestrictionToggle}
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
									disabled={!ageRestrictionToggle}
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
									disabled={!ageRestrictionToggle}
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
							//onClick={toggleDeleteModal}
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
