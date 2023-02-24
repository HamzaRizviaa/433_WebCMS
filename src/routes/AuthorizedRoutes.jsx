import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import Unauthorized from '../pages/Unauthorized';
import { usePermissionsAccessControl } from '../hooks';

const pathnameToLibraryNameMapper = {
	'/news-library': 'News',
	'/media-library': 'Media',
	'/question-library': 'Questions',
	'/viral-library': 'Virals',
	'/article-library': 'Articles',
	'/rule-library': 'Rules',
	'/user-management-library': 'User Management',
	'/top-banner': 'Banners'
};

const AuthorizedRoutes = () => {
	const { pathname } = useLocation();

	const { permissions } = usePermissionsAccessControl(
		pathnameToLibraryNameMapper[pathname]
	);

	const isAuthorized = permissions?.hasAccess;

	return isAuthorized ? <Outlet /> : <Unauthorized />;
};

export default AuthorizedRoutes;
