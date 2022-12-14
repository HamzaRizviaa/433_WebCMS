import React from 'react';
import { PropTypes } from 'prop-types';
import { useSettingsLayoutStyles } from './index.style';
import { Typography } from '@material-ui/core';

const SettingsLayout = ({ title, children }) => {
	const classes = useSettingsLayoutStyles();

	return (
		<div className={classes.settingsLayoutWrapper}>
			<Typography className={classes.title}>{title}</Typography>
			{children}
		</div>
	);
};

SettingsLayout.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.element.isRequired
};

export default SettingsLayout;
