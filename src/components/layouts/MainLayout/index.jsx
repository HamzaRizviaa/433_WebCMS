import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import theme from '../../../assets/theme';
import Sidebar from '../../common/DashboardSidebar';
import { AuthService } from '../../../data/services';
import { checkIfTokenExpired } from '../../../data/helpers/commonHelpers';

let isTokenExpired = checkIfTokenExpired();

const MainLayout = () => {
	const { pathname } = useLocation();

	if (isTokenExpired) {
		toast.error('Your session has expired', { position: 'top-center' });
		AuthService.removeTokenFromLocalStorage();
		isTokenExpired = false;
		return (
			<Navigate to='/sign-in?session=expired' state={{ from: pathname }} />
		);
	}

	return (
		<ThemeProvider theme={theme}>
			<div style={{ display: 'flex' }}>
				<Sidebar />
				<Outlet />
			</div>
		</ThemeProvider>
	);
};

export default MainLayout;
