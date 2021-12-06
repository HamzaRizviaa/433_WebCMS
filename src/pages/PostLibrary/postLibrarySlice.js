import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getPosts = createAsyncThunk('postLibary/getPosts', async () => {
	const result = await axios.get(
		`${process.env.REACT_APP_API_ENDPOINT}/dev/api/v1/post/all-posts`
	);
	if (result?.data?.result?.length > 0) {
		return result.data.result;
	} else {
		return [];
	}
});

export const postLibrarySlice = createSlice({
	name: 'postLibrary',
	initialState: {
		posts: [],
		openUploadPost : false
	},
	reducers: null,
	extraReducers: {
		[getPosts.pending]: (state) => {
			state.status = 'loading';
		},
		[getPosts.fulfilled]: (state, action) => {
			state.posts = action.payload;
			state.status = 'success';
		},
		[getPosts.rejected]: (state) => {
			state.status = 'failed';
		},
	}
});

// export const { getPosts } = postLibrarySlice.actions;


export default postLibrarySlice.reducer;
