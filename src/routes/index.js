import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PostLibrary from '../pages/PostLibrary/PostLibrary';
import MediaLibrary from '../pages/MediaLibrary/MediaLibrary';

const AppRoutes = () => {
	return (
		<>
			<Routes>
				<Route path='/post-library' element={<PostLibrary />} />
				<Route path='/media-library' element={<MediaLibrary />} />
				<Route path='/' element={<Navigate replace to='/media-library' />} />
			</Routes>
		</>
	);
};

export default AppRoutes;
