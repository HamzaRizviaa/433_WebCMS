export const selectNotificationSliderState = (state) =>
	state.rootReducer.notification.isSliderOpen;

export const selectLibraryData = (state) =>
	state.rootReducer.notification.libraryData;

export const selectSchedulerError = (state) =>
	state.rootReducer.notification.schedulerError;
