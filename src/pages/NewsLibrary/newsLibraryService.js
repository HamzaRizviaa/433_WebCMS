import axios from 'axios';
import { getLocalStorageDetails } from '../../utils';

export default class NewsLibraryService {
	static getAllNewsApi(endPoint) {
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/${endPoint}`, {
			headers: {
				Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
			}
		});
	}

	static getSpecificNewsApi(id) {
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/news/edit/${id}`, {
			headers: {
				Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
			}
		});
	}
}
