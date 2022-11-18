import { createSlice } from '@reduxjs/toolkit';
import { removeDuplicateLabel } from '../../helpers';
import {
	getPosts,
	getPostLabels,
	getSpecificPost,
	getAllNewLabels,
	getNewLabelsSearch
} from './postsLibraryActions';
export * from './postsLibraryActions';

const initialState = {
	labels: [],
	posts: [],
	specificPost: [],
	newLabelsSearch: [],
	totalRecords: 0,
	status: '',
	labelsSearchStatus: '',
	openUploadPost: false,
	noResultStatus: false,
	noResultStatusCalendar: false
};

const postLibrarySlice = createSlice({
	name: 'postLibrary',
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
		// Labels Actions
		builder.addCase(getPostLabels.fulfilled, (state, action) => {
			state.labels = action.payload;
		});
		builder.addCase(getAllNewLabels.fulfilled, (state, action) => {
			state.newLabelsSearch = action.payload;
		});

		// Get Posts Actions
		builder.addCase(getPosts.pending, (state) => {
			state.status = 'pending';
		});
		builder.addCase(getPosts.fulfilled, (state, action) => {
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
		});
		builder.addCase(getPosts.rejected, (state) => {
			state.status = 'failed';
		});

		// Get Specific Post Actions
		builder.addCase(getSpecificPost.pending, (state) => {
			state.status = 'loading';
		});
		builder.addCase(getSpecificPost.fulfilled, (state, action) => {
			state.specificPost = action.payload;
			state.status = 'success';
		});
		builder.addCase(getSpecificPost.rejected, (state) => {
			state.status = 'failed';
		});

		// Search Labels Form Actions
		builder.addCase(getNewLabelsSearch.pending, (state) => {
			state.labelsSearchStatus = 'pending';
		});
		builder.addCase(getNewLabelsSearch.fulfilled, (state, action) => {
			state.labelsSearchStatus = 'success';
			state.newLabelsSearch = removeDuplicateLabel(action.payload);
		});
		builder.addCase(getNewLabelsSearch.rejected, (state) => {
			state.labelsSearchStatus = 'rejected';
		});
	}
});

export const { resetCalendarError, resetNoResultStatus } =
	postLibrarySlice.actions;

export default postLibrarySlice.reducer;
