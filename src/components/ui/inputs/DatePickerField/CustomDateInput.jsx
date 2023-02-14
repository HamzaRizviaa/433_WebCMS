import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { CalendarYellowIcon } from '../../../../assets/svg-icons';
import { useDatePickerStyles } from './index.styled';

const CustomDateInput = forwardRef((props, ref) => {
	const {
		inputValue,
		onClick,
		onBlur,
		placeHolder,
		onIconClick = () => {},
		disabled = false,
		isError = false
	} = props;

	const classes = useDatePickerStyles({
		isError,
		isDisabled: disabled,
		hasData: !!inputValue
	});

	return (
		<div
			className={classes.customDatePickerInput}
			onClick={onClick}
			onBlur={onBlur}
			ref={ref}
			tabIndex={-1}
		>
			<span className={classes.dateInputText}>
				{inputValue ? dayjs(inputValue).format('DD-MM-YYYY') : placeHolder}
			</span>
			<span className={classes.datePickerIcon}>
				<CalendarYellowIcon onClick={onIconClick} />
			</span>
		</div>
	);
});

CustomDateInput.displayName = 'CustomDateInput';

CustomDateInput.propTypes = {
	onClick: PropTypes.func,
	onBlur: PropTypes.func,
	inputValue: PropTypes.any,
	placeHolder: PropTypes.string,
	onIconClick: PropTypes.func,
	disabled: PropTypes.bool,
	isError: PropTypes.bool
};

export default CustomDateInput;
