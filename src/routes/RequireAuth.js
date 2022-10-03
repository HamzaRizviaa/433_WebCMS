import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { getLocalStorageDetails } from '../data/utils';

const RequireAuth = ({ component }) => {
	const localStorageData = getLocalStorageDetails();

	if (!localStorageData) {
		return <Navigate to='/sign-in' />;
	}

	return component;
};

RequireAuth.propTypes = {
	component: PropTypes.any
};

export default RequireAuth;
