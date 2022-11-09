/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import { useStyles } from './topBanner';
import Banners from '../../components/banners/Banners';
import { useSelector } from 'react-redux';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import TabPanes from '../../components/ui/TabPanes';
/**
 * @component
 */
const TopBanner = () => {
	const muiClasses = useStyles();
	const getBannerContentState = useSelector(
		(state) => state.rootReducer.topBanner.getBannerContentState
	);
	const bannerState = useSelector(
		(state) => state.rootReducer.topBanner.getBannerStatus
	);
	const TabPanesData = [
		{
			id: 0,
			Heading: 'Home',
			value: 0,
			disabled: getBannerContentState && bannerState ? false : true,
			component: <Banners tabValue={'home'} />
		},
		{
			id: 1,
			Heading: 'Media',
			value: 1,
			disabled: getBannerContentState && bannerState ? false : true,
			component: <Banners tabValue={'media'} />
		}
	];

	return (
		<DashboardLayout
			title='Top Banner'
			hideBtn
			hideSearchFilter
			hideDateFilter
			hideLibraryText
		>
			<TabPanes data={TabPanesData} />
			{/* <div className={muiClasses.root}>
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
					</TabsListUnstyled>
					<TabPanelUnstyled value={0}>
						<Banners tabValue={'home'} />
					</TabPanelUnstyled>
					<TabPanelUnstyled value={1}>
						<Banners tabValue={'media'} />
					</TabPanelUnstyled>
				</TabsUnstyled>
			</div> */}
		</DashboardLayout>
	);
};

export default TopBanner;
