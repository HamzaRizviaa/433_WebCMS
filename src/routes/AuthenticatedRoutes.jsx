import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getLocalStorageDetails } from '../data/utils';
import MainLayout from '../components/layouts/MainLayout';

const AuthenticatedRoutes = () => {
	const { pathname } = useLocation();
	const localStorageData = getLocalStorageDetails();

	if (!localStorageData) {
		return <Navigate to='/sign-in' state={{ from: pathname }} />;
	}

	return <MainLayout />;
};

export default AuthenticatedRoutes;
