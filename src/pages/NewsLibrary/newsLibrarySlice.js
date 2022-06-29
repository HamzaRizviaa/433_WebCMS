import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import NewsLibraryService from './newsLibraryService';

// import NewsLibraryService from './newsLibraryService';

export const getAllNews = createAsyncThunk(
	'newsLibary/getAllNews',
	async ({
		page,
		order_type,
		sortby,
		q,
		startDate,
		endDate,
		fromCalendar = false
	}) => {
		let endPoint = `news/all-news?limit=20&page=1`;
		if (page) {
			endPoint = `news/all-news?limit=20&page=${page}`;
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
		const result = await NewsLibraryService.getAllNewsApi(endPoint);

		return { ...result.data.data, fromCalendar };
	}
);

export const getSpecificNews = createAsyncThunk(
	'editButton/getSpecificNews',
	async (id) => {
		const response = await NewsLibraryService.getSpecificNewsApi(id);
		if (response?.data?.data) {
			return response.data.data;
		} else {
			return [];
		}
	}
);
export const NewsLibrarySlice = createSlice({
	name: 'newsLibrary',
	initialState: {
		news: [],
		specificNews: [],
		openUploadPost: false,
		totalRecords: 0,
		noResultStatus: false,
		noResultStatusCalendar: false,
		specificNewsStatus: ''
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
		[getAllNews.pending]: (state) => {
			state.status = 'pending';
		},
		[getAllNews.fulfilled]: (state, action) => {
			state.news =
				action.payload.data.length > 0 ? action.payload.data : state.news;
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
		[getAllNews.rejected]: (state) => {
			state.status = 'failed';
		},

		[getSpecificNews.pending]: (state) => {
			state.status = 'loading';
			state.specificNewsStatus = 'loading';
		},
		[getSpecificNews.fulfilled]: (state, action) => {
			state.specificNews = action.payload;
			state.status = 'success';
			state.specificNewsStatus = 'success';
		},
		[getSpecificNews.rejected]: (state) => {
			state.status = 'failed';
			state.specificNewsStatus = 'failed';
		}
	}
});

export const { resetCalendarError, resetNoResultStatus } =
	NewsLibrarySlice.actions;

export default NewsLibrarySlice.reducer;
