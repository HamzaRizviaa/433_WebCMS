import React from 'react';
import PropTypes from 'prop-types';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabUnstyled from '@mui/base/TabUnstyled';

import TabPanel from './TabPanel';
import { useStyles } from './index.styles';

const TabPanes = ({
	headings,
	onClick,
	disabled,
	children,
	type,
	defaultValue = 0
}) => {
	const muiClasses = useStyles({ type });

	const handleClick = (value) => {
		if (onClick) onClick(value);
	};

	return (
		<div className={muiClasses.root}>
			<TabsUnstyled defaultValue={defaultValue} className={muiClasses.tabRoot}>
				<TabsListUnstyled className={muiClasses.tabMainDiv}>
					{headings.map((text, index) => (
						<TabUnstyled
							disabled={disabled}
							key={index}
							onClick={() => handleClick(text)}
							type='button'
						>
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
	onClick: PropTypes.func,
	children: PropTypes.element,
	type: PropTypes.string,
	defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default TabPanes;
