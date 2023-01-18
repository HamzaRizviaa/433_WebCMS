/* eslint-disable react/prop-types */

import React, { useCallback, useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { InputAdornment, IconButton, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useStyles } from './index.styled';
import { useInputsStyles } from '../inputs.style';
import { isNumber } from '../../../../data/helpers';

const INPUT_DELAY = 200; // Miliseconds

const InputField = ({
	value,
	label,
	rightLabel,
	className,
	startIcon,
	endIcon,
	onChange,
	maxLength,
	error,
	inputProps = {},
	type = 'text',
	required = false,
	minRows = 1,
	size = 'medium',
	allowOnlyNumbers = false,
	readOnly,
	...restProps
}) => {
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
			const inputValue = event.target.value;
			if (allowOnlyNumbers && inputValue && !isNumber(inputValue)) return;
			setInnerValue(event.target.value);
			debouncedHandleOnChange(event);
		},
		[debouncedHandleOnChange]
	);

	const inputLength = innerValue.length;
	const inputLengthPercent = maxLength ? (inputLength / maxLength) * 100 : null;

	const classes = useStyles({ isError: !!error, inputLengthPercent });

	const inputsClasses = useInputsStyles({
		isRequired: required,
		isError: !!error,
		size
	});

	return (
		<div className={classes.inputFieldContainer}>
			{(!!label || !!rightLabel || !!maxLength) && (
				<div className={inputsClasses.labelsContainer}>
					{(!!label || !!rightLabel || !!maxLength) && (
						<span className={inputsClasses.inputLabel}>{label}</span>
					)}
					{(!!rightLabel || !!maxLength) && (
						<span className={classes.rightLabel}>
							{rightLabel}
							{maxLength ? ` ${inputLength}/${maxLength}` : ''}
						</span>
					)}
				</div>
			)}

			<TextField
				{...restProps}
				className={className}
				type={isPasswordField ? (showPassword ? 'text' : 'password') : type}
				autoComplete='nope'
				onChange={handleChange}
				value={innerValue}
				size='small'
				minRows={minRows}
				fullWidth
				inputProps={{ maxLength, ...inputProps }}
				InputProps={{
					readOnly,
					disableUnderline: true,
					className: inputsClasses.textFieldInput,
					startAdornment: !!startIcon && (
						<InputAdornment position='start' className={classes.endIcon}>
							{startIcon}
						</InputAdornment>
					),
					endAdornment: (!!endIcon || isPasswordField) && (
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
			<span className={inputsClasses.errorText}>{error}</span>
		</div>
	);
};

export default InputField;
