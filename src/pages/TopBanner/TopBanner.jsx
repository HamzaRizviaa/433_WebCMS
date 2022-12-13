import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBannerStatus } from '../../data/selectors';
import BannerForm from '../../components/forms/BannerForm';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import TabPanes from '../../components/ui/TabPanes';

/**
 * @component
 */
const TopBanner = () => {
	const [isBannerFormSubmitting, setFormSubmitting] = useState(false);

	const bannerStatus = useSelector(selectBannerStatus);

	const headings = ['Home', 'Media'];

	return (
		<DashboardLayout
			title='Top Banner'
			hideBtn
			hideSearchFilter
			hideDateFilter
			hideLibraryText
			isLoading={isBannerFormSubmitting || bannerStatus === 'loading'}
		>
			<div style={{ marginTop: '2.5rem' }}>
				<TabPanes headings={headings}>
					<TabPanes.TabPanel value={0}>
						<BannerForm tabValue='home' setFormSubmitting={setFormSubmitting} />
					</TabPanes.TabPanel>
					<TabPanes.TabPanel value={1}>
						<BannerForm
							tabValue='media'
							setFormSubmitting={setFormSubmitting}
						/>
					</TabPanes.TabPanel>
				</TabPanes>
			</div>
		</DashboardLayout>
	);
};

export default TopBanner;
