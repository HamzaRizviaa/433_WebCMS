export const getRules = (state) => state.rootReducer.rulesSlice;

export const getGeoblockingQuestionsFeatureFlag = (state) =>
	state.rootReducer.remoteConfig.features.geoblockingRestrictionsQuestions;

export const rulesLibraryFeatureFlag = (state) =>
	state.rootReducer.remoteConfig.features.rulesLibrary;
