import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import Modal from '../../ui/Modal';
import InlineDatePicker from '../../ui/inputs/InlineDatePicker';
import TimePickerField from '../../ui/inputs/TimePickerField';
import SchedulerDateField from '../../ui/inputs/SchedulerDateField';
import { useStyles } from './index.styles';

const SchedulerPopup = ({ open, onClose, selectsRange = false }) => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const handleChange = (selectedDate) => {
		if (selectsRange) {
			const [selectedStartDate, selectedEndDate] = selectedDate;
			setStartDate(selectedStartDate);
			setEndDate(selectedEndDate);
		} else {
			setStartDate(selectedDate);
		}
	};

	const classes = useStyles();
	return (
		<Modal
			title='Pick a date & time'
			size='medium'
			open={open}
			onClose={onClose}
			color='secondary'
		>
			<Grid container>
				<Grid item md={7}>
					<InlineDatePicker
						name='schedule_date'
						startDate={startDate}
						endDate={endDate}
						value={startDate}
						onChange={handleChange}
						formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)}
						calendarStartDay={1}
						selectsRange={selectsRange}
					/>
				</Grid>
				{/* RIGHT SECTION */}
				<Grid item md={5}>
					{/* time n date con */}
					<div className={classes.dateAndTimeCon}>
						{/* Date field */}
						<SchedulerDateField label={selectsRange && 'START DATE'} />
						{/* Time Picker */}
						<TimePickerField label={selectsRange && 'START TIME'} />

						{/* If Range then it'll display end date time as well */}
						{selectsRange && (
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
	selectsRange: PropTypes.bool
};

export default SchedulerPopup;
