export const selectBannerContentState = (state) =>
	state.rootReducer.topBanner.getBannerContentState;

export const selectBannerStatus = (state) =>
	state.rootReducer.topBanner.getBannerStatus;

export const selectBannerContent = (state) =>
	state.rootReducer.topBanner.content;

export const selectAllBanners = (state) =>
	state.rootReducer.topBanner.allBanners;
