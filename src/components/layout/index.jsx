import React from 'react';
import PropTypes from 'prop-types';
import classes from './_layout.module.scss';
import Sidebar from '../sidebar';

const Layout = ({ children }) => {
	return (
		<div className={classes.root}>
			<Sidebar />
			<div className={classes.contentWrapper}>{children}</div>
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.element.isRequired
};

export default Layout;
