import React from 'react';
import PropTypes from 'prop-types';
import { Fade, Tooltip } from '@material-ui/core';
import { useTextTooltipStyles } from './index.style';

const TextTooltip = ({
	title = '',
	placement = 'bottom-start',
	children,
	classes,
	...rest
}) => {
	const tooltipClasses = useTextTooltipStyles();

	return (
		<Tooltip
			{...rest}
			TransitionComponent={Fade}
			TransitionProps={{ timeout: 800 }}
			title={title}
			arrow
			classes={{
				tooltip: tooltipClasses.toolTip,
				arrow: tooltipClasses.toolTipArrow,
				...classes
			}}
			placement={placement}
		>
			{children}
		</Tooltip>
	);
};

TextTooltip.propTypes = {
	title: PropTypes.string.isRequired,
	placement: PropTypes.string,
	classes: PropTypes.object,
	children: PropTypes.element.isRequired
};

export default TextTooltip;
