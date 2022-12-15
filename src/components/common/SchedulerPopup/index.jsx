import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Modal from '../../ui/Modal';
import InlineDatePicker from '../../ui/inputs/InlineDatePicker';
import TimePickerField from '../../ui/inputs/TimePickerField';
import SchedulerDateField from '../../ui/inputs/SchedulerDateField';
import { useStyles } from './index.styles';

const SchedulerPopup = ({ open, onClose }) => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const handleChange = (selectedDate) => {
		const [selectedStartDate, selectedEndDate] = selectedDate;
		setStartDate(selectedStartDate);
		setEndDate(selectedEndDate);
	};

	const classes = useStyles();
	return (
		<Modal
			title='Pick a date & time'
			size='medium'
			open={open}
			onClose={onClose}
		>
			<Grid container>
				<Grid item md={7}>
					<InlineDatePicker
						name='schedule_date'
						startDate={startDate}
						endDate={endDate}
						onChange={handleChange}
						formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)}
						selectsRange
					/>
				</Grid>
				<Grid item md={5}>
					{/* time n date con */}
					<div className={classes.dateAndTimeCon}>
						{/* Date field */}
						<SchedulerDateField />
						{/* Time Picker */}
						<TimePickerField />
						{/* Timezone Note Typo */}
						<div className={classes.timezoneNote}>
							All scheduling times are set to CET, +1
						</div>
					</div>
				</Grid>
			</Grid>
		</Modal>
	);
};

SchedulerPopup.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired
};

export default SchedulerPopup;
