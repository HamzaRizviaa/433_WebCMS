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
	const valueKey = mapOptions?.valueKey || 'value';

	const [innerValue, setInnerValue] = useState('');

	const handleChange = useCallback(
		(_, selected, reason) => {
			if (selected && onChange) {
				onChange(selected);
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

	const customRenderOption = renderOption
		? renderOption
		: (props) => <span>{props[labelKey]}</span>;

	const classes = useAutocompleteStyles({
		hasValue: !!value,
		isError: !!error,
		isDisabled: disabled,
		size
	});

	const inputsClasses = useInputsStyles({
		isError: !!error,
		isRequired: required
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
				getOptionSelected={(option, selectedValue) =>
					!(typeof selectedValue === 'object' && selectedValue[valueKey])
						? true
						: selectedValue && option[valueKey] === selectedValue[valueKey]
				}
				renderOption={customRenderOption}
				renderInput={(params) => (
					<TextField
						{...params}
						{...searchBarProps}
						disabled={disabled}
						placeholder={placeholder}
						InputProps={{
							disableUnderline: true,
							...params.InputProps,
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
