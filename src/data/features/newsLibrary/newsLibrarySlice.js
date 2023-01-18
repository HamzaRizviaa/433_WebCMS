import { createSlice } from '@reduxjs/toolkit';
import { getAllNewsApi, getSpecificNews } from './newsLibraryActions';
export * from './newsLibraryActions';

const initialState = {
	news: [],
	specificNews: null,
	totalRecords: 0,
	status: '',
	specificNewsStatus: '',
	openUploadPost: false,
	noResultStatus: false,
	noResultStatusCalendar: false
};

const newsLibrarySlice = createSlice({
	name: 'newsLibrary',
	initialState,
	reducers: {
		resetCalendarError: (state) => {
			state.noResultStatusCalendar = false;
		},
		resetNoResultStatus: (state) => {
			state.noResultStatus = false;
		},
		resetSpecificNews: (state) => {
			state.specificNews = null;
		}
	},
	extraReducers: (builder) => {
		// Get All News Actions
		builder.addCase(getAllNewsApi.pending, (state) => {
			state.status = 'pending';
		});
		builder.addCase(getAllNewsApi.fulfilled, (state, action) => {
			state.news = action.payload.data;
			state.totalRecords = action.payload.total;
			state.status = 'success';
		});
		builder.addCase(getAllNewsApi.rejected, (state) => {
			state.status = 'failed';
		});

		// Get Specific News Actions
		builder.addCase(getSpecificNews.pending, (state) => {
			state.status = 'loading';
			state.specificNewsStatus = 'loading';
		});
		builder.addCase(getSpecificNews.fulfilled, (state, action) => {
			state.specificNews = action.payload;
			state.status = 'success';
			state.specificNewsStatus = 'success';
		});
		builder.addCase(getSpecificNews.rejected, (state) => {
			state.status = 'failed';
			state.specificNewsStatus = 'failed';
		});
	}
});

export const { resetCalendarError, resetNoResultStatus, resetSpecificNews } =
	newsLibrarySlice.actions;

export default newsLibrarySlice.reducer;
