import { createSlice } from '@reduxjs/toolkit';
import {
	getMedia,
	getAllMedia,
	getMainCategories,
	getSpecificMedia,
	getMediaLabels
} from './mediaLibraryActions';
export * from './mediaLibraryActions';

const initialState = {
	labels: [],
	media: [],
	allMedia: [],
	mainCategories: [],
	specificMedia: [],
	totalRecords: 0,
	status: '',
	specificMediaStatus: '',
	noResultStatus: false,
	noResultStatusCalendar: false,
	mainCategoriesStatusLoading: false
};

const mediaLibrarySlice = createSlice({
	name: 'mediaLibrary',
	initialState,
	reducers: {
		resetCalendarError: (state) => {
			state.noResultStatusCalendar = false;
		},
		resetNoResultStatus: (state) => {
			state.noResultStatus = false;
		}
	},
	extraReducers: (builder) => {
		builder.addCase(getMediaLabels.fulfilled, (state, action) => {
			state.labels = action.payload;
		});

		builder.addCase(getAllMedia.fulfilled, (state, action) => {
			state.allMedia = action.payload;
		});

		// Get Media Actions
		builder.addCase(getMedia.pending, (state) => {
			state.status = 'pending';
		});
		builder.addCase(getMedia.fulfilled, (state, action) => {
			state.media =
				action.payload.data.length > 0 ? action.payload.data : state.media;
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
		});
		builder.addCase(getMedia.rejected, (state) => {
			state.status = 'failed';
		});

		// Get Specific Media Actions
		builder.addCase(getSpecificMedia.pending, (state) => {
			state.specificMediaStatus = 'loading';
		});
		builder.addCase(getSpecificMedia.fulfilled, (state, action) => {
			state.specificMedia = action.payload;
			state.specificMediaStatus = 'success';
		});
		builder.addCase(getSpecificMedia.rejected, (state) => {
			state.specificMediaStatus = 'failed';
		});

		// Get Main Categories Actions
		builder.addCase(getMainCategories.pending, (state) => {
			state.mainCategoriesStatusLoading = true;
		});
		builder.addCase(getMainCategories.fulfilled, (state, action) => {
			state.mainCategories = action.payload;
			state.mainCategoriesStatusLoading = false;
		});
		builder.addCase(getMainCategories.rejected, (state) => {
			state.mainCategoriesStatusLoading = false;
		});
	}
});

export const { resetCalendarError, resetNoResultStatus } =
	mediaLibrarySlice.actions;

export default mediaLibrarySlice.reducer;
