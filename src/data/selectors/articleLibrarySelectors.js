export const selectArticleLibrary = (state) => state.rootReducer.articleLibrary;

export const selectAllArticles = (state) =>
	state.rootReducer.articleLibrary.articles;

export const selectArticlesTotalRecords = (state) =>
	state.rootReducer.articleLibrary.totalRecords;

export const selectArticlesNoResult = (state) =>
	state.rootReducer.articleLibrary.noResultStatus;

export const selectArticlesResultStatusCalendar = (state) =>
	state.rootReducer.articleLibrary.noResultStatusCalendar;
