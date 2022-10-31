import { getLocalStorageDetails } from '../utils';

export const getUserDataObject = () => ({
	id: `${getLocalStorageDetails()?.id}`,
	first_name: `${getLocalStorageDetails()?.first_name}`,
	last_name: `${getLocalStorageDetails()?.last_name}`
});
