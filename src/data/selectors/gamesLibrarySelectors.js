export const selectAllGames = (state) =>
	state.rootReducer.gamesLibrary.gamesData;

export const selectGamesApiStatus = (state) =>
	state.rootReducer.gamesLibrary.status;

export const selectGamesTotalRecords = (state) =>
	state.rootReducer.gamesLibrary.totalRecords;

export const selectGamesNoResultStatus = (state) =>
	state.rootReducer.gamesLibrary.noResultStatus;

export const selectGamesResultStatusCalendar = (state) =>
	state.rootReducer.gamesLibrary.noResultStatusCalendar;
