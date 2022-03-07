import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import TopBannerService from './topBannerService';

export const getBannerContent = createAsyncThunk(
	'topBanner/getBannerContent',
	async () => {
		const result = await TopBannerService.getBannerContentApi();
		// console.log(result);
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
		content: []
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
		}
	}
});

export default topBannerSlice.reducer;
