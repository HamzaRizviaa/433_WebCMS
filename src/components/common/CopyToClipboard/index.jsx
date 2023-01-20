import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextTooltip from '../../ui/TextTooltip';

const CopyToClipboard = ({ children }) => {
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
			<TextTooltip
				open={showTooltip}
				placement='top'
				title='Copied!'
				leaveDelay={1000}
				onClose={handleClose}
				PopperProps={{ style: { marginTop: -10 } }}
			>
				{children({ copy: onCopy })}
			</TextTooltip>
		</div>
	);
};

CopyToClipboard.propTypes = {
	children: PropTypes.element.isRequired
};

export default CopyToClipboard;
