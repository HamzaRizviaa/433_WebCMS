import { createAsyncThunk } from '@reduxjs/toolkit';
import { ArticleLibraryService } from '../../services';

export const getAllArticlesApi = createAsyncThunk(
	'articlesLibrary/getAllArticlesApi',
	async ({
		page,
		order_type,
		sortby,
		q,
		startDate,
		endDate,
		fromCalendar = false
	}) => {
		let endPoint = `article/all-articles?limit=20&page=1`;

		if (page) {
			endPoint = `article/all-articles?limit=20&page=${page}`;
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

		const result = await ArticleLibraryService.getAllArticlesServiceCall(
			endPoint
		);
		return { ...result.data.data, fromCalendar };
	}
);

export const getLabels = createAsyncThunk(
	'articlesLibrary/getArticlesLabels',
	async () => {
		const result = await ArticleLibraryService.getLabelsApi();
		if (result?.data?.data?.length > 0) {
			return result.data.data;
		} else {
			return [];
		}
	}
);

export const getSpecificArticle = createAsyncThunk(
	'editButton/getSpecificArticle',
	async (id) => {
		const response = await ArticleLibraryService.getSpecificArticleApi(id);
		if (response?.data?.data) {
			return response.data.data;
		} else {
			return [];
		}
	}
);

export const getArticleMainCategories = createAsyncThunk(
	'articleLibary/getMainCategories',
	async () => {
		const response = await ArticleLibraryService.getArticleMainCategoriesApi();
		if (response?.data?.data) {
			return response.data.data;
		} else {
			return [];
		}
	}
);

export const getArticleSubCategories = createAsyncThunk(
	'articleLibary/getSubCategories',
	async (id) => {
		const response = await ArticleLibraryService.getArticleSubCategoriesApi(id); //id  - main category id
		if (response?.data?.data) {
			return response.data.data;
		} else {
			return [];
		}
	}
);
