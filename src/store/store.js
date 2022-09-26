import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import postLibraryReducer from '../pages/PostLibrary/postLibrarySlice';
import mediaLibraryReducer from '../pages/MediaLibrary/mediaLibrarySlice';
import questionLibraryReducer from '../pages/QuestionLibrary/questionLibrarySlice';
import viralLibraryReducer from '../pages/ViralLibrary/viralLibararySlice';
import articleLibraryReducer from '../pages/ArticleLibrary/articleLibrarySlice';
import topBannerReducer from '../pages/TopBanner/topBannerSlice';
import gamesLibraryReducer from '../pages/GamesLibrary/gamesLibrarySlice';
import newsLibraryReducer from '../pages/NewsLibrary/newsLibrarySlice';
import rootRtkQuery from '../features/rootRTKQuery';

const store = configureStore({
	reducer: {
		[rootRtkQuery.reducerPath]: rootRtkQuery.reducer,
		postLibrary: postLibraryReducer,
		mediaLibraryOriginal: mediaLibraryReducer,
		questionLibrary: questionLibraryReducer,
		topBanner: topBannerReducer,
		ViralLibraryStore: viralLibraryReducer,
		ArticleLibraryStore: articleLibraryReducer,
		GamesLibraryStore: gamesLibraryReducer,
		NewsLibrary: newsLibraryReducer,
		//rtk root query
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(rootRtkQuery.middleware)
});

export default store;
setupListeners(store.dispatch);
