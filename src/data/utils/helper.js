import moment from 'moment';

/* eslint-disable no-unused-vars */
export function makeid(length) {
	var result = '';
	var characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for (var i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

/**
 *
 * @param {URLSearchParams} query - URLSearchParams instance
 * @param {object} queryObject - query parameters in form of key value pair
 * @returns {string} returns query params converted into string form like this "abc=xyz&foo=bar"
 */
export function changeQueryParameters(query, queryObject) {
	Object.entries(queryObject).forEach(([key, value]) => {
		if (value) {
			query.set(key, value);
		} else {
			query.delete(key);
		}
	});
	return query.toString();
}

/**
 *
 * @param {string} startDate - Query Param start date
 * @param {string} endDate - Query Param end date
 * @returns {{formattedStartDate: string | null, formattedEndDate: string | null}}
 */
export function sanitizeDates(startDate, endDate) {
	const formattedStartDate = startDate
		? moment(startDate, 'DD-MM-YYYY').toDate()
		: null;
	const formattedEndDate = endDate
		? moment(endDate, 'DD-MM-YYYY').toDate()
		: null;

	const isStartDateValid = moment(formattedStartDate).isValid();
	const isEndDateValid = moment(formattedEndDate).isValid();

	return {
		formattedStartDate: isStartDateValid ? formattedStartDate : null,
		formattedEndDate:
			isStartDateValid && isEndDateValid ? formattedEndDate : null
	};
}
