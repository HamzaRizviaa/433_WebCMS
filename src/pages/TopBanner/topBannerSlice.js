import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import TopBannerService from './topBannerService';

export const getBannerContent = createAsyncThunk(
	'topBanner/getBannerContent',
	async ({ type, title, exclude = [] }) => {
		let endPoint = `top-banner/get-content?type=home`;
		if (type) {
			endPoint = `top-banner/get-content?type=${type}`;
		}
		if (title) {
			endPoint += `&title=${title}`;
		}
		if (exclude.length) {
			let arrStr = JSON.stringify(exclude);
			endPoint = `top-banner/get-content?exclude=${arrStr}`;
		}
		const result = await TopBannerService.getBannerContentApi(endPoint);

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
		allBanners: [],
		getBannerStatus: '',
		getBannerContentState: false
	},
	reducers: {
		resetBanner: (state) => {
			state.allBanners = [];
			state.getBannerContentState = false;
			state.content = [];
		}
	},
	extraReducers: {
		[getBannerContent.pending]: (state) => {
			state.status = 'pending';
		},
		[getBannerContent.fulfilled]: (state, action) => {
			state.content = action.payload;
			state.getBannerContentState = true;
		},
		[getBannerContent.rejected]: (state) => {
			state.status = 'failed';
		},
		[getAllBanners.pending]: (state) => {
			state.status = 'pending';
			state.getBannerStatus = 'loading';
		},
		[getAllBanners.fulfilled]: (state, action) => {
			state.allBanners = action.payload;
			state.getBannerStatus = 'success';
		},
		[getAllBanners.rejected]: (state) => {
			state.status = 'failed';
			state.getBannerStatus = 'failed';
		}
	}
});

export const { resetBanner } = topBannerSlice.actions;

export default topBannerSlice.reducer;
