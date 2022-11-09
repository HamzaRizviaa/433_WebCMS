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
