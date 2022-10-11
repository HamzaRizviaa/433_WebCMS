import { createAsyncThunk } from '@reduxjs/toolkit';
import { MediaLibraryService } from '../../services';

export const getMedia = createAsyncThunk(
	'mediaLibrary/getMedia',
	async ({
		page,
		order_type,
		sortby,
		q,
		startDate,
		endDate,
		fromCalendar = false
	}) => {
		let endPoint = `media/get-media?limit=20&page=1`;
		if (page) {
			endPoint = `media/get-media?limit=20&page=${page}`;
		}
		if (order_type && sortby) {
			endPoint += `&order_type=${order_type}&sort_by=${sortby}`;
		}
		if (q) {
			endPoint += `&q=${q}&is_search=true`;
		}
		if (startDate && endDate) {
			endPoint += `&start_date=${startDate}&end_date=${endDate}`;
		}
		const response = await MediaLibraryService.getMediaApi(endPoint);
		return { ...response.data.data, fromCalendar };
	}
);

export const getAllMedia = createAsyncThunk(
	'mediaLibrary/getAllMedia',
	async (limit) => {
		let endPoint = `media/get-limited-media`;
		if (limit) {
			endPoint += `?limit=${limit}`;
		}
		const response = await MediaLibraryService.getAllMediaApi(endPoint);
		if (response?.data?.data?.length > 0) {
			return response.data.data;
		} else {
			return [];
		}
	}
);

export const getMainCategories = createAsyncThunk(
	'mediaLibrary/getMainCategories',
	async () => {
		const response = await MediaLibraryService.getMainCategoriesApi();

		if (response?.data?.data?.length > 0) {
			return response.data.data;
		} else {
			return [];
		}
	}
);

export const getSpecificMedia = createAsyncThunk(
	'mediaLibrary/getSpecificMedia',
	async (id) => {
		const response = await MediaLibraryService.getSpecificMediaApi(id);
		if (response?.data?.data) {
			return response.data.data;
		} else {
			return [];
		}
	}
);

export const getMediaLabels = createAsyncThunk(
	'mediaLibrary/getMediaLabels',
	async () => {
		const result = await MediaLibraryService.getMediaLabelsApi();
		if (result?.data?.data?.length > 0) {
			return result.data.data;
		} else {
			return [];
		}
	}
);
