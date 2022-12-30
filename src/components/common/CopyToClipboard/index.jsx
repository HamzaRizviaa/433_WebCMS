import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../../Tooltip';
import { useState } from 'react';

const CopyToClipboard = ({ children, tooltipProps }) => {
	const [showTooltip, setShowTooltip] = useState(false);

	const onCopy = (content) => {
		setShowTooltip(true);
		navigator.clipboard.writeText(String(content));
	};

	const handleClose = () => {
		setShowTooltip(false);
	};

	return (
		<div style={{ cursor: 'pointer' }}>
			<Tooltip
				open={showTooltip}
				placement='top'
				title={'Copied!'}
				leaveDelay={500}
				onClose={handleClose}
				{...(tooltipProps || {})}
			>
				{children({ copy: onCopy })}
			</Tooltip>
		</div>
	);
};

CopyToClipboard.propTypes = {
	children: PropTypes.element.isRequired,
	tooltipProps: PropTypes.object
};

export default CopyToClipboard;
