import { combineReducers } from '@reduxjs/toolkit';
import topBanner from './topBanner/topBannerSlice';
import articleLibrary from './articleLibrary/articleLibrarySlice';
import gamesLibrary from './gamesLibrary/gamesLibrarySlice';
import mediaLibrary from './mediaLibrary/mediaLibrarySlice';
import newsLibrary from './newsLibrary/newsLibrarySlice';
import postsLibrary from './postsLibrary/postsLibrarySlice';
import questionsLibrary from './questionsLibrary/questionsLibrarySlice';
import viralLibrary from './viralLibrary/viralLibrarySlice';
import remoteConfig from './remoteConfigSlice';

const rootReducer = combineReducers({
	topBanner,
	articleLibrary,
	gamesLibrary,
	mediaLibrary,
	newsLibrary,
	postsLibrary,
	questionsLibrary,
	viralLibrary,
	remoteConfig
});

export default rootReducer;
