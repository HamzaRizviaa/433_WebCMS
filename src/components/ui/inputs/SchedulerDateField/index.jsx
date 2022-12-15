import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './index.styles';

const SchedulerDateField = ({ value, label = 'DATE' }) => {

	//label checking
	label = label || 'DATE';

	const classes = useStyles();
	return (
		<div className={classes.container}>
			{/* Label */}
			<div className={classes.label}>{label}</div>
			{/* Hours & Mins Container  */}
			<div className={classes.dateField}>{value || 'DEC 9, 2022'}</div>
		</div>
	);
};

export default SchedulerDateField;

SchedulerDateField.propTypes = {
	value: PropTypes.string,
	label: PropTypes.string
};
