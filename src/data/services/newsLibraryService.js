import axiosInstance from '../axiosInstance';

class NewsLibraryService {
	static getAllNewsApi = (endPoint) => axiosInstance.get(`/${endPoint}`);

	static getSpecificNewsApi = (id) =>
		axiosInstance.get(`/news/get-specific-news/${id}`);
}

export default NewsLibraryService;
