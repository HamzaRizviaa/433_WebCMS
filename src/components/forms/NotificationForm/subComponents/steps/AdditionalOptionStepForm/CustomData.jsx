import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

import FormikField from '../../../../../ui/inputs/formik/FormikField';
import { useNotificationStyles } from '../../../index.style';
import { useInputsStyles } from '../../../../../ui/inputs/inputs.style';

const CustomData = ({ form, push, remove, status }) => {
	const classes = useNotificationStyles();
	const inputsClasses = useInputsStyles();

	const isPublished = status === 'published';

	const customDataArray = form.values.additional_options.custom_data;

	const customData = !isPublished
		? customDataArray
		: customDataArray.slice(0, customDataArray.length - 1);

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

	const shouldDisable = (index) => {
		return (
			customData[index].key === 'module_type' ||
			customData[index].key === 'post_id' ||
			customData[index].key === 'notification_type'
		);
	};

	return (
		<div>
			<div className={inputsClasses.labelsContainer}>
				<span className={inputsClasses.inputLabel}>CUSTOM DATA</span>
			</div>
			{customData.map((_, index) => (
				<Grid key={index} container>
					<Grid className={classes.expireField} md={6} item>
						<FormikField
							name={`additional_options.custom_data.${index}.key`}
							placeholder='Key'
							onChange={handleKeyChange(index)}
							disabled={shouldDisable(index)}
						/>
					</Grid>
					<Grid className={classes.expirationUnitField} md={6} item>
						<FormikField
							name={`additional_options.custom_data.${index}.value`}
							placeholder='Value'
							onChange={handleValueChange(index)}
							disabled={shouldDisable(index)}
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
	remove: PropTypes.func.isRequired,
	status: PropTypes.string
};

export default CustomData;
