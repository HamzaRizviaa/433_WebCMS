import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PostLibrary from '../pages/PostLibrary/PostLibrary';
import MediaLibrary from '../pages/MediaLibrary/MediaLibrary';
import QuizLibrary from '../pages/QuizLibrary/QuizLibrary';
import TopBanner from '../pages/TopBanner/TopBanner.jsx';
import SignIn from '../pages/SignIn/SignIn';
import ViralLibrary from '../pages/ViralLibrary/ViralLibrary';

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
					path='/sign-in'
					element={<SignIn setLoginData={setLoginData} />}
				/>
				<Route
					path='/post-library'
					element={loginData ? <PostLibrary /> : <SignIn />}
				/>
				<Route
					path='/media-library'
					element={loginData ? <MediaLibrary /> : <SignIn />}
				/>
				<Route
					path='/quiz-library'
					element={loginData ? <QuizLibrary /> : <SignIn />}
				/>
				<Route
					path='/top-banner'
					element={loginData ? <TopBanner /> : <SignIn />}
				/>
				<Route
					path='/viral-library'
					element={loginData ? <ViralLibrary /> : <SignIn />}
				/>
				<Route path='/' element={<Navigate replace to='/sign-in' />} />
			</Routes>
		</>
	);
};

export default AppRoutes;
