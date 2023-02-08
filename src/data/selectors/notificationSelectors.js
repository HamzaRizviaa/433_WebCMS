export const selectNotificationSliderState = (state) =>
	state.rootReducer.notification.isSliderOpen;

export const selectLibraryData = (state) =>
	state.rootReducer.notification.libraryData;

export const selectSchedulerError = (state) =>
	state.rootReducer.notification.schedulerError;

export const selectSpecificNotification = (state) =>
	state.rootReducer.notification.specificNotification;

export const selectSpecificNotificationStatus = (state) =>
	state.rootReducer.notification.specificNotificationStatus;

export const selectNotificationFeatureFlag = (state) =>
	state.rootReducer.remoteConfig.features.contentPushNotifications;
