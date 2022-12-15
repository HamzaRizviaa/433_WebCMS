export const selectArticleLibrary = (state) => state.rootReducer.articleLibrary;

export const selectAllArticles = (state) =>
	state.rootReducer.articleLibrary.articles;

export const selectArticlesTotalRecords = (state) =>
	state.rootReducer.articleLibrary.totalRecords;

export const selectArticlesNoResult = (state) =>
	state.rootReducer.articleLibrary.noResultStatus;

export const selectArticlesResultStatusCalendar = (state) =>
	state.rootReducer.articleLibrary.noResultStatusCalendar;

export const selectSpecificArticle = (state) =>
	state.rootReducer.articleLibrary.specificArticle;

export const selectSpecificArticleStatus = (state) =>
	state.rootReducer.articleLibrary.specificArticleStatus;

export const selectArticleMainCategories = (state) =>
	state.rootReducer.articleLibrary.mainCategories;

export const selectArticleSubCategories = (state) =>
	state.rootReducer.articleLibrary.subCategories;
