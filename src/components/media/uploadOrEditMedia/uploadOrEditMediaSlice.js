import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMainCategories = createAsyncThunk(
	'uploadMedia/getMainCategories',
	async () => {
		const response = await axios.get(
			`${process.env.REACT_APP_API_ENDPOINT}/media/get-main-categories`
		);
		if (response?.data?.result?.length > 0) {
			return response.data.result;
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
		if (response?.data?.result) {
			return response.data.result;
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
		if (result?.data?.result?.length > 0) {
			return result.data.result;
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
		mainCategoriesStatusLoading: false
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
		[getSpecificMedia.fulfilled]: (state, action) => {
			state.specificMedia = action.payload;
		},
		[getMediaLabels.fulfilled]: (state, action) => {
			state.labels = action.payload;
		}
	}
});

export default uploadOrEditMediaSlice.reducer;
