/* eslint-disable react/prop-types */
import React from 'react';
import ReactDatePicker from 'react-datepicker';
import { useInputsStyles } from '../inputs.style';
import { useInlineDatePickerStyles } from './index.style';

const InlineDatePicker = ({
	name,
	value,
	label,
	error,
	onBlur,
	disabled = false,
	required = false,
	...rest
}) => {
	const classes = useInlineDatePickerStyles();

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
					{...rest}
					name={name}
					selected={value}
					onBlur={onBlur}
					maxDate={disabled ? new Date('1970-01-01') : undefined}
					inline
				/>
				{!!error && <span className={inputsClasses.errorText}>{error}</span>}
			</div>
		</div>
	);
};

export default InlineDatePicker;
