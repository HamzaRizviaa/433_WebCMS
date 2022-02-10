import axios from 'axios';

export default class QuizLibraryService {
	static getQuizLabelsApi() {
		return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/label/all-labels`);
	}
}
