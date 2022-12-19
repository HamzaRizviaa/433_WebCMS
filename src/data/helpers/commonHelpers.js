import React from 'react';
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

export const reorder = (list, startIndex, endIndex) => {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

export const getRelativePath = (url = '') => {
	return url.split('cloudfront.net/')[1] || url;
};

export const toolTipHandler = (val) => {
	const newObj = {};

	Object.keys(val).forEach((key) => {
		const value = val[key];

		if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
			Object.assign(newObj, toolTipHandler(value));
		} else {
			if (typeof value !== 'string') {
				newObj[key] = value;
			}
		}
	});
	return newObj;
};

export const toolTipFormatter = (obj) => {
	const values = {
		...obj,
		countries: obj.countries?.length > 0 ? obj.countries.join(', ') : ' None'
	};
	return Object.entries(values).map(([key, value]) => (
		<div key={key} style={{ textTransform: 'capitalize' }}>
			{console.log(key, value, 'key values')}
			{key} : {value}
		</div>
	));
};
