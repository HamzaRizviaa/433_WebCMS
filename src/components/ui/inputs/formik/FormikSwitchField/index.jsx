/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import { useField } from 'formik';
import ToggleSwitchField from '../../ToggleSwitchField';

const FormikSwitchField = ({ name, onChange, onBlur, ...rest }) => {
	const [field, meta, helpers] = useField(name);
	const { value } = field;
	const { touched, error } = meta;
	const { setValue, setTouched } = helpers;

	const handleChange = useCallback(
		(value) => {
			setValue(value);
			if (onChange) {
				onChange(name, value);
			}
		},
		[onChange]
	);

	const handleBlur = useCallback(() => {
		setTouched(true);
		if (onBlur) onBlur(name, value);
	}, [value, onBlur]);

	return (
		<ToggleSwitchField
			{...rest}
			onChange={handleChange}
			onBlur={handleBlur}
			name={name}
			error={touched && error ? error : ''}
			checked={value}
		/>
	);
};

export default FormikSwitchField;
