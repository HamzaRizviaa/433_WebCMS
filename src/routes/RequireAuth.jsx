import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { getLocalStorageDetails } from '../data/utils';
import MainLayout from '../components/layouts/MainLayout';

const RequireAuth = () => {
	const { pathname } = useLocation();
	const localStorageData = getLocalStorageDetails();

	if (!localStorageData) {
		return <Navigate to='/sign-in' state={{ from: pathname }} />;
	}

	return <MainLayout />;
};

RequireAuth.propTypes = {
	component: PropTypes.any
};

export default RequireAuth;
