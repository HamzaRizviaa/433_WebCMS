import { createAsyncThunk } from '@reduxjs/toolkit';
import { TopBannerService } from '../../services';

export const getBannerContent = createAsyncThunk(
	'topBanner/getBannerContent',
	async ({ type, title, exclude }) => {
		const params = {
			type: type || 'home',
			title: title || null,
			exclude
		};

		const result = await TopBannerService.getBannerContentApi(params);

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
