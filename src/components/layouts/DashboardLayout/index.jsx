import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import theme from '../../../assets/theme';
import Sidebar from '../../common/DashboardSidebar';
import Topbar from '../../common/DashboardTopbar';
import PrimaryLoader from '../../ui/loaders/PrimaryLoader';
import { useLayoutStyles } from './index.style';

const DashboardLayout = ({
	title,
	onButtonClick,
	isSearchFilterError = false,
	isDateFilterError = false,
	hideBtn = false,
	hideSearchFilter = false,
	hideDateFilter = false,
	isLoading = false,
	children
}) => {
	const navigate = useNavigate();

	useEffect(() => {
		const expiryDate = Date.parse(localStorage.getItem('token_expire_time'));
		const currentDate = new Date();
		const timeDifferenceMinutes = (expiryDate - currentDate) / 1000 / 60; //in minutes

		if (timeDifferenceMinutes <= 1) {
			alert('Your session has expired');
			localStorage.removeItem('user_data');
			localStorage.removeItem('token_expire_time');
			navigate('/sign-in');
		}
	}, []);

	const classes = useLayoutStyles();

	return (
		<PrimaryLoader loading={isLoading} mainPage>
			<ThemeProvider theme={theme}>
				<div className={classes.root}>
					<Sidebar />
					<div className={classes.contentWrapper}>
						<Topbar
							title={title}
							onButtonClick={onButtonClick}
							isSearchFilterError={isSearchFilterError}
							isDateFilterError={isDateFilterError}
							hideBtn={hideBtn}
							hideSearchFilter={hideSearchFilter}
							hideDateFilter={hideDateFilter}
						/>
						{children}
					</div>
				</div>
			</ThemeProvider>
		</PrimaryLoader>
	);
};

DashboardLayout.propTypes = {
	title: PropTypes.string.isRequired,
	onButtonClick: PropTypes.func,
	isSearchFilterError: PropTypes.bool,
	isDateFilterError: PropTypes.bool,
	hideBtn: PropTypes.bool,
	hideSearchFilter: PropTypes.bool,
	hideDateFilter: PropTypes.bool,
	isLoading: PropTypes.bool,
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element)
	]).isRequired
};

export default DashboardLayout;
