import { configureStore } from '@reduxjs/toolkit';
import postLibraryReducer from '../pages/PostLibrary/postLibrarySlice';
import mediaLibraryReducer from '../pages/MediaLibrary/mediaLibrarySlice';
import questionLibraryReducer from '../pages/QuestionLibrary/questionLibrarySlice';
import viralLibraryReducer from '../pages/ViralLibrary/viralLibararySlice';
import articleLibraryReducer from '../pages/ArticleLibrary/articleLibrarySlice';
import topBannerReducer from '../pages/TopBanner/topBannerSlice';

const store = configureStore({
	reducer: {
		postLibrary: postLibraryReducer,
		mediaLibraryOriginal: mediaLibraryReducer,
		questionLibrary: questionLibraryReducer,
		topBanner: topBannerReducer,
		ViralLibraryStore: viralLibraryReducer,
		ArticleLibraryStore: articleLibraryReducer
	}
});

export default store;
