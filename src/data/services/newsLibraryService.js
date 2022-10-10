import axiosInstance from '../axiosInstance';

const sortKeysMapping = {
	media: 'media',
	post_date: 'postdate',
	last_edit: 'lastedit',
	labels: 'label',
	user: 'user',
	status: 'status'
};
class NewsLibraryService {
	static getAllNewsApi(queryParams) {
		const params = {
			...queryParams,
			limit: 20,
			sort_by: sortKeysMapping[queryParams.sort_by] || null
		};

		return axiosInstance.get('/news/all-news', { params });
	}

	static getSpecificNewsApi = (id) =>
		axiosInstance.get(`/news/get-specific-news/${id}`);
}

export default NewsLibraryService;
