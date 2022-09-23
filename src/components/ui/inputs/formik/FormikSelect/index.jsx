/* eslint-disable react/prop-types */

import React, { useCallback } from 'react';
import { useField } from 'formik';
import SelectField from '../../SelectField';

const FormikSelect = ({ name, onChange, onBlur, ...restProps }) => {
	const [field, meta, helpers] = useField(name);

	const { value } = field;

	const { touched, error } = meta;

	const { setValue, setTouched } = helpers;

	const handleChange = useCallback(
		(data) => {
			setValue(data);
			if (onChange) onChange(name, data);
		},
		[onChange]
	);

	const handleBlur = useCallback(() => {
		setTouched(true);
		if (onBlur) onBlur(name, value);
	}, [value, onBlur]);

	return (
		<SelectField
			{...restProps}
			name={name}
			onChange={handleChange}
			onBlur={handleBlur}
			value={value}
			error={touched && error ? error : ''}
		/>
	);
};

export default FormikSelect;
