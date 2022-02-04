import React from 'react';
import moment from 'moment';

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
		return <span>{`${startDate}   >   ${endDate}`}</span>;
	} else {
		if (startDate && endDate === null) {
			return <span>{`${startDate}   >   End date`}</span>;
		} else if (startDate === null && endDate) {
			return <span>{`Start date   >   ${endDate}`}</span>;
		} else {
			return (
				<span style={{ color: '#808080' }}>{`Start date   >   End date`}</span>
			);
		}
	}
};