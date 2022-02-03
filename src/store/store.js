import { configureStore } from '@reduxjs/toolkit';
import postLibraryReducer from '../pages/PostLibrary/postLibrarySlice';
import mediaLibraryReducer from '../pages/MediaLibrary/mediaLibrarySlice';

const store = configureStore({
	reducer: {
		postLibrary: postLibraryReducer,
		mediaLibraryOriginal: mediaLibraryReducer
	}
});

export default store;
