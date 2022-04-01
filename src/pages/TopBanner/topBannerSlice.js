import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import TopBannerService from './topBannerService';

export const getBannerContent = createAsyncThunk(
	'topBanner/getBannerContent',
	async ({ type, title }) => {
		// console.log(type, 'type');
		// console.log(title, 'title');
		let endPoint = `top-banner/get-content?type=home`;
		if (type) {
			endPoint = `top-banner/get-content?type=${type}`;
		}
		if (title) {
			endPoint += `&title=${title}`;
		}
		const result = await TopBannerService.getBannerContentApi(endPoint);
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
			state.status = 'pending';
		},
		[getBannerContent.fulfilled]: (state, action) => {
			state.content = action.payload;
		},
		[getBannerContent.rejected]: (state) => {
			state.status = 'failed';
		},
		[getAllBanners.pending]: (state) => {
			state.status = 'pending';
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
