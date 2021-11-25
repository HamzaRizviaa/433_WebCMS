import { configureStore } from '@reduxjs/toolkit';
import postLibraryReducer from '../pages/PostLibrary/postLibrarySlice';

const store = configureStore({
	reducer: {
		postLibrary: postLibraryReducer
	}
});

export default store;
