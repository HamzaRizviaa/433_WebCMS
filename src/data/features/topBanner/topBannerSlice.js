import { createSlice } from '@reduxjs/toolkit';
import { getBannerContent, getAllBanners } from './topBannerActions';
export * from './topBannerActions';

const initialState = {
	status: '',
	content: [],
	allBanners: [],
	getBannerStatus: '',
	getBannerContentState: false
};

const topBannerSlice = createSlice({
	name: 'topBanner',
	initialState,
	reducers: {
		resetBanner: () => initialState
	},
	extraReducers: (builder) => {
		// getBannerContent Action
		builder.addCase(getBannerContent.pending, (state) => {
			state.status = 'pending';
			state.getBannerContentState = true;
		});
		builder.addCase(getBannerContent.fulfilled, (state, action) => {
			state.content = action.payload;
			state.getBannerContentState = false;
		});
		builder.addCase(getBannerContent.rejected, (state) => {
			state.status = 'failed';
			state.getBannerContentState = false;
		});

		// getAllBanners Action
		builder.addCase(getAllBanners.pending, (state) => {
			state.status = 'pending';
			state.getBannerStatus = 'loading';
		});
		builder.addCase(getAllBanners.fulfilled, (state, action) => {
			state.allBanners = action.payload;
			state.getBannerStatus = 'success';
		});
		builder.addCase(getAllBanners.rejected, (state) => {
			state.status = 'failed';
			state.getBannerStatus = 'failed';
		});
	}
});

export const { resetBanner } = topBannerSlice.actions;

export default topBannerSlice.reducer;
