import React from 'react';
import Layout from '../../components/layout';
import classes from './_topBanner.module.scss';

const TopBanner = () => {
	return (
		<Layout>
			<div className={classes.header}>
				<div className={classes.subheader1}>
					<h1>TOP BANNER</h1>
				</div>
			</div>
		</Layout>
	);
};

export default TopBanner;
