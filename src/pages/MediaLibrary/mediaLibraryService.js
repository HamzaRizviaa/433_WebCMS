import axios from 'axios';
import { getLocalStorageDetails } from '../../utils';

export default class MediaLibraryService {
	static getMediaApi(endPoint) {
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/${endPoint}`, {
			headers: {
				Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
			}
		});
	}

	static getAllMediaApi(endPoint) {
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/${endPoint}`, {
			headers: {
				Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
			}
		});
	}

	static getMainCategoriesApi() {
		return axios.get(
			`${process.env.REACT_APP_API_ENDPOINT}/media/get-main-categories`,
			{
				headers: {
					Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
				}
			}
		);
	}

	static getSpecificMediaApi(id) {
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/media/edit/${id}`, {
			headers: {
				Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
			}
		});
	}

	static getMediaLabelsApi() {
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/label/all-labels`, {
			headers: {
				Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
			}
		});
	}
}
