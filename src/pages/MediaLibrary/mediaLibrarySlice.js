import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import MediaLibraryService from './mediaLibraryService';

export const getMedia = createAsyncThunk(
	'mediaLibrary/getMedia',
	async ({
		page,
		order_type,
		sortby,
		q,
		startDate,
		endDate,
		fromCalendar = false
	}) => {
		let endPoint = `media/get-media?limit=20&page=1`;
		if (page) {
			endPoint = `media/get-media?limit=20&page=${page}`;
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
		const response = await MediaLibraryService.getMediaApi(endPoint);
		return { ...response.data.data, fromCalendar };
	}
);

export const getAllMedia = createAsyncThunk(
	'mediaLibrary/getAllMedia',
	async (limit) => {
		let endPoint = `media/get-limited-media`;
		if (limit) {
			endPoint += `?limit=${limit}`;
		}
		const response = await MediaLibraryService.getAllMediaApi(endPoint);
		if (response?.data?.data?.length > 0) {
			return response.data.data;
		} else {
			return [];
		}
	}
);

export const getMainCategories = createAsyncThunk(
	'mediaLibrary/getMainCategories',
	async () => {
		const response = await MediaLibraryService.getMainCategoriesApi();

		if (response?.data?.data?.length > 0) {
			return response.data.data;
		} else {
			return [];
		}
	}
);

export const getSpecificMedia = createAsyncThunk(
	'mediaLibrary/getSpecificMedia',
	async (id) => {
		const response = await MediaLibraryService.getSpecificMediaApi(id);
		if (response?.data?.data) {
			return response.data.data;
		} else {
			return [];
		}
	}
);

export const getMediaLabels = createAsyncThunk(
	'mediaLibrary/getMediaLabels',
	async () => {
		const result = await MediaLibraryService.getMediaLabelsApi();
		if (result?.data?.data?.length > 0) {
			return result.data.data;
		} else {
			return [];
		}
	}
);

export const mediaLibrarySlice = createSlice({
	name: 'mediaLibrary',
	initialState: {
		media: [],
		totalRecords: 0,
		allMedia: [],
		noResultStatus: false,
		noResultStatusCalendar: false,
		mainCategories: [],
		specificMedia: [],
		labels: [],
		mainCategoriesStatusLoading: false,
		specificMediaStatus: ''
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
		[getMedia.pending]: (state) => {
			state.status = 'pending';
		},
		[getMedia.fulfilled]: (state, action) => {
			state.media =
				action.payload.data.length > 0 ? action.payload.data : state.media;
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
		[getMedia.rejected]: (state) => {
			state.status = 'failed';
		},
		[getAllMedia.fulfilled]: (state, action) => {
			state.allMedia = action.payload;
		},

		[getMainCategories.pending]: (state) => {
			state.mainCategoriesStatusLoading = true;
		},
		[getMainCategories.fulfilled]: (state, action) => {
			state.mainCategories = action.payload;
			state.mainCategoriesStatusLoading = false;
		},
		[getMainCategories.rejected]: (state) => {
			state.mainCategoriesStatusLoading = false;
		},
		[getSpecificMedia.pending]: (state) => {
			state.specificMediaStatus = 'loading';
		},
		[getSpecificMedia.fulfilled]: (state, action) => {
			state.specificMedia = action.payload;
			state.specificMediaStatus = 'success';
		},
		[getSpecificMedia.rejected]: (state) => {
			state.specificMediaStatus = 'failed';
		},
		[getMediaLabels.fulfilled]: (state, action) => {
			state.labels = action.payload;
		}
	}
});

export const { resetCalendarError, resetNoResultStatus } =
	mediaLibrarySlice.actions;

export default mediaLibrarySlice.reducer;
