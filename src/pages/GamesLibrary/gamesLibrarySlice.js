import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import gamesLibraryService from './gamesLibraryService';

export const getAllGames = createAsyncThunk(
	'gamesLibrary/getMedia',
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
		const response = await gamesLibraryService.getGamesApi(endPoint);
		return { ...response.data.data, fromCalendar };
	}
);

export const getLabels = createAsyncThunk(
	'gamesLibrary/getMediaLabels',
	async () => {
		const result = await gamesLibraryService.getLabelsApi();
		if (result?.data?.data?.length > 0) {
			return result.data.data;
		} else {
			return [];
		}
	}
);

export const gamesLibrarySlice = createSlice({
	name: 'gamesLibrary',
	initialState: {
		gamesData: [], // all games data
		totalRecords: 0,
		// allMedia: [],
		noResultStatus: false,
		noResultStatusCalendar: false,
		labels: []
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
		[getAllGames.pending]: (state) => {
			state.status = 'pending';
		},
		[getAllGames.fulfilled]: (state, action) => {
			state.gamesData =
				action.payload.data.length > 0 ? action.payload.data : state.gamesData;
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
		[getAllGames.rejected]: (state) => {
			state.status = 'failed';
		},

		[getLabels.fulfilled]: (state, action) => {
			state.labels = action.payload;
		}
	}
});

export const { resetCalendarError, resetNoResultStatus } =
	gamesLibrarySlice.actions;

export default gamesLibrarySlice.reducer;
