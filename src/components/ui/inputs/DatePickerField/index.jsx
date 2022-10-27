/* eslint-disable react/prop-types */
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import CustomDateInput from './CustomDateInput';
import { useDatePickerStyles } from './index.styled';

const DatePickerField = ({
	name,
	value,
	label,
	placeholder,
	error,
	disabled,
	required,
	...rest
}) => {
	const classes = useDatePickerStyles({
		isError: !!error,
		isRequired: required
	});

	return (
		<div className={classes.datePickerContainer}>
			<span className={classes.datePickerLabel}>{label}</span>
			<div>
				<ReactDatePicker
					name={name}
					selected={value}
					customInput={
						<CustomDateInput
							inputValue={value}
							placeHolder={placeholder}
							disabled={disabled}
							isError={!!error}
						/>
					}
					disabled={disabled}
					popperPlacement='bottom'
					{...rest}
				/>
				<span className={classes.errorText}>{error}</span>
			</div>
		</div>
	);
};

export default DatePickerField;