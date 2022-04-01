import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import PostLibraryService from './postLibraryService';

export const getPosts = createAsyncThunk(
	'postLibary/getPosts',
	async ({
		page,
		order_type,
		sortby,
		q,
		startDate,
		endDate,
		fromCalendar = false
	}) => {
		let endPoint = `post/all-posts?limit=20&page=1`;
		if (page) {
			endPoint = `post/all-posts?limit=20&page=${page}`;
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
		const result = await PostLibraryService.getPostsApi(endPoint);
		//console.log(result.data.data);
		return { ...result.data.data, fromCalendar };
	}
);

export const getPostLabels = createAsyncThunk(
	'postLibary/getPostLabels',
	async () => {
		const result = await PostLibraryService.getPostLabelsApi();
		// if (result?.status_code === 409) {
		// 	console.log('kakaaa');
		// 	localStorage.removeItem('user_data');
		// }
		if (result?.data?.data?.length > 0) {
			return result.data.data;
		} else {
			return [];
		}
	}
);

export const getSpecificPost = createAsyncThunk(
	'editButton/getSpecificPost', //khud se , not url , url is in services
	async (id) => {
		const response = await PostLibraryService.getSpecificPostApi(id);
		if (response?.data?.data) {
			return response.data.data;
		} else {
			return [];
		}
	}
);

export const postLibrarySlice = createSlice({
	name: 'postLibrary',
	initialState: {
		labels: [],
		posts: [], // all posts
		specificPost: [], //specific posts
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
		//redux comes up
		[getPosts.pending]: (state) => {
			state.status = 'pending';
		},
		[getPosts.fulfilled]: (state, action) => {
			state.posts =
				action.payload.data.length > 0 ? action.payload.data : state.posts;
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
		[getPosts.rejected]: (state) => {
			state.status = 'failed';
		},
		[getPostLabels.fulfilled]: (state, action) => {
			state.labels = action.payload;
		},

		[getSpecificPost.pending]: (state) => {
			state.status = 'loading';
		},
		[getSpecificPost.fulfilled]: (state, action) => {
			state.specificPost = action.payload;
			state.status = 'success';
		},
		[getSpecificPost.rejected]: (state) => {
			state.status = 'failed';
		}
	}
});

export const { resetCalendarError, resetNoResultStatus } =
	postLibrarySlice.actions;

export default postLibrarySlice.reducer;
