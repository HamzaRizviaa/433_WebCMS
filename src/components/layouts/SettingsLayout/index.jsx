import React from 'react';
import { PropTypes } from 'prop-types';
import { useSettingsLayoutStyles } from './index.style';

const SettingsLayout = ({ title, children }) => {
	const classes = useSettingsLayoutStyles();

	return (
		<div className={classes.settingsLayoutWrapper}>
			<p className={classes.title}>{title}</p>
			{children}
		</div>
	);
};

SettingsLayout.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.element.isRequired
};

export default SettingsLayout;
