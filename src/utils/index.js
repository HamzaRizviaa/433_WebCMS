import React from 'react';
import moment from 'moment';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export const getDateTime = (dateTime) => {
	let formatted = new Date(dateTime);
	return `${moment(formatted).format(
		'DD-MM-YYYY'
	)} | ${formatted.toLocaleTimeString('en-US', {
		hour12: false,
		hour: '2-digit',
		minute: '2-digit'
	})}`;
};

export const formatDate = (date) => {
	if (date === null) return null;

	let _date = new Date(date);
	let dd = _date.getDate();
	let mm = _date.getMonth() + 1;
	let yyyy = _date.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	return `${dd + '-' + mm + '-' + yyyy}`;
};

export const getCalendarText = (startDate, endDate) => {
	if (startDate && endDate) {
		return (
			<span
				style={{
					whiteSpace: 'pre-wrap',
					display: 'flex',
					alignItems: 'center'
				}}
			>
				{startDate} <ArrowForwardIosIcon /> {endDate}
			</span>
		);
	} else {
		if (startDate && endDate === null) {
			return (
				<span
					style={{
						whiteSpace: 'pre-wrap',
						display: 'flex',
						alignItems: 'center'
					}}
				>
					{startDate} <ArrowForwardIosIcon /> End date
				</span>
			);
		} else if (startDate === null && endDate) {
			return (
				<span
					style={{
						color: '#808080',
						whiteSpace: 'pre-wrap',
						display: 'flex',
						alignItems: 'center'
					}}
				>
					Start Date <ArrowForwardIosIcon /> {endDate}
				</span>
			);
		} else {
			return (
				<span
					style={{
						color: '#808080',
						whiteSpace: 'pre-wrap',
						display: 'flex',
						alignItems: 'center'
					}}
				>
					Start Date <ArrowForwardIosIcon /> End date
				</span>
			);
		}
	}
};

export const getCalendarText2 = (startDate) => {
	if (startDate) {
		return <span>{`${startDate}`}</span>;
	} else {
		return (
			<span style={{ color: '#808080' }}>{`Please select an end date`}</span>
		);
	}
};

export const getLocalStorageDetails = () => {
	let localStorageData = localStorage.getItem('user_data')
		? JSON.parse(localStorage.getItem('user_data'))
		: null;

	return localStorageData;
};
