import React from 'react';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import { useStyles } from './topBanner';
import Banners from '../../components/banners/Banners';
import { useSelector } from 'react-redux';
import DashboardLayout from '../../components/layouts/DashboardLayout';

const TopBanner = () => {
	const muiClasses = useStyles();
	const getBannerContentState = useSelector(
		(state) => state.rootReducer.topBanner.getBannerContentState
	);
	const bannerState = useSelector(
		(state) => state.rootReducer.topBanner.getBannerStatus
	);

	return (
		<DashboardLayout
			title='Top Banner'
			hideBtn
			hideSearchFilter
			hideDateFilter
			hideLibraryText
		>
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
		</DashboardLayout>
	);
};

export default TopBanner;
