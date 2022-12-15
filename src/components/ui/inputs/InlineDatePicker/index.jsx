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
	disabled,
	required,
	onBlur,
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
					disabled={disabled}
					onBlur={onBlur}
					inline
				/>
				{!!error && <span className={inputsClasses.errorText}>{error}</span>}
			</div>
		</div>
	);
};

export default InlineDatePicker;
