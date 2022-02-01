import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMedia = createAsyncThunk(
	'mediaDropdown/getMedia',
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
		const response = await axios.get(
			`${process.env.REACT_APP_API_ENDPOINT}/${endPoint}`
		);
		return { ...response.data.data, fromCalendar };
	}
);

export const getAllMedia = createAsyncThunk(
	'mediaDropdown/getAllMedia',
	async (limit) => {
		let endPoint = `media/get-limited-media`;
		if (limit) {
			endPoint += `?limit=${limit}`;
		}
		const response = await axios.get(
			`${process.env.REACT_APP_API_ENDPOINT}/${endPoint}`
		);
		if (response?.data?.data?.length > 0) {
			return response.data.data;
		} else {
			return [];
		}
	}
);

export const mediaDropdownSlice = createSlice({
	name: 'mediaDropdown',
	initialState: {
		media: [],
		totalRecords: 0,
		allMedia: [],
		noResultStatus: false,
		noResultStatusCalendar: false
	},
	reducers: null,
	extraReducers: {
		[getMedia.pending]: (state) => {
			state.status = 'loading';
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
		}
	}
});

export default mediaDropdownSlice.reducer;
