import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import QuizLibraryService from './quizLibraryService';
export const getQuizess = createAsyncThunk(
	'quizLibary/getQuizess',
	async ({
		page,
		order_type,
		sortby,
		q,
		startDate,
		endDate,
		fromCalendar = false
	}) => {
		let endPoint = `quiz/quizzes?limit=20&page=1`;
		if (page) {
			endPoint = `quiz/quizzes?limit=20&page=${page}`;
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
		const result = await QuizLibraryService.getQuizApi(endPoint);
		//console.log(result.data.data);
		return { ...result.data.data, fromCalendar };
	}
);

export const getQuizLabels = createAsyncThunk(
	'quizLibrary/getQuizLabels',
	async () => {
		const result = await QuizLibraryService.getQuizLabelsApi();
		if (result?.data?.data?.length > 0) {
			return result.data.data;
		} else {
			return [];
		}
	}
);

export const quizLibrarySlice = createSlice({
	name: 'quizLibrary',
	initialState: {
		labels: [],
		posts: [],
		specificPost: [],
		openUploadPost: false,
		totalRecords: 0,
		noResultStatus: false,
		noResultStatusCalendar: false
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
		[getQuizess.pending]: (state) => {
			state.status = 'loading';
		},
		[getQuizess.fulfilled]: (state, action) => {
			state.posts =
				action.payload.data.length > 0 ? action.payload.data : state.posts;
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
		[getQuizess.rejected]: (state) => {
			state.status = 'failed';
		},
		[getQuizLabels.fulfilled]: (state, action) => {
			state.labels = action.payload;
		}
		// [getPostLabels.fulfilled]: (state, action) => {
		// 	state.labels = action.payload;
		// },

		// [getSpecificPost.pending]: (state) => {
		// 	state.status = 'loading';
		// },
		// [getSpecificPost.fulfilled]: (state, action) => {
		// 	state.specificPost = action.payload;
		// 	state.status = 'success';
		// },
		// [getSpecificPost.rejected]: (state) => {
		// 	state.status = 'failed';
		//}
	}
});

export const { resetCalendarError, resetNoResultStatus } =
	quizLibrarySlice.actions;
export default quizLibrarySlice.reducer;
