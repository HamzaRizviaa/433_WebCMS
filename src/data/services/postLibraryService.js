import axiosInstance from '../axiosInstance';

class PostLibraryService {
	static getPostsApi = (endPoint) => axiosInstance.get(`/${endPoint}`);

	static getPostLabelsApi = () => axiosInstance.get(`/label/all-labels`);

	static getSpecificPostApi = (id) => axiosInstance.get(`/post/edit/${id}`);

	// NEW LABELS ON SEARCH
	static getAllNewLabels = () => axiosInstance.get(`/label/all-labels`);

	static getNewLabelsSearch = (params) =>
		axiosInstance.get(`/label/search-labels`, {
			params: {
				...params
			}
		});
}

export default PostLibraryService;
