import React from 'react';
import { useStyles } from './index.styles';

const SchedulerDateField = () => {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			{/* Label */}
			<div className={classes.label}>DATE</div>

			{/* Hours & Mins Container  */}
			<div className={classes.dateField}>DEC 9, 2022</div>
		</div>
	);
};

export default SchedulerDateField;
