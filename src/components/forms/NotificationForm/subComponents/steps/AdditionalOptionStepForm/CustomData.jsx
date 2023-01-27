import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

import FormikField from '../../../../../ui/inputs/formik/FormikField';
import { useNotificationStyles } from '../../../index.style';
import { useInputsStyles } from '../../../../../ui/inputs/inputs.style';

const CustomData = ({ form, push, remove }) => {
	const classes = useNotificationStyles();
	const inputsClasses = useInputsStyles();

	const customData = form.values.additional_options.custom_data;

	const addItem = (index) => {
		const lastItemIndex = customData.length - 1;
		if (index === lastItemIndex) push({ key: '', value: '' });
	};

	const handleKeyChange = (index) => (key) => {
		addItem(index);
		if (!key && !customData[index].value) remove(index);
	};

	const handleValueChange = (index) => (value) => {
		addItem(index);
		if (!customData[index].key && !value) remove(index);
	};

	return (
		<div>
			<div className={inputsClasses.labelsContainer}>
				<span className={inputsClasses.inputLabel}>CUSTOM DATA</span>
			</div>
			{form.values.additional_options.custom_data.map((_, index) => (
				<Grid key={index} container>
					<Grid className={classes.expireField} md={6} item>
						<FormikField
							name={`additional_options.custom_data.${index}.key`}
							placeholder='Key'
							onChange={handleKeyChange(index)}
						/>
					</Grid>
					<Grid className={classes.expirationUnitField} md={6} item>
						<FormikField
							name={`additional_options.custom_data.${index}.value`}
							placeholder='Value'
							onChange={handleValueChange(index)}
						/>
					</Grid>
				</Grid>
			))}
		</div>
	);
};

CustomData.propTypes = {
	form: PropTypes.object.isRequired,
	push: PropTypes.func.isRequired,
	remove: PropTypes.func.isRequired
};

export default CustomData;
