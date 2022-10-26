import { createAsyncThunk } from '@reduxjs/toolkit';
import { QuestionsLibraryService } from '../../services';

export const getQuestions = createAsyncThunk(
	'questionLibrary/getQuestions',
	async (params = {}) => {
		const { data: questions } =
			await QuestionsLibraryService.getAllQuestionsApi(params);

		return questions.data;
	}
);

export const getQuestionEdit = createAsyncThunk(
	'questionLibrary/getQuestionEdit',
	async ({ id, type }) => {
		let endPoint = `question/get-question-edit?question_meta_id=${id}`;

		if (id && type) {
			endPoint = `question/get-question-edit?question_meta_id=${id}&question_type=${type}`;
		}
		const response = await QuestionsLibraryService.getQuestionEditApi(endPoint);
		if (response?.data?.data) {
			return response.data.data;
		} else {
			return [];
		}
	}
);

export const getQuestionLabels = createAsyncThunk(
	'questionLibrary/getQuestionLabels',
	async () => {
		const result = await QuestionsLibraryService.getQuizLabelsApi();

		if (result?.data?.data?.length > 0) {
			return result.data.data;
		} else {
			return [];
		}
	}
);
