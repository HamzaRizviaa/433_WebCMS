import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { ArticleLibraryService } from '../../services';

export const getAllArticlesApi = createAsyncThunk(
	'articlesLibrary/getAllArticlesApi',
	async (params = {}) => {
		const { data: articles } =
			await ArticleLibraryService.getAllArticlesServiceCall(params);

		return articles.data;
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

export const createOrEditArticleThunk = createAsyncThunk(
	'articleLibary/createOrEditArticleThunk',
	async (data) => {
		try {
			const response = await ArticleLibraryService.postArticle(data);

			if (response.data.status_code === 200) {
				toast.success(
					data.article_id ? 'Article has been edited!' : 'Article has been created!'
				);
			}
		} catch (e) {
			toast.error(
				data.article_id ? 'Failed to edit Article!' : 'Failed to create Article!'
			);
			console.error(e);
			throw new Error(e);
		}
	}
);

export const deleteArticleThunk = createAsyncThunk(
	'articleLibary/deleteArticleThunk',
	async (data) => {
		try {
			const response = await ArticleLibraryService.deleteArticle(data);

			if (response.data.status_code === 200) {
				toast.success('Article has been deleted!');
			}
		} catch (e) {
			toast.error('Failed to delete Article!');
			console.error(e);
		}
	}
);
