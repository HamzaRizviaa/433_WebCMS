import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Libraries
import MediaLibrary from '../pages/MediaLibrary/MediaLibrary';
import QuestionLibrary from '../pages/QuestionLibrary/QuestionLibrary';
import TopBanner from '../pages/TopBanner/TopBanner.jsx';
import ViralLibrary from '../pages/ViralLibrary/ViralLibrary';
import ArticleLibrary from '../pages/ArticleLibrary/ArticleLibrary';
import NewsLibrary from '../pages/NewsLibrary/NewsLibrary';
import RuleLibrary from '../pages/RuleLibrary/RuleLibrary';
import { fetchRules } from '../data/features/ruleLibrary/ruleLibraryActions';
import SignIn from '../pages/SignIn/SignIn';
import RequireAuth from './RequireAuth.js';
import { getLocalStorageDetails } from '../data/utils';
// import { rulesLibraryFeatureFlag } from '../data/selectors';

// import GamesLibrary from '../pages/GamesLibrary/GamesLibrary';
// import PostLibrary from '../pages/PostLibrary/PostLibrary';

/**
 * AppRoutes component where all the routing for the project is setup.
 * @component
 */
const AppRoutes = () => {
	const dispatch = useDispatch();
	const localStorageData = getLocalStorageDetails();
	// const rulesLibraryFeature = useSelector(rulesLibraryFeatureFlag);
	// const isRulesLibraryEnabled = rulesLibraryFeature?._value === 'true';

	useEffect(() => {
		if (localStorageData) {
			dispatch(fetchRules());
		}
	}, [localStorageData]);

	return (
		<Routes>
			<Route exact path='/sign-in' element={<SignIn />} />
			<Route
				exact
				path='/news-library'
				element={<RequireAuth component={<NewsLibrary />} />}
			/>

			<Route
				exact
				path='/media-library'
				element={<RequireAuth component={<MediaLibrary />} />}
			/>
			<Route
				exact
				path='/question-library'
				element={<RequireAuth component={<QuestionLibrary />} />}
			/>
			<Route
				exact
				path='/top-banner'
				element={<RequireAuth component={<TopBanner />} />}
			/>
			<Route
				exact
				path='/article-library'
				element={<RequireAuth component={<ArticleLibrary />} />}
			/>
			<Route
				exact
				path='/viral-library'
				element={<RequireAuth component={<ViralLibrary />} />}
			/>
			<Route
				exact
				path='/rule-library'
				element={<RequireAuth component={<RuleLibrary />} />}
			/>

			{/* <Route
				exact
				path='/games-library'
				element={<RequireAuth component={<GamesLibrary />} />}
			/>
			<Route
				path='/post-library'
				element={<RequireAuth component={<PostLibrary />} />}
			/> */}
			{/* <Route path='/testing' element={<Test />} /> */}
			<Route path='*' element={<Navigate to='/sign-in' />} />
		</Routes>
	);
};

export default AppRoutes;
