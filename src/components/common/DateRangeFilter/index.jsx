import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { useSearchParams } from 'react-router-dom';
import moment from 'moment';
import CustomInput from './CustomInput';
import { useStyles as globalUseStyles } from '../../../styles/global.style';
import { changeQueryParameters } from '../../../utils/helper';
import 'react-datepicker/dist/react-datepicker.css';

function DateRangeFilter({ isError, errorMessage }) {
	const [searchParams, setSearchParams] = useSearchParams();

	const [dateRange, setDateRange] = useState(() => {
		const queryParamStartDate = searchParams.get('startDate')
			? moment(searchParams.get('startDate'), 'DD-MM-YYYY').toDate()
			: null;
		const queryParamEndDate = searchParams.get('endDate')
			? moment(searchParams.get('endDate'), 'DD-MM-YYYY').toDate()
			: null;

		const isStartDateValid = moment(queryParamStartDate).isValid();
		const isEndDateValid = moment(queryParamEndDate).isValid();

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

	const classes = globalUseStyles();

	return (
		<div className={classes.calendarWrapper}>
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
