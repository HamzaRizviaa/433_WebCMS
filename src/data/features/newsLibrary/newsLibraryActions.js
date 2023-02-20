import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { NewsLibraryService } from '../../services';
import { ToastErrorNotifications } from '../../constants';

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
		try {
			const response = await NewsLibraryService.getSpecificNewsApi(id);
			if (response?.data?.data) {
				return response.data.data;
			} else {
				return [];
			}
		} catch (error) {
			console.error(error);
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
					data.news_id ? 'News has been edited!' : 'News has been created!'
				);
			}
		} catch (e) {
			toast.error(
				data.news_id ? 'Failed to edit news!' : 'Failed to create news!'
			);
			console.error(e);
			throw new Error(e);
		}
	}
);

export const deleteNewsThunk = createAsyncThunk(
	'newsLibary/deleteNewsThunk',
	async (data) => {
		try {
			const response = await NewsLibraryService.deleteNews(data);
			if (response.data.status_code === 200) {
				toast.success('News has been deleted!');
			}
		} catch (e) {
			if (e.response.status === 409) {
				toast.error(ToastErrorNotifications.deleteBannerItemText);
			} else {
				toast.error('Failed to delete News!');
			}
			console.error(e);
		}
	}
);
