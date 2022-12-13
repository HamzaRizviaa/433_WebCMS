/* eslint-disable react/prop-types */

import React, { useCallback } from 'react';
import { useField } from 'formik';
import DatePickerField from '../../DatePickerField';

const FormikDatePicker = ({ name, onChange, onBlur, ...restProps }) => {
	const [field, meta, helpers] = useField(name);

	const { value } = field;

	const { touched, error } = meta;

	const { setValue, setTouched } = helpers;

	const handleChange = useCallback(
		(date) => {
			setValue(date);
			if (onChange) onChange(name, date);
		},
		[onChange]
	);

	const handleBlur = useCallback(() => {
		setTouched(true);
		if (onBlur) onBlur(name, value);
	}, [value, onBlur]);

	return (
		<DatePickerField
			{...restProps}
			name={name}
			onChange={handleChange}
			onBlur={handleBlur}
			value={value}
			error={touched && error ? error : ''}
		/>
	);
};

export default FormikDatePicker;
