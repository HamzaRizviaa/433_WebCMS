/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PostLibrary from '../pages/PostLibrary/PostLibrary';
import MediaLibrary from '../pages/MediaLibrary/MediaLibrary';
import QuizLibrary from '../pages/QuizLibrary/QuizLibrary';
import TopBanner from '../pages/TopBanner/TopBanner.jsx';
import SignIn from '../pages/SignIn/SignIn';
import ViralLibrary from '../pages/ViralLibrary/ViralLibrary';
import RequireAuth from './RequireAuth.js';
const AppRoutes = () => {
	const [loginData, setLoginData] = useState(
		localStorage.getItem('user_data')
			? JSON.parse(localStorage.getItem('user_data'))
			: null
	);

	return (
		<>
			<Routes>
				<Route
					exact
					path='/sign-in'
					element={<SignIn setLoginData={setLoginData} />}
				/>
				<Route
					path='/post-library'
					element={<RequireAuth component={<PostLibrary />} />}
				/>

				<Route
					exact
					path='/media-library'
					element={<RequireAuth component={<MediaLibrary />} />}
				/>
				<Route
					exact
					path='/quiz-library'
					element={<RequireAuth component={<QuizLibrary />} />}
				/>
				<Route
					exact
					path='/top-banner'
					element={<RequireAuth component={<TopBanner />} />}
				/>
				<Route
					exact
					path='/viral-library'
					element={<RequireAuth component={<ViralLibrary />} />}
				/>

				<Route path='*' element={<Navigate to='/sign-in' />} />
			</Routes>
		</>
	);
};

export default AppRoutes;
