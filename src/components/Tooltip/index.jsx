import React from 'react';
import { Fade, Tooltip as MuiTooltip } from '@mui/material';
import PropTypes from 'prop-types';
import { useStyles } from './index.style';

const Tooltip = (props) => {
	const { title = 'title', placement, children } = props;
	const globalClasses = useStyles();
	return (
		<MuiTooltip
			TransitionComponent={Fade}
			TransitionProps={{ timeout: 800 }}
			title={title}
			arrow
			componentsProps={{
				tooltip: { className: globalClasses.toolTip },
				arrow: { className: globalClasses.toolTipArrow }
			}}
			{...props}
			placement={placement || 'bottom-start'}
		>
			{children}
		</MuiTooltip>
	);
};

Tooltip.propTypes = {
	title: PropTypes.string.isRequired,
	placement: PropTypes.string,
	children: PropTypes.element.isRequired
};

export default Tooltip;
