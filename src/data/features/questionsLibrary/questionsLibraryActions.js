import { createAsyncThunk } from '@reduxjs/toolkit';
import { QuestionsLibraryService } from "../../services";

export const getQuestions = createAsyncThunk(
	'questionLibrary/getQuestions',
	async ({
		page,
		order_type,
		sortby,
		q,
		startDate,
		endDate,
		fromCalendar = false
	}) => {
		let endPoint = `question/questions?limit=20&page=1`;

		if (page) {
			endPoint = `question/questions?limit=20&page=${page}`;
		}
		if (order_type && sortby) {
			endPoint += `&order_type=${order_type}&sort_by=${sortby}`;
		}
		if (q) {
			endPoint += `&q=${q}&is_search=true`;
		}
		if (startDate && endDate) {
			endPoint += `&start_date=${startDate}&end_date=${endDate}`;
		}

		const result = await QuestionsLibraryService.getQuestionApi(endPoint);
		return { ...result.data.data, fromCalendar };
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
