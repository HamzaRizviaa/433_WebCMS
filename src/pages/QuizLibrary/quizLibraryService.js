import axios from 'axios';

export default class quizLibraryService {
	static getQuizApi(endPoint) {
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/${endPoint}`);
	}

	static getQuizLabelsApi() {
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/label/all-labels`);
	}
}
