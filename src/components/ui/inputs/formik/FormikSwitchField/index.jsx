/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import { useField } from 'formik';
import ToggleSwitchField from '../../ToggleSwitchField';

const FormikSwitchField = ({ name, onChange, onBlur, checked, disabled=false }) => {
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
			onChange={handleChange}
			onBlur={handleBlur}
			name={name}
			value={value}
			error={touched ? error : ''}
			checked={checked}
			disabled={disabled}
		/>
	);
};

export default FormikSwitchField;
