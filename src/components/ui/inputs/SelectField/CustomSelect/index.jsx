/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import { MenuItem, Select } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useSelectFieldStyles } from '../index.style';
import { useInputsStyles } from '../../inputs.style';

const CustomSelect = ({
	name,
	value,
	options,
	onChange,
	onBlur,
	placeholder,
	label,
	error,
	mapOptions,
	className = '',
	required = false,
	disabled = false,
	size = 'medium',
	...rest
}) => {
	const labelKey = mapOptions?.labelKey || 'label';
	const valueKey = mapOptions?.valueKey || 'value';

	const handleSelectChange = useCallback(
		(event, { metaData }) => {
			if (onChange) onChange(event.target.value, name, metaData);
		},
		[onChange]
	);

	const handleRenderValue = useCallback(
		(value) => {
			if (value) {
				const selectedOption = options.find((item) => item[valueKey] === value);
				return selectedOption ? selectedOption[labelKey] : null;
			}
			return placeholder;
		},
		[options, placeholder]
	);

	const classes = useSelectFieldStyles({
		hasValue: !!value,
		isError: !!error,
		isDisabled: disabled,
		isAutocomplete: false,
		size
	});

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
			<Select
				{...rest}
				name={name}
				value={value}
				className={classes.select}
				onChange={handleSelectChange}
				onBlur={onBlur}
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
				disabled={disabled}
				disableUnderline
				fullWidth
				displayEmpty
			>
				{options.map((item) => (
					<MenuItem
						key={item[valueKey]}
						value={item[valueKey]}
						className={classes.selectOption}
						metaData={item}
					>
						{item[labelKey]}
					</MenuItem>
				))}
			</Select>
			<span className={inputsClasses.errorText}>{error}</span>
		</div>
	);
};

export default CustomSelect;
