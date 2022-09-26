import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { ReactComponent as Calendar } from '../../../../assets/Calendar.svg';
import { formatDate } from '../../../../utils';
import { useStyles } from './index.styled';
import { changeQueryParameters } from '../../../../utils/helper';

const CustomInput = forwardRef(
	({ onClick, startDate, endDate, isError }, ref) => {
		const [searchParams, setSearchParams] = useSearchParams();
		const formattedStartDate = formatDate(startDate);
		const formattedEndDate = formatDate(endDate);

		const queryParams = changeQueryParameters(searchParams, {
			startDate: formattedStartDate,
			endDate: formattedEndDate
		});

		const classes = useStyles({ hasData: !!startDate || !!endDate, isError });

		return (
			<div className={classes.customDateInput} onClick={onClick} ref={ref}>
				<span className={classes.inputField}>
					{formattedStartDate || 'Start Date'} <ArrowForwardIosIcon />
					{formattedEndDate || 'End Date'}
				</span>
				<span className={classes.inputIcon}>
					<Calendar
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							setSearchParams(queryParams);
						}}
					/>
				</span>
			</div>
		);
	}
);

CustomInput.displayName = 'CustomInput';

CustomInput.propTypes = {
	onClick: PropTypes.func.isRequired,
	startDate: PropTypes.object,
	endDate: PropTypes.object,
	isError: PropTypes.bool
};

export default CustomInput;
