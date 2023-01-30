import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isSliderOpen: false,
	libraryData: {
		contentType: '',
		contentId: ''
	},
	schedulerError: null
};

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		// Slider actions
		openNotificationSlider: (state) => {
			state.isSliderOpen = true;
		},
		closeNotificationSlider: (state) => {
			state.isSliderOpen = false;
		},
		toggleNotificationSlider: (state) => {
			state.isSliderOpen = !state.isSliderOpen;
		},

		// Library Data actions
		setLibraryData: (state, action) => {
			state.libraryData = action.payload;
		},
		resetLibraryData: (state) => {
			state.libraryData = {
				contentType: '',
				contentId: ''
			};
		},

		// Scheduler Error
		setSchedulerError: (state) => {
			state.schedulerError =
				'You can’t schedule in the past. Please select a Date and Time atleast 15 minutes from now.';
		},
		resetSchedulerError: (state) => {
			state.schedulerError = null;
		}
	}
});

export const {
	openNotificationSlider,
	closeNotificationSlider,
	toggleNotificationSlider,
	setLibraryData,
	resetLibraryData,
	setSchedulerError,
	resetSchedulerError
} = notificationSlice.actions;

export default notificationSlice.reducer;
