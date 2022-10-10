import { createAsyncThunk } from '@reduxjs/toolkit';
import { ViralLibraryService } from '../../services';

export const getAllViralsApi = createAsyncThunk(
	'viralLibary/getAllViralsApi',
	async (params) => {
		const result = await ViralLibraryService.getAllViralsServiceCall(params);
		return { ...result.data.data, fromCalendar: params.fromCalendar || false };
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
