import { createAsyncThunk } from '@reduxjs/toolkit';
import { TopBannerService } from '../../services';

export const getBannerContent = createAsyncThunk(
	'topBanner/getBannerContent',
	async ({ type, title }) => {
		let endPoint = `top-banner/get-content?type=home`;
		if (type) {
			endPoint = `top-banner/get-content?type=${type}`;
		}
		if (title) {
			endPoint += `&title=${title}`;
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
