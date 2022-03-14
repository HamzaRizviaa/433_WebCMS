import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ArticleLibraryService from './articleLibraryService';

export const getAllArticlesApi = createAsyncThunk(
	'articlesLibrary/getAllArticlesApi',
	async ({
		page,
		order_type,
		sortby,
		q,
		startDate,
		endDate,
		fromCalendar = false
	}) => {
		let endPoint = `article/all-articles?limit=20&page=1`;
		if (page) {
			endPoint = `article/all-articles?limit=20&page=${page}`;
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
		const result = await ArticleLibraryService.getAllArticlesServiceCall(
			endPoint
		);
		// console.log(result, 'articles api');
		return { ...result.data.data, fromCalendar };
	}
);
export const getLabels = createAsyncThunk(
	'articlesLibrary/getArticlesLabels',
	async () => {
		const result = await ArticleLibraryService.getLabelsApi();
		if (result?.data?.data?.length > 0) {
			return result.data.data;
		} else {
			return [];
		}
	}
);

export const articlesLibrarySlice = createSlice({
	name: 'articlesLibrary',
	initialState: {
		labels: [], //get api - all labels state
		articles: [], //get api - all articles state
		specificArticle: [], ///get api - all specific article data state
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
		[getAllArticlesApi.pending]: (state) => {
			state.status = 'loading';
		},
		[getAllArticlesApi.fulfilled]: (state, action) => {
			state.articles =
				action.payload.data.length > 0 ? action.payload.data : state.articles;
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
		[getAllArticlesApi.rejected]: (state) => {
			state.status = 'failed';
		},
		[getLabels.fulfilled]: (state, action) => {
			state.labels = action.payload;
		}
	}
});

export const { resetCalendarError, resetNoResultStatus } =
	articlesLibrarySlice.actions;

export default articlesLibrarySlice.reducer;
