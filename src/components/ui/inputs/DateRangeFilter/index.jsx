import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { useSearchParams } from 'react-router-dom';
import dayjs from 'dayjs';
import CustomInput from './CustomInput';
import { useStyles } from './index.styled';
import { changeQueryParameters } from '../../../../data/utils/helper';
import 'react-datepicker/dist/react-datepicker.css';

function DateRangeFilter({ isError, errorMessage }) {
	const [searchParams, setSearchParams] = useSearchParams();

	const [dateRange, setDateRange] = useState(() => {
		const queryParamStartDate = searchParams.get('startDate')
			? dayjs(searchParams.get('startDate')).toDate()
			: null;
		const queryParamEndDate = searchParams.get('endDate')
			? dayjs(searchParams.get('endDate')).toDate()
			: null;

		const isStartDateValid = dayjs(queryParamStartDate).isValid();
		const isEndDateValid = dayjs(queryParamEndDate).isValid();

		return [
			isStartDateValid ? queryParamStartDate : null,
			isStartDateValid && isEndDateValid ? queryParamEndDate : null
		];
	});

	const [startDate, endDate] = dateRange;

	const handleDateChange = (date) => {
		setDateRange(date);
		const [start, end] = date;

		if (!start && !end) {
			const queryParams = changeQueryParameters(searchParams, {
				startDate: null,
				endDate: null
			});

			setSearchParams(queryParams);
		}
	};

	const classes = useStyles();

	return (
		<div className={classes.dateRangePickerWrapper}>
			<DatePicker
				customInput={
					<CustomInput
						startDate={startDate}
						endDate={endDate}
						isError={isError}
					/>
				}
				selectsRange={true}
				startDate={startDate}
				endDate={endDate}
				maxDate={new Date()}
				onChange={handleDateChange}
				placement='center'
				isClearable
			/>
			<p className={classes.noResultError}>{isError ? errorMessage : ''}</p>
		</div>
	);
}

DateRangeFilter.propTypes = {
	isError: PropTypes.bool,
	errorMessage: PropTypes.string
};

export default DateRangeFilter;
