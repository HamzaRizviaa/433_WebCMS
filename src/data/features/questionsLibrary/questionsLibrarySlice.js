import { createSlice } from '@reduxjs/toolkit';
import {
	getQuestions,
	getQuestionEdit,
	getQuestionLabels
} from './questionsLibraryActions';
export * from './questionsLibraryActions';

const initialState = {
	labels: [],
	questions: [],
	questionEdit: null,
	questionResultDetail: [],
	questionResultParticipant: [],
	totalRecords: 0,
	status: '',
	questionEditStatus: '',
	openUploadPost: false,
	noResultStatus: false,
	noResultStatusCalendar: false
};

const questionsLibrarySlice = createSlice({
	name: 'questionsLibrary',
	initialState,
	reducers: {
		resetCalendarError: (state) => {
			state.noResultStatusCalendar = false;
		},
		resetNoResultStatus: (state) => {
			state.noResultStatus = false;
		},
		resetQuestionEdit: (state) => {
			state.questionEdit = null;
		}
	},
	extraReducers: (builder) => {
		// Get Questions Actions
		builder.addCase(getQuestions.pending, (state) => {
			state.status = 'pending';
		});

		builder.addCase(getQuestions.fulfilled, (state, action) => {
			state.questions = action.payload.data;
			state.totalRecords = action.payload.total;
			state.status = 'success';
		});

		builder.addCase(getQuestions.rejected, (state) => {
			state.status = 'failed';
		});

		// Get Question Edit Actions
		builder.addCase(getQuestionEdit.pending, (state) => {
			state.status = 'loading';
			state.questionEditStatus = 'loading';
		});

		builder.addCase(getQuestionEdit.fulfilled, (state, action) => {
			state.questionEdit = action.payload;
			state.status = 'success';
			state.questionEditStatus = 'success';
		});

		builder.addCase(getQuestionEdit.rejected, (state) => {
			state.status = 'failed';
			state.questionEditStatus = 'failed';
		});

		// Labels Actions
		builder.addCase(getQuestionLabels.fulfilled, (state, action) => {
			state.labels = action.payload;
		});
	}
});

export const { resetCalendarError, resetNoResultStatus, resetQuestionEdit } =
	questionsLibrarySlice.actions;

export default questionsLibrarySlice.reducer;
