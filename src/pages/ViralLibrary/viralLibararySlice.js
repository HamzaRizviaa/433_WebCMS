import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import ViralLibraryService from './viralLibraryService';

export const getAllViralsApi = createAsyncThunk(
	'viralLibary/getAllViralsApi',
	async (params) => {
		const result = await ViralLibraryService.getAllViralsServiceCall(params);
		return { ...result.data.data, fromCalendar: params.fromCalendar || false };
	}
);

export const getLabels = createAsyncThunk(
	'viralLibary/getViralsLabels',
	async () => {
		const result = await ViralLibraryService.getLabelsApi();
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
		noResultStatusCalendar: false,
		specificViralStatus: ''
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
			state.status = 'pending';
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
			state.specificViralStatus = 'loading';
		},
		[getSpecificViral.fulfilled]: (state, action) => {
			state.specificViral = action.payload;
			state.status = 'success';
			state.specificViralStatus = 'success';
		},
		[getSpecificViral.rejected]: (state) => {
			state.status = 'failed';
			state.specificViralStatus = 'failed';
		}
	}
});

export const { resetCalendarError, resetNoResultStatus } =
	viralLibararySlice.actions;

export default viralLibararySlice.reducer;
