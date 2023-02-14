import axiosInstance from '../axiosInstance';

const sortKeysMapping = {
	viral: 'viral',
	post_date: 'postdate',
	last_edit: 'lastedit',
	labels: 'label',
	user: 'user',
	status: 'status'
};

/**
 * ViralLibraryService Class which holds all the functions
 * for calling the crud operation apis for virals with the axios service
 * @class
 */
class ViralLibraryService {
	/**
	 * This function is responsible for the fetching of lables
	 * @returns Promise of the AxiosResponse Object
	 */
	static getLabels() {
		return axiosInstance.get('/label/all-labels');
	}

	/**
	 * This function is responsible for the fetching of all virals
	 * @param {*} queryParams
	 * @returns Promise of the AxiosResponse Object
	 */
	static getAllViralsServiceCall(queryParams) {
		const params = {
			...queryParams,
			limit: 20,
			sort_by: sortKeysMapping[queryParams.sort_by] || null
		};

		return axiosInstance.get('/viral/all-virals', { params });
	}

	/**
	 * This function is responsible for the fetching of a single viral
	 * @param {string} id - The id of a viral
	 * @returns Promise of the AxiosResponse Object
	 */
	static getSpecificViralApi(id) {
		return axiosInstance.get(`/viral/edit/${id}`);
	}

	/**
	 * This function is responsible for the creation of a single viral
	 * @param {Object} data - The data field contains the properties of a viral
	 * @returns Promise of the AxiosResponse Object
	 */
	static postViral(data) {
		return axiosInstance.post('/viral/add-viral', data, {
			params: {
				api_version: 3
			}
		});
	}

	/**
	 * This function is responsible for the deletion of a single viral
	 * @param {Object} data - The data field contains the viral_id and is_draft properties
	 * @returns Promise of the AxiosResponse Object
	 */
	static deleteViral(data) {
		return axiosInstance.post('/viral/delete-viral', data);
	}
}

export default ViralLibraryService;
