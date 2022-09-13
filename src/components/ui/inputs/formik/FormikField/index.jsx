/* eslint-disable react/prop-types */

import React, { useCallback } from 'react';
import { useField } from 'formik';
import InputField from '../../InputField';

function FormikField(props) {
	const { name, onChange, onBlur, ...restProps } = props;

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
			if (onChange) onChange(name, event.target.value);
		},
		[value, onChange]
	);

	const handleBlur = useCallback(
		(event) => {
			onFieldBlur(event);
			if (onBlur) onBlur(name, event.target.value);
		},
		[value, onBlur]
	);

	return (
		<InputField
			{...rest}
			{...restProps}
			name={name}
			isError={touched && !!error}
			onChange={handleChange}
			onBlur={handleBlur}
			value={value}
			helperText={touched && error ? error : ''}
		/>
	);
}

export default FormikField;
