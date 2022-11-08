export const selectSpecificViral = (state) =>
	state.rootReducer.viralLibrary.specificViral;

export const selectSpecificViralStatus = (state) =>
	state.rootReducer.viralLibrary.specificViralStatus;

export const selectLabels = (state) => state.rootReducer.postsLibrary.labels;
