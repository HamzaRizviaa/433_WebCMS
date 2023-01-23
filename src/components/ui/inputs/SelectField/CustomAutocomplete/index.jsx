/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Paper, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import ClearIcon from '@material-ui/icons/Clear';
import { useAutocompleteStyles } from './index.style';
import { useInputsStyles } from '../../inputs.style';
import Four33Loader from '../../../../../assets/Loader_Yellow.gif';

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
	rightLabel,
	error,
	mapOptions,
	renderOption,
	noOptionsText = 'No options found',
	className = '',
	required = false,
	disabled = false,
	size = 'medium',
	isLoading = false,
	searchBarProps = {},
	...rest
}) => {
	const labelKey = mapOptions?.labelKey || 'label';
	// eslint-disable-next-line no-unused-vars
	const valueKey = mapOptions?.valueKey || 'value';

	const [innerValue, setInnerValue] = useState('');

	const handleChange = (_, selected, reason) => {
		if (selected && onChange) {
			onChange(selected);
		}

		if (onClearText && reason === 'clear') {
			onClearText();
		}
	};

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

	const handleKeyPress = (e) => {
		const newValue = e.key;

		if (newValue === 'Enter') {
			e.preventDefault();
			e.stopPropagation();
		}
	};

	const customRenderOption = renderOption
		? renderOption
		: (option) => (
				<span>{typeof option === 'string' ? option : option[labelKey]}</span>
		  );

	const getOptionSelected = (option, selectedValue) => {
		if (typeof selectedValue === 'object') {
			if (!selectedValue[valueKey]) return true;
			else return selectedValue && option[valueKey] === selectedValue[valueKey];
		} else if (typeof selectedValue === 'string') {
			if (!selectedValue) return true;
			else return selectedValue && option === selectedValue;
		}
		return false;
	};

	const hasValue = value?.length > 0;

	const classes = useAutocompleteStyles({
		hasValue: !!value,
		isError: !!error,
		isDisabled: disabled,
		size
	});

	const inputsClasses = useInputsStyles({
		isError: !!error,
		isRequired: required,
		size
	});

	return (
		<div className={className}>
			{(!!label || !!rightLabel) && (
				<div className={inputsClasses.labelsContainer}>
					{(!!label || !!rightLabel) && (
						<span className={inputsClasses.inputLabel}>{label}</span>
					)}
					{!!rightLabel && (
						<span className={inputsClasses.rightLabel}>{rightLabel}</span>
					)}
				</div>
			)}
			<Autocomplete
				{...rest}
				name={name}
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
					return typeof option === 'string' ? option : option[labelKey];
				}}
				getOptionSelected={getOptionSelected}
				renderOption={customRenderOption}
				renderInput={(params) => (
					<TextField
						{...params}
						disabled={disabled}
						placeholder={hasValue ? '' : placeholder}
						InputProps={{
							className: inputsClasses.textFieldInput,
							disableUnderline: true,
							...params.InputProps,
							classes: {
								root: classes.input
							}
						}}
						value={innerValue}
						onChange={handleSearchTextChange}
						onKeyPress={handleKeyPress}
						{...searchBarProps}
					/>
				)}
				closeIcon={<ClearIcon />}
				noOptionsText={
					isLoading ? (
						<div className={classes.labelsLoader}>
							<img src={Four33Loader} />
						</div>
					) : (
						<div className={classes.noResultText}>{noOptionsText}</div>
					)
				}
				popupIcon={null}
				ChipProps={{
					className: classes.tagYellow,
					size: 'small',
					deleteIcon: <ClearIcon />
				}}
			/>
			<span className={inputsClasses.errorText}>{error}</span>
		</div>
	);
};

export default CustomAutocomplete;
