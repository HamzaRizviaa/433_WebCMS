import { createAsyncThunk } from '@reduxjs/toolkit';
import { NewsLibraryService } from '../../services';

export const getAllNews = createAsyncThunk(
	'newsLibary/getAllNews',
	async (params) => {
		const { data: news } = await NewsLibraryService.getAllNewsApi(params);

		return news.data;
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
