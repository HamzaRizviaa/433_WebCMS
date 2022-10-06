import { configureStore } from '@reduxjs/toolkit';
import postLibraryReducer from '../pages/PostLibrary/postLibrarySlice';
import mediaLibraryReducer from '../pages/MediaLibrary/mediaLibrarySlice';
import questionLibraryReducer from '../pages/QuestionLibrary/questionLibrarySlice';
import viralLibraryReducer from '../pages/ViralLibrary/viralLibararySlice';
import articleLibraryReducer from '../pages/ArticleLibrary/articleLibrarySlice';
import topBannerReducer from '../pages/TopBanner/topBannerSlice';
import gamesLibraryReducer from '../pages/GamesLibrary/gamesLibrarySlice';
import newsLibraryReducer from '../pages/NewsLibrary/newsLibrarySlice';
import remoteConfigSlice from './remoteConfigSlice';

const store = configureStore({
	reducer: {
		postLibrary: postLibraryReducer,
		mediaLibraryOriginal: mediaLibraryReducer,
		questionLibrary: questionLibraryReducer,
		topBanner: topBannerReducer,
		ViralLibraryStore: viralLibraryReducer,
		ArticleLibraryStore: articleLibraryReducer,
		GamesLibraryStore: gamesLibraryReducer,
		NewsLibrary: newsLibraryReducer,
		remoteConfig: remoteConfigSlice
	}
});

export default store;
