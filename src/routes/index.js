import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PostLibrary from '../pages/PostLibrary/PostLibrary';
import MediaLibrary from '../pages/MediaLibrary/MediaLibrary';
import QuizLibrary from '../pages/QuizLibrary/QuizLibrary';
import TopBanner from '../pages/TopBanner/TopBanner.jsx';
import SignIn from '../pages/SignIn/SignIn';

const AppRoutes = () => {
	return (
		<>
			<Routes>
				<Route path='/sign-in' element={<SignIn />} />
				<Route path='/post-library' element={<PostLibrary />} />
				<Route path='/media-library' element={<MediaLibrary />} />
				<Route path='/quiz-library' element={<QuizLibrary />} />
				<Route path='/top-banner' element={<TopBanner />} />
				<Route path='/' element={<Navigate replace to='/sign-in' />} />
			</Routes>
		</>
	);
};

export default AppRoutes;
