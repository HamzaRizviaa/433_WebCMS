import { configureStore } from '@reduxjs/toolkit';
import postLibraryReducer from '../pages/PostLibrary/postLibrarySlice';
import mediaLibraryReducer from '../pages/MediaLibrary/mediaLibrarySlice';
import quizLibraryReducer from '../pages/QuizLibrary/quizLibrarySlice';

const store = configureStore({
	reducer: {
		postLibrary: postLibraryReducer,
		mediaLibraryOriginal: mediaLibraryReducer,
		quizLibrary: quizLibraryReducer
	}
});

export default store;
