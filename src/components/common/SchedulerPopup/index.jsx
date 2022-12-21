import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import dayjs from 'dayjs';

import Modal from '../../ui/Modal';
import InlineDatePicker from '../../ui/inputs/InlineDatePicker';
import TimePickerField from '../../ui/inputs/TimePickerField';
import SchedulerDateField from '../../ui/inputs/SchedulerDateField';
import { useStyles } from './index.styles';
import { formatScheduleDate } from '../../../data/helpers';

const SchedulerPopup = ({
	open,
	onClose,
	onConfirm,
	onRemove,
	initialStartDate,
	initialEndDate,
	selectsRange = false,
	isScheduled = false
}) => {
	const [values, setValues] = useState({
		startStamp: {
			date: null,
			hour: '00',
			min: '00'
		},
		...(selectsRange && {
			endStamp: {
				date: null,
				hour: '00',
				min: '00'
			}
		})
	});

	useEffect(() => {
		if (initialStartDate) {
			const formattedSchduleDate = formatScheduleDate(
				initialStartDate,
				initialEndDate
			);

			setValues(formattedSchduleDate);
		}
	}, [initialStartDate, initialEndDate]);

	const handleDateChange = (selectedDate) => {
		if (selectsRange) {
			const [selectedStartDate, selectedEndDate] = selectedDate;

			setValues((prevState) => ({
				startStamp: {
					...prevState.startStamp,
					date: selectedStartDate
				},
				endStamp: {
					...prevState.endStamp,
					date: selectedEndDate
				}
			}));
		} else {
			setValues((prevState) => ({
				startStamp: {
					...prevState.startStamp,
					date: selectedDate
				}
			}));
		}
	};

	const handleTimeChange = (name, value) => {
		setValues((prevState) => ({
			...prevState,
			[name]: {
				date: prevState[name].date,
				hour: value.hour,
				min: value.min
			}
		}));
	};

	const handleConfirm = () => {
		onConfirm(values);
	};

	const formateDate = (data) =>
		dayjs(data || new Date()).format('MMM DD, YYYY');

	const classes = useStyles();
	return (
		<Modal
			title='Pick a date & time'
			size='medium'
			color='secondary'
			open={open}
			onClose={onClose}
			onConfirm={handleConfirm}
			onLeftButtonClick={onRemove}
			confirmButtonText='Schedule'
			leftButtonText='Remove Schedule'
			hideLeftButton={!isScheduled}
		>
			<Grid container>
				<Grid item md={7}>
					<InlineDatePicker
						name='schedule_date'
						startDate={values.startStamp.date}
						endDate={values.endStamp?.date || null}
						value={values.startStamp.date}
						onChange={handleDateChange}
						formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)}
						calendarStartDay={1}
						selectsRange={selectsRange}
						// past dates disabled
						minDate={new Date()}
					/>
				</Grid>
				{/* RIGHT SECTION */}
				<Grid item md={5}>
					{/* time n date con */}
					<div className={classes.dateAndTimeCon}>
						{/* Date field */}
						<SchedulerDateField
							value={formateDate(values.startStamp.date)}
							label={selectsRange && 'START DATE'}
						/>
						{/* Time Picker */}
						<TimePickerField
							name='startStamp'
							label={selectsRange ? 'START TIME' : 'TIME'}
							value={values.startStamp}
							onChange={handleTimeChange}
						/>

						{/* If Range then it'll display end date time as well */}
						{selectsRange && (
							<Box mt={4}>
								<SchedulerDateField
									value={formateDate(values.endStamp?.date)}
									label={'STOP DATE'}
								/>
								<TimePickerField
									name='endStamp'
									label={'STOP TIME'}
									value={values.endStamp}
									onChange={handleTimeChange}
								/>
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
	onConfirm: PropTypes.func.isRequired,
	onRemove: PropTypes.func.isRequired,
	selectsRange: PropTypes.bool,
	initialStartDate: PropTypes.object,
	initialEndDate: PropTypes.object,
	isScheduled: PropTypes.bool
};

export default SchedulerPopup;
