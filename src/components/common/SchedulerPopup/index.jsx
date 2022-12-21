import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid } from '@material-ui/core';
import dayjs from 'dayjs';

import Modal from '../../ui/Modal';
import InlineDatePicker from '../../ui/inputs/InlineDatePicker';
import TimePickerField from '../../ui/inputs/TimePickerField';
import SchedulerDateField from '../../ui/inputs/SchedulerDateField';
import { useStyles } from './index.styles';
import { Collapse } from '@mui/material';
import { isPastTime } from '../../../data/utils';

const SchedulerPopup = ({ open, onClose,onConfirm, selectsRange = false }) => {
	const [isError, setError] = useState(false);
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
		if (isPastTime(values?.startStamp?.hour, values?.startStamp?.min)) {
			alert('cannot select past time');
			setError(!isError);
			return;
		}
		// console.log(onConfirm)
		onConfirm()
	};

	const formateDate = (date) =>
		dayjs(date || new Date()).format('MMM DD, YYYY');

	const classes = useStyles();
	return (
		<Modal
			title='Pick a date & time'
			size='medium'
			open={open}
			onClose={onClose}
			color='secondary'
			confirmButtonText='Schedule'
			onConfirm={handleConfirm}
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

				{/* Notification */}
				<Grid item xs={12}>
					<Collapse in={isError}>
						<div
							style={{
								border: '1px solid red',
								height: '50px',
								borderRadius: '8px',
								background: '#FF355A',
								margin: '5px 0 10px 0',
								padding: '16px',
								//verticle alignment
								display: 'flex',
								alignItems: 'center',
								flexWrap: 'wrap',
								// typography
								fontFamily: 'Poppins',
								fontSize: '12px',
								lineHeight: '16px',
								letterSpacing: '0.03em',
								color: '#fff'
							}}
						>
							<div
								className='title'
								style={{
									flexBasis: '100%',
									fontWeight: 700
								}}
							>
								Whoops...
							</div>
							<div
								className='content'
								style={{
									fontWeight: 400
								}}
							>
								You can’t schedule in the past. Please select a time and date
								atleast 15 minutes from now.
							</div>
						</div>
					</Collapse>
				</Grid>
			</Grid>
		</Modal>
	);
};

SchedulerPopup.propTypes = {
	open: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onConfirm: PropTypes.func,
	selectsRange: PropTypes.bool
};

export default SchedulerPopup;
