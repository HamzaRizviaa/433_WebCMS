import { combineReducers } from '@reduxjs/toolkit';
import topBanner from './topBanner/topBannerSlice';
import articleLibrary from './articleLibrary/articleLibrarySlice';
import mediaLibrary from './mediaLibrary/mediaLibrarySlice';
import newsLibrary from './newsLibrary/newsLibrarySlice';
import postsLibrary from './postsLibrary/postsLibrarySlice';
import questionsLibrary from './questionsLibrary/questionsLibrarySlice';
import viralLibrary from './viralLibrary/viralLibrarySlice';
import remoteConfig from './remoteConfigSlice';
import rulesSlice from './rulesConfig';

const rootReducer = combineReducers({
	topBanner,
	articleLibrary,
	mediaLibrary,
	newsLibrary,
	postsLibrary,
	questionsLibrary,
	viralLibrary,
	remoteConfig,
	rulesSlice
});

export default rootReducer;
