/* eslint-disable react/prop-types */

import React, { useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { InputAdornment, IconButton, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useStyles } from './index.styled';

const INPUT_DELAY = 200;

function InputField(props) {
	const {
		value,
		label,
		className,
		startIcon,
		endIcon,
		onChange,
		type = 'text',
		textArea = false,
		required = false,
		isError = false,
		rows = 4,
		...restProps
	} = props;

	const [showPassword, setShowPassword] = useState(false);
	const [innerValue, setInnerValue] = useState('');

	const isPasswordField = type === 'password';

	useEffect(() => {
		if (value !== undefined && value !== null) {
			setInnerValue(value);
		} else {
			setInnerValue('');
		}
	}, [value]);

	// Added debouncing for performance improvement as whole form is re-rendered on a single field change
	const debouncedHandleOnChange = useDebouncedCallback((event) => {
		if (onChange) onChange(event);
	}, INPUT_DELAY);

	const handleChange = useCallback(
		(event) => {
			setInnerValue(event.target.value);
			debouncedHandleOnChange(event);
		},
		[debouncedHandleOnChange]
	);

	const classes = useStyles({ isError, isRequired: required });

	return (
		<div className={classes.inputFieldContainer}>
			{!!label && <span className={classes.inputLabel}>{label}</span>}
			<TextField
				{...restProps}
				className={className}
				type={isPasswordField ? (showPassword ? 'text' : 'password') : type}
				multiline={textArea}
				rows={textArea ? rows : undefined}
				autoComplete='nope'
				onChange={handleChange}
				value={innerValue}
				size='small'
				fullWidth
				InputProps={{
					disableUnderline: true,
					className: classes.textFieldInput,
					startAdornment: startIcon && (
						<InputAdornment position='start' className={classes.endIcon}>
							{startIcon}
						</InputAdornment>
					),
					endAdornment: (endIcon || isPasswordField) && (
						<InputAdornment position='end'>
							{isPasswordField ? (
								<IconButton
									aria-label='toggle password visibility'
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							) : (
								endIcon
							)}
						</InputAdornment>
					)
				}}
			/>
		</div>
	);
}

export default InputField;
