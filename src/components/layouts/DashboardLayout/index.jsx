import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { getAll, fetchAndActivate } from 'firebase/remote-config';
import { useDispatch } from 'react-redux';
import theme from '../../../assets/theme';
import Sidebar from '../../common/DashboardSidebar';
import Topbar from '../../common/DashboardTopbar';
import PrimaryLoader from '../../ui/loaders/PrimaryLoader';
import { remoteConfig } from '../../../data/integrations/firebase';
import { setRemoteConfig } from '../../../data/features/remoteConfigSlice';
import { useLayoutStyles } from './index.style';

const DashboardLayout = ({
	title,
	onButtonClick,
	secondaryButtonText,
	secondaryButtonClick,
	hideLibraryText = false,
	hideBtn = false,
	hideSearchFilter = false,
	hideDateFilter = false,
	isLoading = false,
	children
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		const expiryDate = Date.parse(localStorage.getItem('token_expire_time'));
		const currentDate = new Date();
		const timeDifferenceMinutes = (expiryDate - currentDate) / 1000 / 60; //in minutes

		// checking token expiry
		if (timeDifferenceMinutes <= 1) {
			alert('Your session has expired');
			localStorage.removeItem('user_data');
			localStorage.removeItem('token_expire_time');
			navigate('/sign-in');
		}

		// Setting firebase config
		fetchAndActivate(remoteConfig)
			.then(() => {
				let configs = getAll(remoteConfig);
				dispatch(setRemoteConfig(configs));
			})
			.catch((err) => {
				console.log('err fetch and activate', err);
				dispatch(setRemoteConfig({}));
			});
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
							secondaryButtonText={secondaryButtonText}
							secondaryButtonClick={secondaryButtonClick}
							hideBtn={hideBtn}
							hideSearchFilter={hideSearchFilter}
							hideDateFilter={hideDateFilter}
							hideLibraryText={hideLibraryText}
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
	secondaryButtonText: PropTypes.string,
	secondaryButtonClick: PropTypes.func,
	hideBtn: PropTypes.bool,
	hideSearchFilter: PropTypes.bool,
	hideDateFilter: PropTypes.bool,
	hideLibraryText: PropTypes.bool,
	isLoading: PropTypes.bool,
	children: PropTypes.oneOfType([
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element)
	]).isRequired
};

export default DashboardLayout;
