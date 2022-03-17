import { configureStore } from '@reduxjs/toolkit';
import postLibraryReducer from '../pages/PostLibrary/postLibrarySlice';
import mediaLibraryReducer from '../pages/MediaLibrary/mediaLibrarySlice';
import quizLibraryReducer from '../pages/QuizLibrary/quizLibrarySlice';
import viralLibraryReducer from '../pages/ViralLibrary/viralLibararySlice';
import articleLibraryReducer from '../pages/ArticleLibrary/articleLibrarySlice';
import topBannerReducer from '../pages/TopBanner/topBannerSlice';

const store = configureStore({
	reducer: {
		postLibrary: postLibraryReducer,
		mediaLibraryOriginal: mediaLibraryReducer,
		quizLibrary: quizLibraryReducer,
		topBanner: topBannerReducer,
		ViralLibraryStore: viralLibraryReducer,
		ArticleLibraryStore: articleLibraryReducer
	}
});

export default store;
