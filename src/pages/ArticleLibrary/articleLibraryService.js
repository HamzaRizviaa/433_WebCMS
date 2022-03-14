import axios from 'axios';
import { getLocalStorageDetails } from '../../utils';

export default class ArticleLibraryService {
	static getAllArticlesServiceCall(endPoint) {
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

	static getSpecificArticleApi(id) {
		return axios.get(
			`${process.env.REACT_APP_API_ENDPOINT}/article/get-specific-article/${id}`,
			{
				headers: {
					Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
				}
			}
		);
	}
}
