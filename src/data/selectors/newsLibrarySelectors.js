export const selectAllNews = (state) => state.rootReducer.newsLibrary.news;

export const selectSpecificNews = (state) =>
	state.rootReducer.newsLibrary.specificNews;

export const selectSpecificNewsStatus = (state) =>
	state.rootReducer.newsLibrary.specificNewsStatus;

export const selectNewsApiStatus = (state) => state.rootReducer.newsLibrary;

export const selectNewsTotalRecords = (state) =>
	state.rootReducer.newsLibrary.totalRecords;

export const selectNewsNoResultStatus = (state) =>
	state.rootReducer.newsLibrary.noResultStatus;

export const selectNewsResultStatusCalendar = (state) =>
	state.rootReducer.newsLibrary.noResultStatusCalendar;
