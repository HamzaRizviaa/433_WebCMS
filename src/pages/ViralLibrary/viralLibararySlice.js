import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import ViralLibraryService from './viralLibraryService';

export const getAllViralsApi = createAsyncThunk(
	'viralLibary/getAllViralsApi',
	async ({
		page,
		order_type,
		sortby,
		q,
		startDate,
		endDate,
		fromCalendar = false
	}) => {
		let endPoint = `viral/all-virals?limit=20&page=1`;
		if (page) {
			endPoint = `viral/all-virals?limit=20&page=${page}`;
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
		const result = await ViralLibraryService.getAllViralsServiceCall(endPoint);
		console.log(result, 'virals api');
		return { ...result.data.data, fromCalendar };
	}
);
export const getLabels = createAsyncThunk(
	'viralLibary/getViralsLabels',
	async () => {
		const result = await ViralLibraryService.getLabelsApi();
		console.log(result);
		if (result?.data?.data?.length > 0) {
			return result.data.data;
		} else {
			return [];
		}
	}
);

export const getSpecificViral = createAsyncThunk(
	'editButton/getSpecificViral', // not url , url is in services
	async (id) => {
		const response = await ViralLibraryService.getSpecificViralApi(id);
		if (response?.data?.data) {
			return response.data.data;
		} else {
			return [];
		}
	}
);
export const viralLibararySlice = createSlice({
	name: 'viralLibrary',
	initialState: {
		labels: [],
		virals: [], //get api - all virals state
		specificViral: [],
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
		[getAllViralsApi.pending]: (state) => {
			state.status = 'loading';
		},
		[getAllViralsApi.fulfilled]: (state, action) => {
			state.virals =
				action.payload.data.length > 0 ? action.payload.data : state.virals;
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
		[getAllViralsApi.rejected]: (state) => {
			state.status = 'failed';
		},
		[getLabels.fulfilled]: (state, action) => {
			state.labels = action.payload;
		},

		[getSpecificViral.pending]: (state) => {
			state.status = 'loading';
		},
		[getSpecificViral.fulfilled]: (state, action) => {
			state.specificViral = action.payload;
			state.status = 'success';
		},
		[getSpecificViral.rejected]: (state) => {
			state.status = 'failed';
		}
	}
});

export const { resetCalendarError, resetNoResultStatus } =
	viralLibararySlice.actions;

export default viralLibararySlice.reducer;
