/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { MenuItem, Select, Paper, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ClearIcon from '@material-ui/icons/Clear';
import { useSelectFieldStyles } from './index.style';
import { useInputsStyles } from '../inputs.style';
import { useState } from 'react';

const SelectField = ({
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
	className = '',
	required = false,
	searchable = false,
	...rest
}) => {
	const [innerValue, setInnerValue] = useState('');

	const handleSelectChange = useCallback(
		(event) => {
			if (onChange) onChange(event.target.value, name);
		},
		[onChange]
	);

	const handleSearchableChange = useCallback(
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

	const handleBlur = useCallback(
		(event) => {
			if (onBlur) onBlur(event);
		},
		[onBlur]
	);

	const handleRenderValue = useCallback(
		(value) => {
			if (value) {
				const selectedOption = options.find((item) => item.value === value);
				return selectedOption?.label;
			}
			return placeholder;
		},
		[options, placeholder]
	);

	const classes = useSelectFieldStyles({ hasValue: !!value, isError: !!error });
	const inputsClasses = useInputsStyles({
		isError: !!error,
		isRequired: required
	});

	return (
		<div className={`${classes.selectFieldContainer} ${className}`}>
			{!!label && (
				<div className={inputsClasses.labelsContainer}>
					<span className={inputsClasses.inputLabel}>{label}</span>
				</div>
			)}
			{searchable ? (
				<Autocomplete
					{...rest}
					value={value}
					PaperComponent={(props) => (
						<Paper {...props} elevation={6} classes={{ root: classes.paper }} />
					)}
					ListboxProps={{
						style: { maxHeight: 140 },
						position: 'bottom'
					}}
					onChange={handleSearchableChange}
					onBlur={handleBlur}
					options={options}
					getOptionLabel={(option) =>
						typeof option === 'string' ? option : option.label
					}
					getOptionSelected={(option, selectedValue) =>
						!selectedValue?.value ? true : option.value === selectedValue?.value
					}
					renderOption={(props) => {
						return (
							<span className={classes.liAutocomplete}>{props.label}</span>
						);
					}}
					renderInput={(params) => (
						<TextField
							{...params}
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
			) : (
				<Select
					{...rest}
					name={name}
					value={value}
					className={classes.select}
					onChange={handleSelectChange}
					onBlur={handleBlur}
					disableUnderline
					fullWidth
					displayEmpty
					IconComponent={(props) => <KeyboardArrowDownIcon {...props} />}
					MenuProps={{
						anchorOrigin: {
							vertical: 'bottom',
							horizontal: 'left'
						},
						transformOrigin: {
							vertical: 'top',
							horizontal: 'left'
						},
						getContentAnchorEl: null,
						classes: {
							paper: classes.paper
						}
					}}
					inputProps={{ classes: { root: classes.input } }}
					renderValue={handleRenderValue}
				>
					{options.map((item) => (
						<MenuItem
							key={item.value}
							value={item.value}
							className={classes.selectOption}
						>
							{item.label}
						</MenuItem>
					))}
				</Select>
			)}
			<span className={inputsClasses.errorText}>{error}</span>
		</div>
	);
};

export default SelectField;
