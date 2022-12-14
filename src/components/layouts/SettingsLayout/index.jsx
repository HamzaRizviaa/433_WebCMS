/* eslint-disable no-unused-vars */
import React from 'react';
import { PropTypes } from 'prop-types';
import { useSettingsLayoutStyles } from './index.style';

const SettingsLayout = ({ title, children }) => {
	return <div>SettingsLayout</div>;
};

SettingsLayout.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.element.isRequired
};

export default SettingsLayout;
