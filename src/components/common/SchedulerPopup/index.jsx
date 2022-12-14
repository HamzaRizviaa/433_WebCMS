import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Modal from '../../ui/Modal';
import InlineDatePicker from '../../ui/inputs/InlineDatePicker';

const SchedulerPopup = ({ open, onClose }) => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const handleChange = (selectedDate) => {
		const [selectedStartDate, selectedEndDate] = selectedDate;
		setStartDate(selectedStartDate);
		setEndDate(selectedEndDate);
	};

	return (
		<Modal
			title='Pick a date & time'
			size='medium'
			open={open}
			onClose={onClose}
		>
			<Grid container>
				<Grid item md={6}>
					<InlineDatePicker
						name='schedule_date'
						startDate={startDate}
						endDate={endDate}
						onChange={handleChange}
						formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)}
						calendarStartDay={1}
						selectsRange
					/>
				</Grid>
				<Grid item md={6}>
					<div style={{ width: 300, textAlign: 'center' }}>
						<h3>Input Fields</h3>
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
