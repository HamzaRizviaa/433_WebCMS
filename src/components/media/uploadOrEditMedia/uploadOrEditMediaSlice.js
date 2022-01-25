import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMainCategories = createAsyncThunk(
	'uploadMedia/getMainCategories',
	async () => {
		const response = await axios.get(
			`${process.env.REACT_APP_API_ENDPOINT}/media/get-main-categories`
		);
		if (response?.data?.data?.length > 0) {
			return response.data.data;
		} else {
			return [];
		}
	}
);

export const getSpecificMedia = createAsyncThunk(
	'uploadMedia/getSpecificMedia',
	async (id) => {
		const response = await axios.get(
			`${process.env.REACT_APP_API_ENDPOINT}/media/edit/${id}`
		);
		console.log(response);
		if (response?.data?.data) {
			return response.data.data;
		} else {
			return [];
		}
	}
);

export const getMediaLabels = createAsyncThunk(
	'uploadMedia/getMediaLabels',
	async () => {
		const result = await axios.get(
			`${process.env.REACT_APP_API_ENDPOINT}/label/all-labels`
		);
		if (result?.data?.data?.length > 0) {
			return result.data.data;
		} else {
			return [];
		}
	}
);

export const uploadOrEditMediaSlice = createSlice({
	name: 'uploadMedia',
	initialState: {
		mainCategories: [],
		specificMedia: [],
		labels: [],
		mainCategoriesStatusLoading: false,
		specificMediaStatus: ''
	},
	reducers: null,
	extraReducers: {
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

export default uploadOrEditMediaSlice.reducer;
