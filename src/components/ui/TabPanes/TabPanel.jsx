import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
	const { children, value, selectedValue, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== selectedValue}
			id={`full-width-tabpanel-${value}`}
			aria-labelledby={`full-width-tab-${value}`}
			{...other}
		>
			{value === selectedValue && <Box>{children}</Box>}
		</div>
	);
}

TabPanel.propTypes = {
	value: PropTypes.string,
	selectedValue: PropTypes.number,
	children: PropTypes.element
};

export default TabPanel;
