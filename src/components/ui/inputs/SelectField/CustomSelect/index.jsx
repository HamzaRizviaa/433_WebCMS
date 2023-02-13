/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import { MenuItem, Select } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useSelectStyles } from './index.style';
import { useInputsStyles } from '../../inputs.style';
import Four33Loader from '../../../../../assets/Loader_Yellow.gif';

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
	noOptionsText = 'No options found',
	className = '',
	required = false,
	disabled = false,
	size = 'medium',
	readOnly,
	isLoading = false,
	...rest
}) => {
	const labelKey = mapOptions?.labelKey || 'label';
	const valueKey = mapOptions?.valueKey || 'value';

	const handleSelectChange = useCallback(
		(event, { props }) => {
			if (onChange) onChange(event.target.value, name, props.metaData);
		},
		[onChange]
	);

	const handleRenderValue = useCallback(
		(value) => {
			if (value) {
				const selectedOption = options.find((item) => item[valueKey] === value);
				return selectedOption ? selectedOption[labelKey] : placeholder; // Was null before, replaced with place holder ( return placeholder if value not found)
			}
			return placeholder;
		},
		[options, placeholder]
	);

	const classes = useSelectStyles({
		hasValue: !!value,
		isError: !!error,
		isDisabled: disabled,
		size,
		readOnly
	});

	const inputsClasses = useInputsStyles({
		isError: !!error,
		isRequired: required
	});

	return (
		<div className={className}>
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
				readOnly={readOnly}
				disableUnderline
				fullWidth
				displayEmpty
			>
				{isLoading ? (
					<div className={classes.loaderWrapper}>
						<img src={Four33Loader} />
					</div>
				) : options?.length === 0 && !isLoading ? (
					<MenuItem value='' className={classes.noOptionsText}>
						{noOptionsText}
					</MenuItem>
				) : (
					options?.map((item) => (
						<MenuItem
							key={item[valueKey]}
							value={item[valueKey]}
							className={classes.selectOption}
							metaData={item}
						>
							{item[labelKey]}
						</MenuItem>
					))
				)}
			</Select>
			<span className={inputsClasses.errorText}>{error}</span>
		</div>
	);
};

export default CustomSelect;
