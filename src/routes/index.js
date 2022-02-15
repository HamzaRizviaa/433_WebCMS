import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PostLibrary from '../pages/PostLibrary/PostLibrary';
import MediaLibrary from '../pages/MediaLibrary/MediaLibrary';
import QuizLibrary from '../pages/QuizLibrary/QuizLibrary';
import TopBanner from '../pages/TopBanner/TopBanner';

const AppRoutes = () => {
	return (
		<>
			<Routes>
				<Route path='/post-library' element={<PostLibrary />} />
				<Route path='/media-library' element={<MediaLibrary />} />
				<Route path='/quiz-library' element={<QuizLibrary />} />
				<Route path='/top-banner' element={<TopBanner />} />
				<Route path='/' element={<Navigate replace to='/post-library' />} />
			</Routes>
		</>
	);
};

export default AppRoutes;
