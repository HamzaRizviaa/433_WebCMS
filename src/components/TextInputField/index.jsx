import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import classes from './_textInputField.module.scss';

const TextInputField = ({
	value,
	onChange,
	style,
	placeholder,
	multiline,
	maxRows
}) => {
	return (
		<TextField
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className={classes.textField}
			InputProps={{
				disableUnderline: true,
				className: classes.textFieldInput,
				style: { style }
			}}
			multiline={multiline}
			maxRows={maxRows}
		/>
	);
};

TextInputField.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func,
	style: PropTypes.object,
	placeholder: PropTypes.string,
	multiline: PropTypes.bool,
	maxRows: PropTypes.number
};

export default TextInputField;
