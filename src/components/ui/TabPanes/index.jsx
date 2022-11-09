import React from 'react';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';
import { useStyles } from './index.styles';
import PropTypes from 'prop-types';
const TabPanes = ({ data }) => {
	const muiClasses = useStyles();

	return (
		<div className={muiClasses.root}>
			<TabsUnstyled defaultValue={0} className={muiClasses.tabRoot}>
				<TabsListUnstyled className={muiClasses.tabMainDiv}>
					{data.map((data) => {
						return (
							<TabUnstyled disabled={data.disabled} key={data.id}>
								{data.Heading}
							</TabUnstyled>
						);
					})}
				</TabsListUnstyled>
				{data.map((data) => {
					return (
						<TabPanelUnstyled value={data.value} key={data.id}>
							{data.component}
						</TabPanelUnstyled>
					);
				})}
			</TabsUnstyled>
		</div>
	);
};

TabPanes.propTypes = {
	data: PropTypes.array.isRequired
};

export default TabPanes;
