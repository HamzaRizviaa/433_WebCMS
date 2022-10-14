/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Paper, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import ClearIcon from '@material-ui/icons/Clear';
import { useSelectFieldStyles } from '../index.style';
import { useInputsStyles } from '../../inputs.style';
import { useState } from 'react';

const CustomAutocomplete = ({
	name,
	value,
	options,
	onChange,
	onSearchTextChange,
	onClearText,
	onBlur,
	placeholder,
	label,
	error,
	mapOptions,
	className = '',
	required = false,
	disabled = false,
	height = 'medium',
	...rest
}) => {
	const labelKey = mapOptions?.labelKey || 'label';
	const valueKey = mapOptions?.valueKey || 'value';

	const [innerValue, setInnerValue] = useState('');

	const handleChange = useCallback(
		(_, selected, reason) => {
			if (selected && onChange) {
				onChange(selected, name);
			}

			if (onClearText && reason === 'clear') {
				onClearText();
			}
		},
		[onChange]
	);

	const debouncedHandleOnChange = useDebouncedCallback((event) => {
		if (onSearchTextChange) onSearchTextChange(event.target.value);
	}, 500);

	const handleSearchTextChange = useCallback(
		(event) => {
			setInnerValue(event.target.value);
			debouncedHandleOnChange(event);
		},
		[debouncedHandleOnChange]
	);

	const classes = useSelectFieldStyles({
		hasValue: !!value,
		isError: !!error,
		isAutocomplete: true
	});

	const inputsClasses = useInputsStyles({
		isError: !!error,
		isRequired: required,
		height
	});

	return (
		<div className={`${classes.selectFieldContainer} ${className}`}>
			{!!label && (
				<div className={inputsClasses.labelsContainer}>
					<span className={inputsClasses.inputLabel}>{label}</span>
				</div>
			)}
			<Autocomplete
				{...rest}
				disabled={disabled}
				value={value}
				PaperComponent={(props) => (
					<Paper {...props} elevation={6} classes={{ root: classes.paper }} />
				)}
				ListboxProps={{
					style: { maxHeight: 140 },
					position: 'bottom'
				}}
				onChange={handleChange}
				onBlur={onBlur}
				options={options}
				getOptionLabel={(option) => {
					console.log(option[labelKey]);
					return typeof option === 'string' ? option : option[labelKey];
				}}
				getOptionSelected={(option, selectedValue) =>
					!(typeof selectedValue === 'object' && selectedValue[valueKey])
						? true
						: selectedValue && option[valueKey] === selectedValue[valueKey]
				}
				renderOption={(props) => {
					return (
						<span className={classes.liAutocomplete}>{props[labelKey]}</span>
					);
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						disabled={disabled}
						placeholder={placeholder}
						InputProps={{
							disableUnderline: true,
							...params.InputProps,
							className: inputsClasses.textFieldInput,
							classes: {
								root: classes.input
							}
						}}
						value={innerValue}
						onChange={handleSearchTextChange}
					/>
				)}
				closeIcon={<ClearIcon />}
				noOptionsText={
					<div className={classes.noResultText}>No Results Found</div>
				}
				popupIcon={null}
			/>
			<span className={inputsClasses.errorText}>{error}</span>
		</div>
	);
};

export default CustomAutocomplete;
