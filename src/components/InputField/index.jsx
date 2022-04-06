import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import classes from './_inputField.module.scss';

const InputField = ({
	value,
	onChange,
	style,
	placeholder,
	className,
	multiline,
	maxRows
}) => {
	return (
		<TextField
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className={className}
			InputProps={{
				disableUnderline: true,
				className: classes.textFieldInput,
				style: style
			}}
			multiline={multiline}
			maxRows={maxRows}
		/>
	);
};

InputField.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func,
	style: PropTypes.object,
	caption: PropTypes.string,
	placeholder: PropTypes.string,
	className: PropTypes.string,
	multiline: PropTypes.bool,
	maxRows: PropTypes.number
};

export default InputField;
