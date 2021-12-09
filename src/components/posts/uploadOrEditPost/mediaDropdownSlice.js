import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMedia = createAsyncThunk('mediaDropdown/getMedia', async () => {
	const response = await axios.get(
		`${process.env.REACT_APP_API_ENDPOINT}/dev/api/v1/media/get-media`
	);
	if (response?.data?.result?.length > 0) {
		return response.data.result;
	} else {
		return [];
	}
});

export const mediaDropdownSlice = createSlice({
	name: 'mediaDropdown',
	initialState: {
		media: []
	},
	reducers: null,
	extraReducers: {
		[getMedia.pending]: (state) => {
			state.status = 'loading';
		},
		[getMedia.fulfilled]: (state, action) => {
			state.media = action.payload;
			state.status = 'success';
		},
		[getMedia.rejected]: (state) => {
			state.status = 'failed';
		}
	}
});

export default mediaDropdownSlice.reducer;
