import { createSlice } from '@reduxjs/toolkit';
import {
	getLabels,
	getAllArticlesApi,
	getSpecificArticle,
	getArticleMainCategories,
	getArticleSubCategories
} from './articleLibraryActions';
export * from './articleLibraryActions';

const initialState = {
	labels: [],
	articles: [],
	specificArticle: null,
	mainCategories: [],
	subCategories: [],
	totalRecords: 0,
	status: '',
	specificArticleStatus: '',
	openUploadPost: false,
	noResultStatus: false,
	noResultStatusCalendar: false,
	mainCategoriesStatus: false,
	subCategoriesStatus: false
};

const articlesLibrarySlice = createSlice({
	name: 'articlesLibrary',
	initialState,
	reducers: {
		resetCalendarError: (state) => {
			state.noResultStatusCalendar = false;
		},
		resetNoResultStatus: (state) => {
			state.noResultStatus = false;
		},
		resetSpecificArticle: (state) => {
			state.specificArticle = false;
		}
	},
	extraReducers: (builder) => {
		// Labels Actions
		builder.addCase(getLabels.fulfilled, (state, action) => {
			state.labels = action.payload;
		});

		// All Articles Actions
		builder.addCase(getAllArticlesApi.pending, (state) => {
			state.status = 'pending';
		});

		builder.addCase(getAllArticlesApi.fulfilled, (state, action) => {
			state.articles = action.payload.data;
			state.totalRecords = action.payload.total;
			state.status = 'success';
		});

		builder.addCase(getAllArticlesApi.rejected, (state) => {
			state.status = 'failed';
		});

		// Specific Articles Actions
		builder.addCase(getSpecificArticle.pending, (state) => {
			state.status = 'loading';
			state.specificArticleStatus = 'loading';
		});

		builder.addCase(getSpecificArticle.fulfilled, (state, action) => {
			state.specificArticle = action.payload;
			state.status = 'success';
			state.specificArticleStatus = 'success';
		});

		builder.addCase(getSpecificArticle.rejected, (state) => {
			state.status = 'failed';
			state.specificArticleStatus = 'failed';
		});

		// Main Categories Actions
		builder.addCase(getArticleMainCategories.pending, (state) => {
			state.mainCategoriesStatus = true;
		});

		builder.addCase(getArticleMainCategories.fulfilled, (state, action) => {
			state.mainCategories = action.payload;
			state.mainCategoriesStatus = false;
		});

		builder.addCase(getArticleMainCategories.rejected, (state) => {
			state.mainCategoriesStatus = false;
		});

		// Sub Categories Actions
		builder.addCase(getArticleSubCategories.pending, (state) => {
			state.subCategoriesStatus = true;
		});

		builder.addCase(getArticleSubCategories.fulfilled, (state, action) => {
			state.subCategories = action.payload;
			state.subCategoriesStatus = false;
		});

		builder.addCase(getArticleSubCategories.rejected, (state) => {
			state.subCategoriesStatus = false;
		});
	}
});

export const { resetCalendarError, resetNoResultStatus, resetSpecificArticle } =
	articlesLibrarySlice.actions;

export default articlesLibrarySlice.reducer;
