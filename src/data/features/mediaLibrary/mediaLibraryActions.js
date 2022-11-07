import { createAsyncThunk } from '@reduxjs/toolkit';
import { MediaLibraryService } from '../../services';
import { toast } from 'react-toastify';

export const getMedia = createAsyncThunk(
	'mediaLibrary/getMedia',
	async (params = {}) => {
		const { data: media } = await MediaLibraryService.getMediaApi(params);
		return media.data;
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

export const createOrEditMediaThunk = createAsyncThunk(
	'mediaLibrary/createOrEditMediaThunk',
	async (data) => {
		try {
			const response = await MediaLibraryService.postMedia(data);

			if (response.data.status_code === 200) {
				toast.success(
					data.viral_id ? 'Media has been edited!' : 'Media has been created!'
				);
			}
		} catch (e) {
			toast.error(
				data.viral_id ? 'Failed to edit media!' : 'Failed to create media!'
			);
			console.error(e);
		}
	}
);

export const deleteMediaThunk = createAsyncThunk(
	'mediaLibrary/deleteMediaThunk',
	async (data) => {
		try {
			const response = await MediaLibraryService.deleteMedia(data);

			if (response.data.status_code === 200) {
				toast.success('Media has been deleted!');
			}
		} catch (e) {
			toast.error('Failed to delete Media!');
			console.error(e);
		}
	}
);
