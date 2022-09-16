import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { ReactComponent as CalenderYellow } from '../../../../assets/Calender_Yellow.svg';
import { useDatePickerStyles } from './index.styled';

const CustomDateInput = forwardRef((props, ref) => {
	const {
		inputValue,
		onClick,
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
		<div className={classes.customDatePickerInput} onClick={onClick} ref={ref}>
			<span className={classes.dateInputText}>
				{inputValue ? moment(inputValue).format('DD-MM-YYYY') : placeHolder}
			</span>
			<span className={classes.datePickerIcon}>
				<CalenderYellow onClick={onIconClick} />
			</span>
		</div>
	);
});

CustomDateInput.displayName = 'CustomDateInput';

CustomDateInput.propTypes = {
	onClick: PropTypes.func,
	inputValue: PropTypes.any,
	placeHolder: PropTypes.string,
	onIconClick: PropTypes.func,
	disabled: PropTypes.bool,
	isError: PropTypes.bool
};

export default CustomDateInput;
