import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Modal from '../../ui/Modal';
import InlineDatePicker from '../../ui/inputs/InlineDatePicker';

const SchedulerPopup = ({ open, onClose, selectsRange = true }) => {
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

	return (
		<Modal
			title='Pick a date & time'
			size='medium'
			open={open}
			onClose={onClose}
			color='secondary'
		>
			<Grid container>
				<Grid item>
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
				<Grid item>
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
	onClose: PropTypes.func.isRequired,
	selectsRange: PropTypes.bool
};

export default SchedulerPopup;
