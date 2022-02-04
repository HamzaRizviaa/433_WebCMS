import axios from 'axios';

export default class MediaLibraryService {
	static getMediaApi(endPoint) {
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/${endPoint}`);
	}

	static getAllMediaApi(endPoint) {
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/${endPoint}`);
	}

	static getMainCategoriesApi() {
		return axios.get(
			`${process.env.REACT_APP_API_ENDPOINT}/media/get-main-categories`
		);
	}

	static getSpecificMediaApi(id) {
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/media/edit/${id}`);
	}

	static getMediaLabelsApi() {
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/label/all-labels`);
	}
}
