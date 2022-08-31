import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import QuestionLibraryService from './questionLibraryService';

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
		const result = await QuestionLibraryService.getQuestionApi(endPoint);
		// console.log(result.data.data, 'QuestionLibraryService data');
		return { ...result.data.data, fromCalendar };
	}
);

export const getQuestionLabels = createAsyncThunk(
	'questionLibrary/getQuestionLabels',
	async () => {
		const result = await QuestionLibraryService.getQuizLabelsApi();

		if (result?.data?.data?.length > 0) {
			return result.data.data;
		} else {
			return [];
		}
	}
);

export const getQuestionEdit = createAsyncThunk(
	'questionLibrary/getQuestionEdit',
	async ({ id, type }) => {
		console.log(id, type, 'id and type');
		let endPoint = `question/get-question-edit?question_meta_id=${id}`;

		if (id && type) {
			endPoint = `question/get-question-edit?question_meta_id=${id}&question_type=${type}`;
		}
		const response = await QuestionLibraryService.getQuestionEditApi(endPoint);
		if (response?.data?.data) {
			return response.data.data;
		} else {
			return [];
		}
	}
);

export const getQuestionResultDetail = createAsyncThunk(
	'questionLibrary/getQuestionResultDetail',
	async ({ id, type }) => {
		let endPoint = `question/get-question-result-detail?question_id=${id}`;

		if (id && type) {
			endPoint = `question/get-question-result-detail?question_id=${id}&question_type=${type}`;
		}
		const response = await QuestionLibraryService.getQuestionResultDetialApi(
			endPoint
		);

		if (response?.data?.data) {
			return response.data.data;
		} else {
			return [];
		}
	}
);

export const getQuestionResulParticipant = createAsyncThunk(
	'questionLibrary/getQuestionResulParticipant',
	async ({ id, type, order_type, sortby }) => {
		let endPoint = `question/get-question-participant-listing?question_id=${id}`;

		if (id && type) {
			endPoint = `question/get-question-participant-listing?question_id=${id}&question_type=${type}`;
		}
		if (order_type && sortby) {
			endPoint += `&order_type=${order_type}&sort_by=${sortby}`;
		}
		const response =
			await QuestionLibraryService.getQuestionResultParticipantApi(endPoint);

		if (response?.data?.data) {
			return response.data.data;
		} else {
			return [];
		}
	}
);

export const quizLibrarySlice = createSlice({
	name: 'questionLibrary',
	initialState: {
		labels: [],
		questions: [], // all data
		questionEdit: [], // get-question-edit
		questionResultDetail: [], // get-question-result-detail
		questionResultParticipant: [], // get-question-result-participants
		openUploadPost: false,
		totalRecords: 0,
		noResultStatus: false,
		noResultStatusCalendar: false,
		questionEditStatus: ''
	},
	reducers: {
		resetCalendarError: (state) => {
			state.noResultStatusCalendar = false;
		},
		resetNoResultStatus: (state) => {
			state.noResultStatus = false;
		}
	},
	extraReducers: {
		[getQuestions.pending]: (state) => {
			state.status = 'pending';
		},
		[getQuestions.fulfilled]: (state, action) => {
			state.questions =
				action.payload.data.length > 0 ? action.payload.data : state.questions;
			state.totalRecords =
				action.payload.data.length > 0
					? action.payload.total
					: state.totalRecords;
			state.status = 'success';
			if (action.payload.fromCalendar) {
				state.noResultStatusCalendar =
					action.payload.data.length > 0 ? false : true;
			} else {
				state.noResultStatus = action.payload.data.length > 0 ? false : true;
			}
		},
		[getQuestions.rejected]: (state) => {
			state.status = 'failed';
		},
		[getQuestionLabels.fulfilled]: (state, action) => {
			state.labels = action.payload;
		},

		[getQuestionEdit.pending]: (state) => {
			state.status = 'loading';
			state.questionEditStatus = 'loading';
		},
		[getQuestionEdit.fulfilled]: (state, action) => {
			state.questionEdit = action.payload;
			state.status = 'success';
			state.questionEditStatus = 'success';
		},
		[getQuestionEdit.rejected]: (state) => {
			state.status = 'failed';
			state.questionEditStatus = 'failed';
		},

		[getQuestionResultDetail.pending]: (state) => {
			state.status = 'loading';
			state.questionEditStatus = 'loading';
		},
		[getQuestionResultDetail.fulfilled]: (state, action) => {
			state.questionResultDetail = action.payload;
			state.status = 'success';
			state.questionEditStatus = 'success';
		},
		[getQuestionResultDetail.rejected]: (state) => {
			state.status = 'failed';
			state.questionEditStatus = 'failed';
		},

		[getQuestionResulParticipant.pending]: (state) => {
			state.status = 'loading';
		},
		[getQuestionResulParticipant.fulfilled]: (state, action) => {
			state.questionResultParticipant = action.payload;
			state.status = 'success';
		},
		[getQuestionResulParticipant.rejected]: (state) => {
			state.status = 'failed';
		}
	}
});

export const { resetCalendarError, resetNoResultStatus } =
	quizLibrarySlice.actions;
export default quizLibrarySlice.reducer;
