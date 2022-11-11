import React from 'react';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import PropTypes from 'prop-types';

const TabPanel = ({ children, value }) => {
	return <TabPanelUnstyled value={value}>{children}</TabPanelUnstyled>;
};

TabPanel.propTypes = {
	children: PropTypes.element.isRequired,
	value: PropTypes.integer
};

export default TabPanel;
