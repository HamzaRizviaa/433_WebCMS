import { createAsyncThunk } from '@reduxjs/toolkit';
import { NewsLibraryService } from '../../services';

export const getAllNews = createAsyncThunk(
	'newsLibary/getAllNews',
	async ({
		page,
		order_type,
		sortby,
		q,
		startDate,
		endDate,
		fromCalendar = false
	}) => {
		let endPoint = `news/all-news?limit=20&page=1`;
		if (page) {
			endPoint = `news/all-news?limit=20&page=${page}`;
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
		const result = await NewsLibraryService.getAllNewsApi(endPoint);

		return { ...result.data.data, fromCalendar };
	}
);

export const getSpecificNews = createAsyncThunk(
	'editButton/getSpecificNews',
	async (id) => {
		const response = await NewsLibraryService.getSpecificNewsApi(id);
		if (response?.data?.data) {
			return response.data.data;
		} else {
			return [];
		}
	}
);
