/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
// import { ThemeProvider } from '@mui/material/styles';
// import { CssBaseline } from '@mui/material';
// import theme from '../../assets/theme';
import classes from './_layout.module.scss';
import Sidebar from '../sidebar';

const Layout = ({ children }) => {
	return (
		// <ThemeProvider theme={theme}>
		// 	<CssBaseline />
		<div className={classes.root}>
			<Sidebar />
			<div className={classes.contentWrapper}>{children}</div>
		</div>
		// </ThemeProvider>
	);
};

Layout.propTypes = {
	children: PropTypes.element.isRequired
};

export default Layout;
