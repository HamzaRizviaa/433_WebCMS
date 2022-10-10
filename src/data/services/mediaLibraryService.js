import axiosInstance from '../axiosInstance';

class MediaLibraryService {
	static getMediaApi = (endPoint) => axiosInstance.get(`/${endPoint}`);

	static getAllMediaApi = (endPoint) => axiosInstance.get(`/${endPoint}`);

	static getMainCategoriesApi = () =>
		axiosInstance.get(`/media/get-main-categories`);

	static getSpecificMediaApi = (id) => axiosInstance.get(`/media/edit/${id}`);

	static getMediaLabelsApi = () => axiosInstance.get(`/label/all-labels`);
}

export default MediaLibraryService;
