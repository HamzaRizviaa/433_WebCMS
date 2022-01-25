import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPosts = createAsyncThunk(
	'postLibary/getPosts',
	async ({ page, order_type, sortby }) => {
		let endPoint = `post/all-posts?limit=20&page=1`;
		if (page) {
			endPoint = `post/all-posts?limit=20&page=${page}`;
		}
		if (order_type && sortby) {
			endPoint += `&order_type=${order_type}&sortby=${sortby}`;
		}
		const result = await axios.get(
			`${process.env.REACT_APP_API_ENDPOINT}/${endPoint}`
		);
		if (result?.data?.data?.data?.length > 0) {
			return result.data.data;
		} else {
			return [];
		}
	}
);

export const getPostLabels = createAsyncThunk(
	'postLibary/getPostLabels',
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

export const postLibrarySlice = createSlice({
	name: 'postLibrary',
	initialState: {
		labels: [],
		posts: [],
		openUploadPost: false,
		totalRecords: 0
	},
	reducers: null,
	extraReducers: {
		[getPosts.pending]: (state) => {
			state.status = 'loading';
		},
		[getPosts.fulfilled]: (state, action) => {
			state.posts = action.payload.data;
			state.totalRecords = action.payload.total;
			state.status = 'success';
		},
		[getPosts.rejected]: (state) => {
			state.status = 'failed';
		},
		[getPostLabels.fulfilled]: (state, action) => {
			state.labels = action.payload;
		}
	}
});

// export const { getPosts } = postLibrarySlice.actions;

export default postLibrarySlice.reducer;
