import { createAsyncThunk } from '@reduxjs/toolkit';
import { GamesLibraryService } from '../../services';

export const getAllGames = createAsyncThunk(
	'gamesLibrary/getMedia',
	async ({
		page,
		order_type,
		sortby,
		q,
		startDate,
		endDate,
		fromCalendar = false
	}) => {
		let endPoint = `games/all-games?limit=20&page=1`;

		if (page) {
			endPoint = `games/all-games?limit=20&page=${page}`;
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

		const response = await GamesLibraryService.getGamesApi(endPoint);
		return { ...response.data.data, fromCalendar };
	}
);

export const getLabels = createAsyncThunk(
	'gamesLibrary/getMediaLabels',
	async () => {
		const result = await GamesLibraryService.getLabelsApi();
		if (result?.data?.data?.length > 0) {
			return result.data.data;
		} else {
			return [];
		}
	}
);

export const getSpecificGame = createAsyncThunk(
	'editButton/getSpecificGame',
	async (id) => {
		const response = await GamesLibraryService.getSpecificGameApi(id);
		if (response?.data?.data) {
			return response.data.data;
		} else {
			return [];
		}
	}
);
