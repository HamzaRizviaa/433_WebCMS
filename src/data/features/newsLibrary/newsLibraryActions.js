import { createAsyncThunk } from '@reduxjs/toolkit';
import { NewsLibraryService } from '../../services';
import { toast } from 'react-toastify';

export const getAllNewsApi = createAsyncThunk(
	'newsLibary/getAllNews',
	async (params = {}) => {
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

export const createOrEditNewsThunk = createAsyncThunk(
	'newsLibrary/createOrEditNewsThunk',
	async (data) => {
		try {
			const response = await NewsLibraryService.postNews(data);

			if (response.data.status_code === 200) {
				toast.success(
					data.viral_id ? 'News has been edited!' : 'News has been created!'
				);
			}
		} catch (e) {
			toast.error(
				data.viral_id ? 'Failed to edit news!' : 'Failed to create news!'
			);
			console.error(e);
		}
	}
);

export const deleteNewsThunk = createAsyncThunk(
	'newsLibary/deleteNewsThunk',
	async (data) => {
		try {
			const response = await NewsLibraryService.deleteNews(data);

			if (response.data.status_code === 200) {
				toast.success('Viral has been deleted!');
			}
		} catch (e) {
			toast.error('Failed to delete Viral!');
			console.error(e);
		}
	}
);
