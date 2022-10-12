import axiosInstance from '../axiosInstance';

const sortKeysMapping = {
	viral: 'viral',
	post_date: 'postdate',
	last_edit: 'lastedit',
	labels: 'label',
	user: 'user',
	status: 'status'
};

class ViralLibraryService {
	static getAllViralsServiceCall(queryParams) {
		const params = {
			...queryParams,
			limit: 20,
			sort_by: sortKeysMapping[queryParams.sort_by] || null
		};

		return axiosInstance.get('/viral/all-virals', { params });
	}

	static getLabels() {
		return axiosInstance.get('/label/all-labels');
	}

	static getSpecificViralApi(id) {
		return axiosInstance.get(`/viral/edit/${id}`);
	}
}

export default ViralLibraryService;
