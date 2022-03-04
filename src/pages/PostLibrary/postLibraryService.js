import axios from 'axios';
import { getLocalStorageDetails } from '../../utils';

export default class PostLibraryService {
	static getPostsApi(endPoint) {
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/${endPoint}`, {
			headers: {
				Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
			}
		});
	}

	static getPostLabelsApi() {
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/label/all-labels`, {
			headers: {
				Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
			}
		});
	}

	static getSpecificPostApi(id) {
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/post/edit/${id}`, {
			headers: {
				Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
			}
		});
	}
}
