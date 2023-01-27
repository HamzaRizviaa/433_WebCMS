/* eslint-disable react/prop-types */

import React, { useCallback } from 'react';
import { useField } from 'formik';
import InputField from '../../InputField';

const FormikField = ({ name, onChange, onBlur, ...restProps }) => {
	const [field, meta] = useField(name);

	const {
		onChange: onValueChange,
		onBlur: onFieldBlur,
		value,
		...rest
	} = field;

	const { touched, error } = meta;

	const handleChange = useCallback(
		(event) => {
			onValueChange(event);
			if (onChange) onChange(event.target.value);
		},
		[onValueChange, onChange]
	);

	const handleBlur = useCallback(
		(event) => {
			onFieldBlur(event);
			if (onBlur) onBlur(event);
		},
		[onFieldBlur, onBlur]
	);

	return (
		<InputField
			{...rest}
			{...restProps}
			name={name}
			onChange={handleChange}
			onBlur={handleBlur}
			value={value}
			error={touched && error ? error : ''}
		/>
	);
};

export default FormikField;
