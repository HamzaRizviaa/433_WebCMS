import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import Modal from '../../ui/Modal';
import InlineDatePicker from '../../ui/inputs/InlineDatePicker';
import TimePickerField from '../../ui/inputs/TimePickerField';
import SchedulerDateField from '../../ui/inputs/SchedulerDateField';
import { useStyles } from './index.styles';

const SchedulerPopup = ({ open, onClose, isRange = false }) => {
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
						<SchedulerDateField label={isRange && 'START DATE'} />
						{/* Time Picker */}
						<TimePickerField label={isRange && 'START TIME'} />

						{/* If Range then it'll display end date time as well */}
						{isRange && (
							<Box mt={2}>
								<SchedulerDateField label={'END DATE'} />
								<TimePickerField label={'END TIME'} />
							</Box>
						)}
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
	onClose: PropTypes.func.isRequired,
	isRange: PropTypes.bool
};

export default SchedulerPopup;
