import React, { useEffect } from 'react';
import Layout from '../../components/layout';
import classes from './_topBanner.module.scss';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import { useStyles } from './topBanner';
import Banners from '../../components/banners/Banners';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import Four33Loader from '../../assets/Loader_Yellow.gif';
// import LoadingOverlay from 'react-loading-overlay';
const TopBanner = () => {
	const muiClasses = useStyles();

	const navigate = useNavigate();

	// const allBanners = useSelector((state) => state.rootReducer.topBanner.allBanners);
	const getBannerContentState = useSelector(
		(state) => state.rootReducer.topBanner.getBannerContentState
	);
	// const bannerContent = useSelector((state) => state.rootReducer.topBanner.content);
	const bannerState = useSelector((state) => state.rootReducer.topBanner.getBannerStatus);

	useEffect(() => {
		let expiry_date = Date.parse(localStorage.getItem('token_expire_time'));
		let current_date = new Date();
		let time_difference_minutes = (expiry_date - current_date) / 1000 / 60; //in minutes
		// console.log(current_date, 'curr');

		if (time_difference_minutes <= 1) {
			alert('Your session has expired');
			localStorage.removeItem('user_data');
			localStorage.removeItem('token_expire_time');
			navigate('/sign-in');
		}
	}, []);

	return (
		<Layout>
			<div className={classes.bannerWrapper}>
				<div className={classes.header}>
					<div className={classes.subheader1}>
						<h1>TOP BANNER</h1>
					</div>
				</div>

				<div className={muiClasses.root}>
					<TabsUnstyled defaultValue={0} className={muiClasses.tabRoot}>
						<TabsListUnstyled className={muiClasses.tabMainDiv}>
							<TabUnstyled
								disabled={getBannerContentState && bannerState ? false : true}
							>
								Home
							</TabUnstyled>
							<TabUnstyled
								disabled={getBannerContentState && bannerState ? false : true}
							>
								Media
							</TabUnstyled>
							{/* <TabUnstyled
								disabled={getBannerContentState && bannerState ? false : true}
							>
								Game
							</TabUnstyled> */}
						</TabsListUnstyled>
						<TabPanelUnstyled value={0}>
							<Banners tabValue={'home'} />
						</TabPanelUnstyled>
						<TabPanelUnstyled value={1}>
							<Banners tabValue={'media'} />
						</TabPanelUnstyled>
						<TabPanelUnstyled value={2}>
							<Banners tabValue={'game'} />
						</TabPanelUnstyled>
					</TabsUnstyled>
				</div>
			</div>
		</Layout>
	);
};

export default TopBanner;
