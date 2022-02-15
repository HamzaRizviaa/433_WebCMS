import React from 'react';
import Layout from '../../components/layout';
import classes from './_topBanner.module.scss';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import { useStyles } from './topBanner';

const TopBanner = () => {
	const muiClasses = useStyles();

	return (
		<Layout>
			<div className={classes.header}>
				<div className={classes.subheader1}>
					<h1>TOP BANNER</h1>
				</div>
			</div>

			<div className={muiClasses.root}>
				<TabsUnstyled defaultValue={0} className={muiClasses.tabRoot}>
					<TabsListUnstyled className={muiClasses.tabMainDiv}>
						<TabUnstyled>Home</TabUnstyled>
						<TabUnstyled>Media</TabUnstyled>
					</TabsListUnstyled>
					<TabPanelUnstyled value={0}>{/* add banner here */}</TabPanelUnstyled>
					<TabPanelUnstyled value={1}>{/* add banner here */}</TabPanelUnstyled>
				</TabsUnstyled>
			</div>
		</Layout>
	);
};

export default TopBanner;
