import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Zoom } from '@mui/material';
import { useState } from 'react';

const TooltipTitle = () => <div style={{ fontSize: '12px' }}>Copied!</div>;


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
				TransitionComponent={Zoom}
				placement='top'
				arrow
				title={<TooltipTitle />}
				leaveDelay={500}
				onClose={handleClose}
				{...(tooltipProps || {})}
			>
				{children({ copy: onCopy })}
			</Tooltip>
		</div>
	);
};

export default CopyToClipboard;

CopyToClipboard.propTypes = {
	children: PropTypes.element.isRequired,
	tooltipProps: PropTypes.object
};
