import { createSlice } from '@reduxjs/toolkit';
import { getSpecificNotification } from './notificationActions';
export * from './notificationActions';

const initialState = {
	isSliderOpen: false,
	libraryData: {
		contentType: '',
		contentId: ''
	},
	schedulerError: null,
	specificNotification: null
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
	},
	extraReducers: (builder) => {
		// getSpecificRule Action Cases
		builder.addCase(getSpecificNotification.pending, (state) => {
			state.loading = true;
			state.specificNotificationStatus = 'pending';
		});

		builder.addCase(getSpecificNotification.fulfilled, (state, action) => {
			state.loading = false;
			state.specificNotification = action.payload;
			state.specificNotificationStatus = 'success';
		});

		builder.addCase(getSpecificNotification.rejected, (state) => {
			state.loading = false;
			state.specificNotificationStatus = 'failed';
		});
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
