import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './index.style';

const NoDataIndicator = ({ noDataText }) => {
	const classes = useStyles();

	return (
		<div className={classes.noDataText}>
			<h1>{noDataText}</h1>
		</div>
	);
};

NoDataIndicator.propTypes = {
	noDataText: PropTypes.string.isRequired
};

export default NoDataIndicator;
