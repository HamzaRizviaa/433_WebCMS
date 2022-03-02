import { configureStore } from '@reduxjs/toolkit';
import postLibraryReducer from '../pages/PostLibrary/postLibrarySlice';
import mediaLibraryReducer from '../pages/MediaLibrary/mediaLibrarySlice';
import quizLibraryReducer from '../pages/QuizLibrary/quizLibrarySlice';
import viralLibraryReducer from '../pages/ViralLibrary/viralLibararySlice';

const store = configureStore({
	reducer: {
		postLibrary: postLibraryReducer,
		mediaLibraryOriginal: mediaLibraryReducer,
		quizLibrary: quizLibraryReducer,
		ViralLibraryStore: viralLibraryReducer
	}
});

export default store;
