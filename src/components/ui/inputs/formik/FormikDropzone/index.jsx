/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import { useField } from 'formik';
import DropzoneField from '../../DropzoneField';

const FormikDropzone = ({ name, onChange, onBlur, ...restProps }) => {
	const [field, meta, helpers] = useField(name);

	const { value } = field;

	const { touched, error } = meta;

	const { setValue, setTouched } = helpers;

	const handleChange = useCallback(
		(files) => {
			setValue(files);
			if (onChange) onChange(name, files);
		},
		[onChange]
	);

	const handleBlur = useCallback(
		(event) => {
			setTouched(true);
			if (onBlur) onBlur(event);
		},
		[value, onBlur]
	);

	return (
		<DropzoneField
			name={name}
			value={value}
			onDrop={handleChange}
			onBlur={handleBlur}
			error={touched && error ? error : ''}
			{...restProps}
		/>
	);
};

export default FormikDropzone;
