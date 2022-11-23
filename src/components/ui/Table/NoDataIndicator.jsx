import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './index.style';

const NoDataIndicator = ({ noDataText, formTable }) => {
	const classes = useStyles({ formTable });

	return (
		<div className={classes.noDataText}>
			<h1>{noDataText}</h1>
		</div>
	);
};

NoDataIndicator.propTypes = {
	noDataText: PropTypes.string.isRequired,
	formTable: PropTypes.bool
};

export default NoDataIndicator;
