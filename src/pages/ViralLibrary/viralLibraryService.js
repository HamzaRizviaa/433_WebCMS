import http from '../../globalServices/httpService';

export default class ViralLibraryService {
	static getAllViralsServiceCall(queryParams) {
		const params = {
			limit: 20,
			page: queryParams.page,
			order_type: queryParams.orderType,
			sort_by: queryParams.sortby,
			start_date: queryParams.startDate,
			end_date: queryParams.endDate,
			q: queryParams.q,
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
