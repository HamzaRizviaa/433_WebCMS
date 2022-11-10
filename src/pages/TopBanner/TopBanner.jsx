import React from 'react';
import { useSelector } from 'react-redux';
import { selectBannerStatus } from '../../data/selectors';
import BannerForm from '../../components/forms/BannerForm';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import TabPanes from '../../components/ui/TabPanes';

/**
 * @component
 */
const TopBanner = () => {
	const getBannerContentState = useSelector(
		(state) => state.rootReducer.topBanner.getBannerContentState
	);

	const bannerStatus = useSelector(selectBannerStatus);

	const headings = ['Home', 'Media'];

	return (
		<DashboardLayout
			title='Top Banner'
			hideBtn
			hideSearchFilter
			hideDateFilter
			hideLibraryText
			isLoading={bannerStatus === 'loading'}
		>
			<TabPanes
				headings={headings}
				disabled={getBannerContentState && bannerStatus ? false : true}
			>
				<TabPanes.TabPanel value={0}>
					<BannerForm tabValue={'home'} />
				</TabPanes.TabPanel>
				<TabPanes.TabPanel value={1}>
					<BannerForm tabValue={'media'} />
				</TabPanes.TabPanel>
			</TabPanes>
		</DashboardLayout>
	);
};

export default TopBanner;
