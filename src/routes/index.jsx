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
import RequireAuth from './RequireAuth';
import { getLocalStorageDetails } from '../data/utils';

/**
 * AppRoutes component where all the routing for the project is setup.
 * @component
 */
const AppRoutes = () => {
	const dispatch = useDispatch();
	const localStorageData = getLocalStorageDetails();

	useEffect(() => {
		if (localStorageData) {
			dispatch(fetchRules());
		}
	}, [localStorageData]);

	return (
		<Routes>
			<Route path='/sign-in' element={<SignIn />} />
			<Route path='/' element={<RequireAuth />}>
				<Route index element={<Navigate to='news-library' />} />
				<Route path='news-library' element={<NewsLibrary />} />
				<Route path='media-library' element={<MediaLibrary />} />
				<Route path='question-library' element={<QuestionLibrary />} />
				<Route path='top-banner' element={<TopBanner />} />
				<Route path='article-library' element={<ArticleLibrary />} />
				<Route path='viral-library' element={<ViralLibrary />} />
				<Route path='rule-library' element={<RuleLibrary />} />
			</Route>
			<Route path='*' element={<Navigate to='/sign-in' />} />
		</Routes>
	);
};

export default AppRoutes;
