import axiosInstance from '../axiosInstance';

const sortKeysMapping = {
	media: 'media',
	news_title: 'title',
	post_date: 'postdate',
	last_edit: 'lastedit',
	labels: 'label',
	user: 'user',
	status: 'status'
};

class NewsLibraryService {
	static getLabels() {
		return axiosInstance.get('/label/all-labels');
	}

	static getAllNewsApi(queryParams) {
		const params = {
			...queryParams,
			limit: 20,
			sort_by: sortKeysMapping[queryParams.sort_by] || null
		};

		return axiosInstance.get('/news/all-news', { params });
	}

	static getSpecificNewsApi(id) {
		return axiosInstance.get(`/news/get-specific-news/${id}`);
	}

	static duplicateTitleCheck(title) {
		return axiosInstance.get(`/news/check/${title}`);
	}

	static postNews(data) {
		return axiosInstance.post('/news/add-news', data, {
			params: {
				api_version: 3
			}
		});
	}

	static deleteNews(data) {
		return axiosInstance.post('/news/delete-news', data);
	}
}

export default NewsLibraryService;
