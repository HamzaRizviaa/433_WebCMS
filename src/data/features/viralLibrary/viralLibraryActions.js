import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ViralLibraryService } from '../../services';

export const getAllViralsApi = createAsyncThunk(
	'viralLibary/getAllViralsApi',
	async (params = {}) => {
		const { data: virals } = await ViralLibraryService.getAllViralsServiceCall(
			params
		);
		return virals.data;
	}
);

export const getLabels = createAsyncThunk(
	'viralLibary/getViralsLabels',
	async () => {
		const result = await ViralLibraryService.getLabelsApi();
		if (result?.data?.data?.length > 0) {
			return result.data.data;
		} else {
			return [];
		}
	}
);

export const getSpecificViral = createAsyncThunk(
	'editButton/getSpecificViral', // not url , url is in services
	async (id) => {
		const response = await ViralLibraryService.getSpecificViralApi(id);
		if (response?.data?.data) {
			return response.data.data;
		} else {
			return [];
		}
	}
);

export const createOrEditViralThunk = createAsyncThunk(
	'viralLibary/createOrEditViralThunk',
	async (data) => {
		try {
			const response = await ViralLibraryService.postViral(data);
			console.log(response.data.data);

			if (response.data.status_code === 200) {
				toast.success(
					data.viral_id ? 'Viral has been edited!' : 'Viral has been created!'
				);
			}
		} catch (e) {
			toast.error(
				data.viral_id ? 'Failed to edit viral!' : 'Failed to create viral!'
			);
			console.error(e);
		}
	}
);

export const deleteViralThunk = createAsyncThunk(
	'viralLibary/deleteViralThunk',
	async (data) => {
		try {
			const response = await ViralLibraryService.deleteViral(data);

			if (response.data.status_code === 200) {
				toast.success('Viral has been deleted!');
			}
		} catch (e) {
			toast.error('Failed to delete Viral!');
			console.error(e);
		}
	}
);
