/* eslint-disable react/prop-types */
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import CustomDateInput from './CustomDateInput';
import { useInputsStyles } from '../inputs.style';
import { useDatePickerStyles } from './index.styled';

const DatePickerField = ({
	name,
	value,
	label,
	placeholder,
	error,
	disabled,
	required,
	onBlur,
	...rest
}) => {
	const classes = useDatePickerStyles({
		isError: !!error,
		isRequired: required
	});

	const inputsClasses = useInputsStyles({
		isError: !!error,
		isRequired: required
	});

	return (
		<div className={classes.datePickerContainer}>
			{!!label && (
				<div className={inputsClasses.labelsContainer}>
					<span className={inputsClasses.inputLabel}>{label}</span>
				</div>
			)}
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
							onBlur={onBlur}
						/>
					}
					disabled={disabled}
					popperPlacement='bottom'
					onBlur={onBlur}
					{...rest}
				/>
				<span className={inputsClasses.errorText}>{error}</span>
			</div>
		</div>
	);
};

export default DatePickerField;
