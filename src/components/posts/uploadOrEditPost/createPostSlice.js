import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addPost = createAsyncThunk('createPost/addPost', async () => {
	const response = await axios.post(
		`${process.env.REACT_APP_API_ENDPOINT}/post/add-post`
	);
	if (response?.data?.result?.length > 0) {
		return response.data.result;
	} else {
		return [];
	}
});

export const createPostSlice = createSlice({
	name: 'createPost',
	initialState: {
		posts: []
	},
	reducers: null,
	extraReducers: {
		[addPost.pending]: (state) => {
			state.status = 'loading';
		},
		[addPost.fulfilled]: (state, action) => {
			state.posts = action.payload;
			state.status = 'success';
		},
		[addPost.rejected]: (state) => {
			state.status = 'failed';
		}
	}
});

export default createPostSlice.reducer;
