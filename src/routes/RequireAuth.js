/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Route, Outlet, useLocation, Navigate } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
const RequireAuth = ({ component }) => {
	let location = useLocation();
	const [loginData, setLoginData] = useState(
		localStorage.getItem('user_data')
			? JSON.parse(localStorage.getItem('user_data'))
			: null
	);

	if (!loginData) {
		return <Navigate to='/sign-in' state={{ from: location }} replace />;
	}

	return component;
};
RequireAuth.propTypes = {
	data: PropTypes.bool,
	component: PropTypes.any,
	location: PropTypes.string
};

export default RequireAuth;
