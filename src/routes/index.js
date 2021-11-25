import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PostLibrary from '../pages/PostLibrary/PostLibrary';

const AppRoutes = () => {
	return (
		<>
			<Routes>
				<Route path='/post-library' element={<PostLibrary />} />
				<Route path='/' element={<Navigate replace to='/post-library' />} />
			</Routes>
		</>
	);
};

export default AppRoutes;
