import axios from 'axios';

export default class PostLibraryService {
	static getPostsApi(endPoint) {
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/${endPoint}`);
	}

	static getPostLabelsApi() {
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/label/all-labels`);
	}

	static getSpecificPostApi(id) {
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/post/edit/${id}`);
	}
}
