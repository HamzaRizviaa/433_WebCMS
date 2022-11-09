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

	const headings = ['Home', 'Media'];

	// const options = [
	// 	{ value: 0, label: 'Home' },
	// 	{ value: 1, label: 'Media' }
	// ];

	return (
		<DashboardLayout
			title='Top Banner'
			hideBtn
			hideSearchFilter
			hideDateFilter
			hideLibraryText
		>
			<TabPanes
				headings={headings}
				disabled={getBannerContentState && bannerState ? false : true}
			>
				<TabPanes.TabPanel value={0}>
					<Banners tabValue={'home'} />
				</TabPanes.TabPanel>
				<TabPanes.TabPanel value={1}>
					<Banners tabValue={'media'} />
				</TabPanes.TabPanel>
			</TabPanes>
		</DashboardLayout>
	);
};

export default TopBanner;
