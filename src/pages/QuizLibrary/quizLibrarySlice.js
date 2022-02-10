import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import QuizLibraryService from './quizLibraryService';

export const getQuizLabels = createAsyncThunk(
	'quizLibrary/getQuizLabels',
	async () => {
		const result = await QuizLibraryService.getQuizLabelsApi();
		if (result?.data?.data?.length > 0) {
			return result.data.data;
		} else {
			return [];
		}
	}
);

export const quizLibrarySlice = createSlice({
	name: 'quizLibrary',
	initialState: {
		labels: []
	},
	reducers: {},
	extraReducers: {
		[getQuizLabels.fulfilled]: (state, action) => {
			state.labels = action.payload;
		}
	}
});

export default quizLibrarySlice.reducer;
