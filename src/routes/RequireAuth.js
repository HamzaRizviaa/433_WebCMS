import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { getLocalStorageDetails } from '../utils';

const RequireAuth = ({ component }) => {
	//let location = useLocation();

	let localStorageData = getLocalStorageDetails();

	if (!localStorageData) {
		return <Navigate to='/sign-in' />;
	}

	return component;
};
RequireAuth.propTypes = {
	component: PropTypes.any
};

export default RequireAuth;
