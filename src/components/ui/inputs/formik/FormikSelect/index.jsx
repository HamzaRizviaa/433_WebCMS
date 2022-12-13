/* eslint-disable react/prop-types */

import React from 'react';
import { useField } from 'formik';
import SelectField from '../../SelectField';

const FormikSelect = ({ name, onChange, onBlur, ...restProps }) => {
	const [field, meta, helpers] = useField(name);

	const { value } = field;

	const { touched, error } = meta;

	const { setValue, setTouched } = helpers;

	const handleChange = (val, _, metaData) => {
		setValue(val);
		if (onChange) onChange(val, metaData);
	};

	const handleBlur = (event) => {
		setTouched(true);
		if (onBlur) onBlur(event);
	};

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
