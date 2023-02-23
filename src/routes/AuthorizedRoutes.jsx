import React from 'react';
import { Outlet } from 'react-router-dom';
import Unauthorized from '../pages/Unauthorized';

const AuthorizedRoutes = () => {
	const isAuthorized = false;

	return isAuthorized ? <Outlet /> : <Unauthorized />;
};

export default AuthorizedRoutes;
