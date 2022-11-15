import React from 'react';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import { useStyles } from './index.styles';
import PropTypes from 'prop-types';
import TabPanel from './TabPanel';
const TabPanes = ({ headings, disabled, children }) => {
	const muiClasses = useStyles();

	return (
		<div className={muiClasses.root}>
			<TabsUnstyled defaultValue={0} className={muiClasses.tabRoot}>
				<TabsListUnstyled className={muiClasses.tabMainDiv}>
					{headings.map((text, index) => (
						<TabUnstyled disabled={disabled} key={index}>
							{text}
						</TabUnstyled>
					))}
				</TabsListUnstyled>
				{children}
			</TabsUnstyled>
		</div>
	);
};

TabPanes.TabPanel = TabPanel;

TabPanes.propTypes = {
	headings: PropTypes.array.isRequired,
	disabled: PropTypes.boolean,
	children: PropTypes.element
};

export default TabPanes;

// heading = [
// 	{
// 		value: '0',
// 		label: 'Home'
// 	},
//     {
// 		value: '1',
// 		label: 'Media'
// 	}
// ];
