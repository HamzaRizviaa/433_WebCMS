import axios from 'axios';
import { getLocalStorageDetails } from '../../utils';

export default class questionLibraryService {
	static getQuestionApi(endPoint) {
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/${endPoint}`, {
			headers: {
				Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
			}
		});
	}

	static getQuizLabelsApi() {
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/label/all-labels`, {
			headers: {
				Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
			}
		});
	}
	static getQuestionEditApi(endPoint) {
		console.log(endPoint, 'type in service');
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/${endPoint}`, {
			headers: {
				Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
			}
		});
	}
}
