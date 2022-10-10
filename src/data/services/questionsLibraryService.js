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

	static getQuestionEditApi(endPoint) {
		return axiosInstance.get(`/${endPoint}`);
	}
}

export default QuestionsLibraryService;
