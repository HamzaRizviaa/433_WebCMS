import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { getLocalStorageDetails } from '../utils';

export const getUserDataObject = () => ({
	id: `${getLocalStorageDetails()?.id}`,
	first_name: `${getLocalStorageDetails()?.first_name}`,
	last_name: `${getLocalStorageDetails()?.last_name}`
});

/**
 * Check if all fields in object are empty or not.
 * @param {object} obj - any object
 * @returns {boolean} - determines whether all fields are empty or not
 */
export const areAllFieldsEmpty = (obj) => {
	return Object.values(obj)
		.filter((item) => typeof item !== 'boolean')
		.every((item) => isEmpty(item));
};

export const removeDuplicateLabel = (labels) => {
	const searchedLabel = labels.find((item) => item.id === null);
	const filteredLabels = labels.filter((item) => item.id !== null);
	const duplicateLabel = labels.find(
		(item) => item.name === searchedLabel.name && item.id !== null
	);

	if (duplicateLabel) return filteredLabels;
	return labels;
};

export const isNumber = (value) => {
	const numberRegex = /^[0-9]+$/;

	return !!value && numberRegex.test(value);
};

export const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

export const getRelativePath = (url = '') => {
	return url.split('cloudfront.net/')[1] || url;
};

/**
 *
 * @param {string} startDateString - ISO string of start date
 * @param {string} endDateString - ISO string of end date
 * @returns {object} formatted start and end date object with, date, hour and min property
 */
export const formatScheduleDate = (startDateString, endDateString) => {
	let startDate, startHour, startMin;
	let endDate, endHour, endMin;

	if (startDateString) {
		startDate = new Date(startDateString);
		startHour = startDate.getHours().toString().padStart(2, '0');
		startMin = startDate.getMinutes().toString().padStart(2, '0');
	}

	if (endDateString) {
		endDate = new Date(endDateString);
		endHour = endDate.getHours().toString().padStart(2, '0');
		endMin = endDate.getMinutes().toString().padStart(2, '0');
	}

	return {
		startStamp: {
			date: startDate,
			hour: startHour,
			min: startMin
		},
		...(!!endDate && {
			endStamp: {
				date: endDate,
				hour: endHour,
				min: endMin
			}
		})
	};
};

export const schedulerValidationText = (selectsRange) => ({
	1: `You can’t schedule in the past. Please select a${
		selectsRange ? ' Start' : ''
	} Date and Time atleast 15 minutes from now.`,
	2: 'Selected End Date and Time should be atleast 30 minutes ahead from the Start Date and Time.'
});

/**
 * Generate Date Time stamp in ISO format from date, hours and minutes.
 *
 * @param {Date | string} date - Date object or valid date string
 * @param {string} hour - Hours in 24H format
 * @param {string} min - minutes string
 * @returns {string} Date Time stamp in ISO string
 */
export const generateISODateTimeStamp = (date, hour, min) => {
	const selectedDate = dayjs(date).format('YYYY-MM-DD');
	const selectedTime = `${hour}:${min.padStart(2, '0')}`;
	const selectedDateTime = `${selectedDate}T${selectedTime}`;

	return new Date(selectedDateTime).toISOString();
};
