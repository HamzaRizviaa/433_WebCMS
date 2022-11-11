export const selectMedia = (state) =>
	state.rootReducer.mediaLibrary.media;

export const selectMediaApiStatus = (state) =>
	state.rootReducer.mediaLibrary.status;

export const selectMediaTotalRecords = (state) =>
	state.rootReducer.mediaLibrary.totalRecords;

export const selectMediaNoResultStatus = (state) =>
	state.rootReducer.mediaLibrary.noResultStatus;

export const selectMediaResultStatusCalendar = (state) =>
	state.rootReducer.mediaLibrary.noResultStatusCalendar;
