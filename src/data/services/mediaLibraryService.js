import axiosInstance from '../axiosInstance';

const sortKeysMapping = {
	title: 'title',
	file_name: 'media',
	post_date: 'postdate',
	labels: 'label',
	user: 'user',
	status: 'status',
	last_edit: 'lastedit',
	type: 'type'
};

class MediaLibraryService {
	static getMediaApi = (queryParams) => {
		const params = {
			...queryParams,
			limit: 20,
			sort_by: sortKeysMapping[queryParams.sort_by] || null
		};

		return axiosInstance.get('/media/get-media', { params });
	};

	static getAllMediaApi = (endPoint) => axiosInstance.get(`/${endPoint}`);

	static getMainCategoriesApi = () =>
		axiosInstance.get(`/media/get-main-categories`);

	static getSpecificMediaApi = (id) => axiosInstance.get(`/media/edit/${id}`);

	static getMediaLabelsApi = () => axiosInstance.get(`/label/all-labels`);

	static postMedia = (data) => {
		return axiosInstance.post('/media/create-media', data, {
			params: {
				api_version: 2
			}
		});
	};

	static deleteMedia = (data) => {
		return axiosInstance.post('/media/delete-media', data, {
			params: {
				api_version: 2
			}
		});
	};
}

export default MediaLibraryService;
