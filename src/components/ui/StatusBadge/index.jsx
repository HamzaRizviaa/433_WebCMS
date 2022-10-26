import React from 'react';
import PropTypes from 'prop-types';
import { useStatusBadgeStyles } from './index.style';

const StatusBadge = ({ status }) => {
	const classes = useStatusBadgeStyles({ status });

	return (
		<div className={classes.badgeWrapper}>
			<span className={classes.badge}>{status?.toUpperCase()}</span>
		</div>
	);
};

StatusBadge.propTypes = {
	status: PropTypes.string.isRequired
};

export default StatusBadge;
