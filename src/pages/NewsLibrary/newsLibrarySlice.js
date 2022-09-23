import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import NewsLibraryService from './newsLibraryService';

// import NewsLibraryService from './newsLibraryService';
const mockNews = {
	id: '632c32afb93b899ea4940051',
	labels: [
		'TEST4',
		'QUOMAXIMEACCUSANTI',
		'NIHILHICNULLAQUAE',
		'AB',
		'13',
		'321',
		'A',
		'EXCEPTURIAQUOBLAN'
	],
	banner_title: 'draft title updated again',
	banner_description: 'draft description updated again',
	show_likes: true,
	show_comments: true,
	is_draft: false,
	translations: {
		en: {
			banner_title: 'draft title updated again',
			banner_description: 'draft description updated again'
		},
		de:{
			banner_title: 'draft title updated again Germen',
			banner_description: 'draft description updated again Germen'
		}
	},
	slides: [
		{
			id: '632cfc7e304eaa23b417795c',
			image: 'media/photos/fed9e969-84c8-4891-912c-8fadc4eafa9b.png',
			parent_id: '632c32afb93b899ea4940051',
			file_name: 'Screenshot 2022-09-06 at 12.12.01 PM.png',
			dropbox_url: '',
			title: 'slide 2 english',
			width: 1190,
			height: 344,
			description: 'slide 2 english desc',
			name: 'hello name',
			sort_order: 1,
			translations: {
				en: {
					name: 'hello name',
					description: 'slide 2 english desc',
				},
				de:{
					name: 'hello name German',
					description: 'slide 2 english desc German',
				}
			},
		},
		{
			id: '632cfc7e304eaa23b417795d',
			image: 'media/photos/4aa6b942-3c6b-49af-9b24-b4cbd3a9542b.jpeg',
			parent_id: '632c32afb93b899ea4940051',
			file_name: '64390d22-0285-4036-91fe-22a5595a7a08_1080p.0000000 (1).jpg',
			dropbox_url: '',
			title: '123 updated eng',
			width: 1920,
			height: 1080,
			description: '123 updated',
			name: '41234',
			sort_order: 2,
			translations: {
				en: {
					name: '41234',
					description: '123 updated',
				},
				de:{
					name: '41234 name German',
					description: '123 updated German',
				}
			},
		},
		{
			id: '632cfc7e304eaa23b417795e',
			image: 'media/photos/424fb9ef-858e-4733-ba58-241c1a215312.png',
			parent_id: '632c32afb93b899ea4940051',
			file_name: 'Screenshot 2022-09-06 at 12.12.01 PM.png',
			dropbox_url: 'empty url',
			title: 'Hello slide 3',
			width: 1190,
			height: 344,
			description: 'hello slide 3 desc',
			name: 'slide 3 ',
			sort_order: 3,
			translations: {
				en: {
					name: 'slide 3',
					description: 'hello slide 3 desc',
				},
				de:{
					name: 'slide 3 German',
					description: 'hello slide 3 descGerman',
				}
			},
		}
	]
};

export const getAllNews = createAsyncThunk(
	'newsLibary/getAllNews',
	async ({
		page,
		order_type,
		sortby,
		q,
		startDate,
		endDate,
		fromCalendar = false
	}) => {
		let endPoint = `news/all-news?limit=20&page=1`;
		if (page) {
			endPoint = `news/all-news?limit=20&page=${page}`;
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
		const result = await NewsLibraryService.getAllNewsApi(endPoint);

		return { ...result.data.data, fromCalendar };
	}
);

export const getSpecificNews = createAsyncThunk(
	'editButton/getSpecificNews',
	async (id) => {
		const response = await NewsLibraryService.getSpecificNewsApi(id);
		if (response?.data?.data) {
			// return response.data.data;
			return mockNews
		} else {
			return [];
		}
	}
);
export const NewsLibrarySlice = createSlice({
	name: 'newsLibrary',
	initialState: {
		news: [],
		specificNews: [],
		openUploadPost: false,
		totalRecords: 0,
		noResultStatus: false,
		noResultStatusCalendar: false,
		specificNewsStatus: ''
	},
	reducers: {
		resetCalendarError: (state) => {
			state.noResultStatusCalendar = false;
		},
		resetNoResultStatus: (state) => {
			state.noResultStatus = false;
		}
	},
	extraReducers: {
		[getAllNews.pending]: (state) => {
			state.status = 'pending';
		},
		[getAllNews.fulfilled]: (state, action) => {
			state.news =
				action.payload.data.length > 0 ? action.payload.data : state.news;
			state.totalRecords =
				action.payload.data.length > 0
					? action.payload.total
					: state.totalRecords;
			state.status = 'success';
			if (action.payload.fromCalendar) {
				state.noResultStatusCalendar =
					action.payload.data.length > 0 ? false : true;
			} else {
				state.noResultStatus = action.payload.data.length > 0 ? false : true;
			}
		},
		[getAllNews.rejected]: (state) => {
			state.status = 'failed';
		},

		[getSpecificNews.pending]: (state) => {
			state.status = 'loading';
			state.specificNewsStatus = 'loading';
		},
		[getSpecificNews.fulfilled]: (state, action) => {
			state.specificNews = action.payload;
			state.status = 'success';
			state.specificNewsStatus = 'success';
		},
		[getSpecificNews.rejected]: (state) => {
			state.status = 'failed';
			state.specificNewsStatus = 'failed';
		}
	}
});

export const { resetCalendarError, resetNoResultStatus } =
	NewsLibrarySlice.actions;

export default NewsLibrarySlice.reducer;
