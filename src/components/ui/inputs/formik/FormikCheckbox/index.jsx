/* eslint-disable react/prop-types */
import React from 'react';
import { useField } from 'formik';
import CheckBox from '../../CheckBox';

const FormikCheckbox = ({ name, onChange, onBlur, ...rest }) => {
	const [field, meta, helpers] = useField(name);
	const { value } = field;
	const { touched, error } = meta;
	const { setValue, setTouched } = helpers;

	const handleChange = (value) => {
		setValue(value);
		if (onChange) {
			onChange(value);
		}
	};

	const handleBlur = () => {
		setTouched(true);
		if (onBlur) onBlur(value);
	};

	return (
		<CheckBox
			{...rest}
			onChange={handleChange}
			onBlur={handleBlur}
			name={name}
			error={touched && error ? error : ''}
			checked={value}
		/>
	);
};

export default FormikCheckbox;
