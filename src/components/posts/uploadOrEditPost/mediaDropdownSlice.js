import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMedia = createAsyncThunk(
	'mediaDropdown/getMedia',
	async (page) => {
		const response = await axios.get(
			`${process.env.REACT_APP_API_ENDPOINT}/media/get-media?limit=20&page=${page}`
		);
		if (response?.data?.result?.data?.length > 0) {
			return response.data.result;
		} else {
			return [];
		}
	}
);

export const mediaDropdownSlice = createSlice({
	name: 'mediaDropdown',
	initialState: {
		media: [],
		totalRecords: 0
	},
	reducers: null,
	extraReducers: {
		[getMedia.pending]: (state) => {
			state.status = 'loading';
		},
		[getMedia.fulfilled]: (state, action) => {
			state.media = action.payload.data;
			state.totalRecords = action.payload.total;
			state.status = 'success';
		},
		[getMedia.rejected]: (state) => {
			state.status = 'failed';
		}
	}
});

export default mediaDropdownSlice.reducer;
