import { configureStore } from '@reduxjs/toolkit';
import postLibraryReducer from '../pages/PostLibrary/postLibrarySlice';
import mediaDropdownReducer from '../components/posts/uploadOrEditPost/mediaDropdownSlice';
import editButtonReducer from '../components/posts/uploadOrEditPost/editButtonSlice';

const store = configureStore({
	reducer: {
		postLibrary: postLibraryReducer,
		mediaDropdown: mediaDropdownReducer,
		editButton: editButtonReducer
	}
});

export default store;
