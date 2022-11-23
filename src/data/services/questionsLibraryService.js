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

const formSortKeysMapping = {
	username: 'username',
	answer: 'answer',
	date_and_time: 'datetime'
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
		return axiosInstance.post('/question/add-question', data, {
			params: {
				api_version: apiVersion
			}
		});
	}

	static deleteQuestion(data) {
		return axiosInstance.post('/question/delete-question', data);
	}

	static stopQuestion(data) {
		return axiosInstance.post('/question/stop-question', data);
	}

	static async getQuestionResultDetail(id) {
		const { data } = await axiosInstance.get(
			`/question/get-question-result-detail?question_id=${id}`
		);

		return data;
	}

	static async getQuestionParticipantListing(queryParams) {
		const params = {
			question_id: queryParams.id,
			order_type: queryParams.order_type?.toUpperCase(),
			sort_by: formSortKeysMapping[queryParams.sort_by] || null
		};

		const { data } = await axiosInstance.get(
			'/question/get-question-participant-listing',
			{
				params
			}
		);

		return data;
	}
}

export default QuestionsLibraryService;
