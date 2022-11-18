import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { MediaLibraryService } from '../../services';
import { ToastErrorNotifications } from '../../../data/constants';

export const getMedia = createAsyncThunk(
	'mediaLibrary/getMedia',
	async (params = {}) => {
		const { data: media } = await MediaLibraryService.getMediaApi(params);
		return media.data;
	}
);

export const getAllMedia = createAsyncThunk(
	'mediaLibrary/getAllMedia',
	async (params = {}) => {
		// let endPoint = `media/get-limited-media`;
		// if (limit) {
		// 	endPoint += `?limit=${limit}`;
		// }
		const { data: media } = await MediaLibraryService.getMediaApi(params);
		return media.data || [];
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

export const createOrEditMediaThunk = createAsyncThunk(
	'mediaLibrary/createOrEditMediaThunk',
	async (data) => {
		try {
			const response = await MediaLibraryService.postMedia(data);

			if (response.data.status_code === 200) {
				toast.success(
					data.media_id ? 'Media has been edited!' : 'Media has been created!'
				);
			}
		} catch (e) {
			toast.error(
				data.media_id ? 'Failed to edit media!' : 'Failed to create media!'
			);
			console.error(e);
			throw new Error(e);
		}
	}
);

export const deleteMediaThunk = createAsyncThunk(
	'mediaLibrary/deleteMediaThunk',
	async (data) => {
		try {
			const response = await MediaLibraryService.deleteMedia(data);

			if (response.data.status_code === 200) {
				response.data?.data?.is_deleted
					? toast.success('Media has been deleted!')
					: toast.error(ToastErrorNotifications.deleteBannerItemText);
			}
		} catch (e) {
			toast.error('Failed to delete Media!');
			console.error(e);
			throw new Error(e);
		}
	}
);
