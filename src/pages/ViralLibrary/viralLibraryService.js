import axios from 'axios';
import { getLocalStorageDetails } from '../../utils';

export default class ViralLibraryService {
	static getAllViralsServiceCall(endPoint) {
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/${endPoint}`, {
			headers: {
				Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
			}
		});
	}

	static getLabels() {
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/label/all-labels`, {
			headers: {
				Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
			}
		});
	}

	static getSpecificViralApi(id) {
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/viral/edit/${id}`, {
			headers: {
				Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
			}
		});
	}
}
