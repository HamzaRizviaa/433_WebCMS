import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import TopBannerService from './topBannerService';

export const getBannerContent = createAsyncThunk(
	'topBanner/getBannerContent',
	async (type, title) => {
		const result = await TopBannerService.getBannerContentApi(type, title);
		// console.log(result);
		if (result?.data?.data?.length > 0) {
			return result.data.data;
		} else {
			return [];
		}
	}
);

export const getAllBanners = createAsyncThunk(
	'topBanner/getAllBanners',
	async (type) => {
		const result = await TopBannerService.getAllBannersApi(type);
		if (result?.data?.data?.length > 0) {
			return result.data.data;
		} else {
			return [];
		}
	}
);

export const topBannerSlice = createSlice({
	name: 'topBanner',
	initialState: {
		content: [],
		allBanners: []
	},
	reducers: {},
	extraReducers: {
		[getBannerContent.pending]: (state) => {
			state.status = 'loading';
		},
		[getBannerContent.fulfilled]: (state, action) => {
			state.content = action.payload;
		},
		[getBannerContent.rejected]: (state) => {
			state.status = 'failed';
		},
		[getAllBanners.pending]: (state) => {
			state.status = 'loading';
		},
		[getAllBanners.fulfilled]: (state, action) => {
			state.allBanners = action.payload;
		},
		[getAllBanners.rejected]: (state) => {
			state.status = 'failed';
		}
	}
});

export default topBannerSlice.reducer;
