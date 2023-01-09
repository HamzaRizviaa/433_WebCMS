/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../pages/SignIn/SignIn';
import RequireAuth from './RequireAuth.js';
// import Test from '../Test.jsx';

// Libraries
import MediaLibrary from '../pages/MediaLibrary/MediaLibrary';
import QuestionLibrary from '../pages/QuestionLibrary/QuestionLibrary';
import TopBanner from '../pages/TopBanner/TopBanner.jsx';
import ViralLibrary from '../pages/ViralLibrary/ViralLibrary';
import ArticleLibrary from '../pages/ArticleLibrary/ArticleLibrary';
import NewsLibrary from '../pages/NewsLibrary/NewsLibrary';
import RuleLibrary from '../pages/RuleLibrary/RuleLibrary';
import { fetchRules } from '../data/features/rulesConfig';
import { useDispatch } from 'react-redux';

// import GamesLibrary from '../pages/GamesLibrary/GamesLibrary';
// import PostLibrary from '../pages/PostLibrary/PostLibrary';

/**
 * AppRoutes component where all the routing for the project is setup.
 * @component
 */
const AppRoutes = () => {
	const [loginData, setLoginData] = useState(
		localStorage.getItem('user_data')
			? JSON.parse(localStorage.getItem('user_data'))
			: null
	);
	const dispatch = useDispatch();
	useEffect(() => {
		if (localStorage.getItem('user_data')) {
			dispatch(fetchRules());
		}
	}, [localStorage.getItem('user_data')]);
	return (
		<Routes>
			<Route
				exact
				path='/sign-in'
				element={<SignIn setLoginData={setLoginData} />}
			/>
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
