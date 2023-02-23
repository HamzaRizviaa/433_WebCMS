import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { getAll, fetchAndActivate } from 'firebase/remote-config';

import Topbar from '../../common/DashboardTopbar';
import PrimaryLoader from '../../ui/loaders/PrimaryLoader';
import { remoteConfig } from '../../../data/integrations/firebase';
import { setRemoteConfig } from '../../../data/features/remoteConfigSlice';
import { useLayoutStyles } from './index.style';
import { AuthService } from '../../../data/services';
import { checkIfTokenExpired } from '../../../data/helpers/commonHelpers';

const DashboardLayout = ({
	title,
	customText,
	customSearchText,
	onButtonClick,
	secondaryButtonText,
	secondaryButtonClick,
	hideLibraryText = false,
	hideBtn = false,
	hideSecondaryBtn,
	hideSearchFilter = false,
	hideDateFilter = false,
	isLoading = false,
	children
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { pathname } = useLocation();

	useEffect(() => {
		// checking token expiry
		const isTokenExpired = checkIfTokenExpired();

		if (isTokenExpired) {
			toast.error('Your session has expired', { position: 'top-center' });
			AuthService.removeTokenFromLocalStorage();
			navigate('/sign-in?session=expired', { state: { from: pathname } });
		}

		// Setting firebase config
		fetchAndActivate(remoteConfig)
			.then(() => {
				let configs = getAll(remoteConfig);
				dispatch(setRemoteConfig(configs));
			})
			.catch((err) => {
				console.error('err fetch and activate', err);
				dispatch(setRemoteConfig({}));
			});
	}, []);

	const classes = useLayoutStyles();

	return (
		<PrimaryLoader loading={isLoading} mainPage>
			<div className={classes.contentWrapper}>
				<Topbar
					title={title}
					customText={customText}
					customSearchText={customSearchText}
					onButtonClick={onButtonClick}
					secondaryButtonText={secondaryButtonText}
					secondaryButtonClick={secondaryButtonClick}
					hideBtn={hideBtn}
					hideSecondaryBtn={hideSecondaryBtn}
					hideSearchFilter={hideSearchFilter}
					hideDateFilter={hideDateFilter}
					hideLibraryText={hideLibraryText}
				/>
				{children}
			</div>
		</PrimaryLoader>
	);
};

DashboardLayout.propTypes = {
	title: PropTypes.string.isRequired,
	customText: PropTypes.string,
	customSearchText: PropTypes.string,
	onButtonClick: PropTypes.func,
	secondaryButtonText: PropTypes.string,
	secondaryButtonClick: PropTypes.func,
	hideBtn: PropTypes.bool,
	hideSecondaryBtn: PropTypes.bool,
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
