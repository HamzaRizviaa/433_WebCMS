import http from '../../globalServices/httpService';

export default class ViralLibraryService {
	static getAllViralsServiceCall(queryParams) {
		const params = {
			limit: 20,
			page: queryParams.page,
			order_type: queryParams.orderType || null,
			sort_by: queryParams.sortby || null,
			start_date: queryParams.startDate || null,
			end_date: queryParams.endDate || null,
			q: queryParams.q || null,
			...(!!queryParams.q && { is_search: true })
		};

		return http.get('/viral/all-virals', { params });
	}

	static getLabels() {
		return http.get('/label/all-labels');
	}

	static getSpecificViralApi(id) {
		return http.get(`/viral/edit/${id}`);
	}
}
