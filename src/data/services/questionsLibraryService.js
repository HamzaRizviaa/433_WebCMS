import axiosInstance from '../axiosInstance';

const sortKeysMapping = {
	question: 'question',
	question_type: 'questiontype',
	post_date: 'postdate',
	end_date: 'enddate',
	labels: 'label',
	status: 'status',
	participants: 'participants',
	user: 'user',
	location: 'location'
};

class QuestionsLibraryService {
	static getAllQuestionsApi(queryParams) {
		const params = {
			...queryParams,
			limit: 20,
			sort_by: sortKeysMapping[queryParams.sort_by] || null
		};

		return axiosInstance.get('/question/questions', { params });
	}

	static getQuizLabelsApi() {
		return axiosInstance.get(`/label/all-labels`);
	}

	static getQuestionEditApi(params) {
		return axiosInstance.get('/question/get-question-edit', { params });
	}

	static postQuestion(data, apiVersion = 2) {
		return axiosInstance.post('/news/add-question', data, {
			params: {
				api_version: apiVersion
			}
		});
	}

	static deleteQuestion(data) {
		return axiosInstance.post('/news/delete-question', data);
	}

	static stopQuestion(data) {
		return axiosInstance.post('/news/stop-question', data);
	}
}

export default QuestionsLibraryService;
