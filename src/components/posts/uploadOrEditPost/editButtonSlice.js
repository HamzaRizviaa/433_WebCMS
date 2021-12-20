import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getSpecificPost = createAsyncThunk(
	'editButton/getSpecificPost',
	async (id) => {
		const response = await axios.get(
			`${process.env.REACT_APP_API_ENDPOINT}/post/edit/${id}`
		);
		if (response?.data?.result) {
			return response.data.result;
		} else {
			return [];
		}
	}
);

export const editButtonSlice = createSlice({
	name: 'editButton',
	initialState: {
		specificPost: []
	},
	reducers: null,
	extraReducers: {
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

export default editButtonSlice.reducer;
