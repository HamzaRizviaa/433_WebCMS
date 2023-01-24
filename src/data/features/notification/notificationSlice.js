import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isSliderOpen: false,
	libraryData: {
		contentType: '',
		contentId: ''
	}
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
		}
	}
});

export const {
	openNotificationSlider,
	closeNotificationSlider,
	toggleNotificationSlider,
	setLibraryData,
	resetLibraryData
} = notificationSlice.actions;

export default notificationSlice.reducer;
