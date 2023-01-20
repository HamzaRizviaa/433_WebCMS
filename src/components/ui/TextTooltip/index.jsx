import React from 'react';
import PropTypes from 'prop-types';
import { Fade, Tooltip } from '@material-ui/core';
import { useTextTooltipStyles } from './index.style';

const TextTooltip = ({
	title = '',
	placement = 'top',
	children,
	secondary,
	classes,
	...rest
}) => {
	const tooltipClasses = useTextTooltipStyles({ secondary });

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
	children: PropTypes.element.isRequired,
	secondary: PropTypes.bool
};

export default TextTooltip;
