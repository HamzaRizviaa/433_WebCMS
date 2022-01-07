import { configureStore } from '@reduxjs/toolkit';
import postLibraryReducer from '../pages/PostLibrary/postLibrarySlice';
import mediaDropdownReducer from '../components/posts/uploadOrEditPost/mediaDropdownSlice';
import editButtonReducer from '../components/posts/uploadOrEditPost/editButtonSlice';
import mediaLibraryReducer from '../components/media/uploadOrEditMedia/uploadOrEditMediaSlice';

const store = configureStore({
	reducer: {
		postLibrary: postLibraryReducer,
		mediaDropdown: mediaDropdownReducer,
		editButton: editButtonReducer,
		mediaLibrary: mediaLibraryReducer
	}
});

export default store;
