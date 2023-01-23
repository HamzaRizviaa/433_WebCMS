import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { Calendar } from '../../../../assets/svg-icons';
import { useStyles } from './index.styled';
import { changeQueryParameters } from '../../../../data/utils/helper';

const CustomInput = forwardRef(
	({ onClick, startDate, endDate, isError }, ref) => {
		const [searchParams, setSearchParams] = useSearchParams();

		const handleClick = (e) => {
			e.preventDefault();
			e.stopPropagation();

			const formattedStartDate = dayjs(startDate).isValid()
				? dayjs(startDate).format('MM-DD-YYYY')
				: null;
			const formattedEndDate = dayjs(endDate).isValid()
				? dayjs(endDate).format('MM-DD-YYYY')
				: null;

			const queryParams = changeQueryParameters(searchParams, {
				startDate: formattedStartDate,
				endDate: formattedEndDate,
				page: null
			});

			if (formattedStartDate && formattedEndDate) {
				setSearchParams(queryParams);
			}
		};

		const startDateInput = dayjs(startDate).isValid()
			? dayjs(startDate).format('DD-MM-YYYY')
			: null;
		const endDateInput = dayjs(endDate).isValid()
			? dayjs(endDate).format('DD-MM-YYYY')
			: null;

		const classes = useStyles({ hasData: !!startDate || !!endDate, isError });

		return (
			<div className={classes.customDateInput} onClick={onClick} ref={ref}>
				<span className={classes.inputField}>
					{startDateInput || 'Start Date'} <ArrowForwardIosIcon />
					{endDateInput || 'End Date'}
				</span>
				<span className={classes.inputIcon}>
					<Calendar onClick={handleClick} />
				</span>
			</div>
		);
	}
);

CustomInput.displayName = 'CustomInput';

CustomInput.propTypes = {
	onClick: PropTypes.func,
	startDate: PropTypes.object,
	endDate: PropTypes.object,
	isError: PropTypes.bool
};

export default CustomInput;
