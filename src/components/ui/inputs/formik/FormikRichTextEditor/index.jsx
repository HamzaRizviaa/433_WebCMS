import React from 'react';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import RichTextEditor from '../../RichTextEditor';

const FormikRichTextEditor = ({ name, id, onChange, onBlur, disabled }) => {
	const [field, meta, helpers] = useField(name);
	const { value } = field;
	const { touched, error } = meta;
	const { setValue, setTouched } = helpers;

	const handleChange = (text) => {
		setValue(text);
		if (onChange) {
			onChange(name, text);
		}
	};

	const handleBlur = () => {
		setTouched(true);
		if (onBlur) onBlur(name, value);
	};

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

FormikRichTextEditor.propTypes = {
	name: PropTypes.string,
	id: PropTypes.number,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	disabled: PropTypes.bool
};

export default FormikRichTextEditor;
