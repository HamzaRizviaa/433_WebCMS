export const selectBannerContentState = (state) =>
	state.rootReducer.topBanner.getBannerContentState;

export const selectBannerStatus = (state) =>
	state.rootReducer.topBanner.getBannerStatus;
