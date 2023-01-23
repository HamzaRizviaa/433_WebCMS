/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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
			<div className='tabs-root'>
				<div role='tablist' className='tabs-list' value={value}>
					{headings.map((text, index) => (
						<div
							role='tab'
							disabled={disabled}
							key={index}
							onClick={() => handleClick(text, index)}
							type='button'
							className={`tab-btn${index === value ? ' tab-btn-selected' : ''}`}
						>
							{text}
						</div>
					))}
				</div>
			</div>
			<div>
				{React.Children.map(children, (child) => {
					if (!React.isValidElement(child)) {
						throw new Error('TabPanes children must be vaild react element');
					}

					return React.cloneElement(child, { selectedValue: value });
				})}
			</div>
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
