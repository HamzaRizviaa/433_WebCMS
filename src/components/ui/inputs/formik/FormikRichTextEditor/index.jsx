import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import RichTextEditor from '../../RichTextEditor';

const FormikTextEditor = ({ name, id, onChange, onBlur, disabled }) => {
	const [field, meta, helpers] = useField(name);
	const { value } = field;
	const { touched, error } = meta;
	const { setValue, setTouched } = helpers;

	const handleChange = useCallback(
		(text) => {
			setValue(text);
			if (onChange) {
				onChange(name, text);
			}
		},
		[onChange]
	);

	const handleBlur = useCallback(() => {
		setTouched(true);
		if (onBlur) onBlur(name, value);
	}, [value, onBlur]);

	return (
		<RichTextEditor
			name={name}
			id={id}
			value={value}
			onChange={handleChange}
			onBlur={handleBlur}
			error={touched ? error : ''}
			disabled={disabled}
		/>
	);
};

FormikTextEditor.propTypes = {
	name: PropTypes.string,
	id: PropTypes.number,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	disabled: PropTypes.bool
};

export default FormikTextEditor;
