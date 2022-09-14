import React from 'react';
import { Fade, Tooltip as MuiTooltip } from '@mui/material';
import PropTypes from 'prop-types';
import { useStyles } from './index.style';

const Tooltip = (props) => {
	const { title = 'title', placement, children } = props;
	const classes = useStyles();
	return (
		<MuiTooltip
			TransitionComponent={Fade}
			TransitionProps={{ timeout: 800 }}
			title={title}
			arrow
			componentsProps={{
				tooltip: { className: classes.toolTip },
				arrow: { className: classes.toolTipArrow }
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
