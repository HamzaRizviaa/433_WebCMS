import { mediaQueries } from '../features/mediaLibrary/media.query';

export const selectMedia = (state) => state.rootReducer.mediaLibrary.media;

export const selectMediaApiStatus = (state) =>
	state.rootReducer.mediaLibrary.status;

export const selectMediaTotalRecords = (state) =>
	state.rootReducer.mediaLibrary.totalRecords;

export const selectMediaNoResultStatus = (state) =>
	state.rootReducer.mediaLibrary.noResultStatus;

export const selectMediaResultStatusCalendar = (state) =>
	state.rootReducer.mediaLibrary.noResultStatusCalendar;

export const selectSpecificMedia = (state) =>
	state.rootReducer.mediaLibrary.specificMedia;

export const selectMediaMainCategories = (state) =>
	state.rootReducer.mediaLibrary.mainCategories;

export const selectSpecificMediaStatus = (state) =>
	state.rootReducer.mediaLibrary.specificMediaStatus;

export const selectMedialabels = (state) =>
	state.rootReducer.mediaLibrary.labels;

export const selectMainCategories = (state) =>
	mediaQueries.endpoints.getMainCategories.select()(state)?.data;

export const selectSubCategories = (state) =>
	mediaQueries.endpoints.getSubCategories.select()(state);
