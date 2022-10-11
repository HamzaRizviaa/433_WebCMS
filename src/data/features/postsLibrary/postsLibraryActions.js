import { createAsyncThunk } from '@reduxjs/toolkit';
import { PostLibraryService } from "../../services";

export const getPosts = createAsyncThunk(
	'postLibary/getPosts',
	async ({
		page,
		order_type,
		sortby,
		q,
		startDate,
		endDate,
		fromCalendar = false
	}) => {
		let endPoint = `post/all-posts?limit=20&page=1`;
		if (page) {
			endPoint = `post/all-posts?limit=20&page=${page}`;
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
		const result = await PostLibraryService.getPostsApi(endPoint);
		return { ...result.data.data, fromCalendar };
	}
);

export const getPostLabels = createAsyncThunk(
	'postLibary/getPostLabels',
	async () => {
		const result = await PostLibraryService.getPostLabelsApi();
		if (result?.data?.data?.length > 0) {
			return result.data.data;
		} else {
			return [];
		}
	}
);

export const getSpecificPost = createAsyncThunk(
	'editButton/getSpecificPost',
	async (id) => {
		const response = await PostLibraryService.getSpecificPostApi(id);
		if (response?.data?.data) {
			return response.data.data;
		} else {
			return [];
		}
	}
);

//NEW LABELS ON SEARCH
export const getAllNewLabels = createAsyncThunk(
	'postLibary/getAllNewLabels',
	async () => {
		const result = await PostLibraryService.getAllNewLabels();
		if (result?.data?.data?.length > 0) {
			return result.data.data;
		} else {
			return [];
		}
	}
);

export const getNewLabelsSearch = createAsyncThunk(
	'postLibary/getNewLabelsSearch',
	async (params) => {
		const result = await PostLibraryService.getNewLabelsSearch(params);
		if (result?.data?.data?.length > 0) {
			return result.data.data;
		} else {
			return [];
		}
	}
);
