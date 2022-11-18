/**
 * @module features/viralLibraryActions
 * @description The viralLibraryActions module contains all the asynchronous action handlers related to virals slice
 */

import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ViralLibraryService } from '../../services';

/**
 * This action handler is responsible for the fetching of all virals.
 * See {@link ViralLibraryService} if you are interested in the getAllViralsServiceCall function
 * which is used inside this action handler.
 * @type {Function}
 * @param {*} params - Query params on which the records should be filtered out
 * @returns The data object from the API response
 */
export const getAllViralsApi = createAsyncThunk(
	'viralLibary/getAllViralsApi',
	async (params = {}) => {
		const { data: virals } = await ViralLibraryService.getAllViralsServiceCall(
			params
		);
		return virals.data;
	}
);

/**
 * This action handler is responsible for the fetching of all lables.
 * See {@link ViralLibraryService} if you are interested in the getLabelsApi function
 * which is used inside this action handler.
 * @type {Function}
 * @returns The data object from the API response
 */
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

/**
 * This action handler is responsible for the fetching of a single viral by id.
 * See {@link ViralLibraryService} if you are interested in the getSpecificViral function
 * which is used inside this action handler.
 * @type {Function}
 * @param {string} id - The id of the viral
 * @returns The data object from the API response
 */
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

/**
 * This action handler is responsible for the creation and updation of a viral.
 * See {@link ViralLibraryService} if you are interested in the createOrEditViralThunk function
 * which is used inside this action handler.
 * @type {Function}
 * @param {Object} data - The data field contains the properties of a viral
 */
export const createOrEditViralThunk = createAsyncThunk(
	'viralLibary/createOrEditViralThunk',
	async (data) => {
		try {
			const response = await ViralLibraryService.postViral(data);

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
			throw new Error(e);
		}
	}
);

/**
 * This action handler is responsible for the deletion of a viral.
 * See {@link ViralLibraryService} if you are interested in the deleteViral function
 * which is used inside this action handler.
 * @type {Function}
 * @param {Object} data - The data field contains the viral_id and is_draft properties
 */
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
