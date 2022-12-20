/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
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
	defaultValue = 0,
	hideTabsHead = false
}) => {
	const muiClasses = useStyles({ type, hideTabsHead });
	const [value, setValue] = useState(defaultValue);

	const handleClick = (value, index) => {
		if (onClick) onClick(value);
		setValue(index);
	};

	useEffect(() => {
		setValue(defaultValue);
	}, [defaultValue]);

	return (
		<div className={muiClasses.root}>
			<TabsUnstyled
				className={muiClasses.tabRoot}
				defaultValue={defaultValue}
				value={value}
			>
				<TabsListUnstyled className={muiClasses.tabMainDiv}>
					{headings.map((text, index) => (
						<TabUnstyled
							disabled={disabled}
							key={index}
							onClick={() => handleClick(text, index)}
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
	hideTabsHead: PropTypes.bool,
	defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	value: PropTypes.any
};

export default TabPanes;
