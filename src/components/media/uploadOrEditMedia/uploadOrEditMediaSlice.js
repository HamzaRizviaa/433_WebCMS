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

export const uploadOrEditMediaSlice = createSlice({
	name: 'uploadMedia',
	initialState: {
		mainCategories: [],
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
		}
	}
});

export default uploadOrEditMediaSlice.reducer;
