export const getRules = (state) => state.rootReducer.rulesSlice;

export const getGeoblockingFeatureFlag = (state) =>
	state.rootReducer.remoteConfig.features.geoblockingRestrictions;
