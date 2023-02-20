import dayjs from 'dayjs';

export const getDateTime = (dateTime, dateTimeSeperator = '|') => {
	let formatted = new Date(dateTime);
	return `${dayjs(formatted).format(
		'DD-MM-YYYY'
	)} ${dateTimeSeperator} ${formatted.toLocaleTimeString('en-US', {
		hour12: false,
		hour: '2-digit',
		minute: '2-digit'
	})}`;
};

//16-06-2022
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

//16 July 2022
export const formatDate2 = (date) => {
	if (date === null) return null;

	let formatted = new Date(date);
	return `${dayjs(formatted).format('DD MMMM YYYY')}`;
};

export const getLocalStorageDetails = () => {
	let localStorageData = localStorage.getItem('user_data')
		? JSON.parse(localStorage.getItem('user_data'))
		: null;

	return localStorageData;
};

export const generateTimeStamp = (date, hours, mins) => {
	const selectedDate = dayjs(date || new Date()).format('YYYY-MM-DD');
	const selectedTime = `${hours}:${mins.length === 1 ? '0' : ''}${mins}`;
	const selectedDateTimeString = `${selectedDate}T${selectedTime}`;
	const selectedDateTime = new Date(selectedDateTimeString);
	return selectedDateTime;
};
// Check if given time is from past
/**
 *
 * @param {Date} date
 * @param {number} hours
 * @param {number} mins
 * @returns {boolean}
 */
export const isPastTime = (startStamp, endStamp) => {
	const { date, hours, mins } = startStamp;
	const selectedDateTime = generateTimeStamp(date, hours, mins);

	const currentDate = new Date();

	const timeDifference = selectedDateTime - currentDate;

	if (timeDifference <= 900000) return 1; // 900000 is in milliseconds which is equal to 15 minutes

	// if select ranges & endStamp available
	if (endStamp) {
		const { date, hours, mins } = endStamp;
		const selectedEndDateTime = generateTimeStamp(date, hours, mins);
		const difference = selectedEndDateTime - selectedDateTime;
		// start and end date time difference should be more than 30 minutes
		if (difference <= 900000 * 2) return 2;
	}
	return false;
};

export const getArticleDates = () => {
	const date = formatDate2(new Date());
	const today = new Date();
	const time =
		today.getHours() +
		':' +
		(today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes());
	return { date, today, time };
};
