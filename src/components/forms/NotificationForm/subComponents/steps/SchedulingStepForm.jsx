/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { useSchedulingStyles } from '../../index.style';
import FormikSelect from '../../../../ui/inputs/formik/FormikSelect';
import FormikDatePicker from '../../../../ui/inputs/formik/FormikDatePicker';
import SchedulerDateField from '../../../../ui/inputs/SchedulerDateField';
import InlineDatePicker from '../../../../ui/inputs/InlineDatePicker';
import TimePickerField from '../../../../ui/inputs/TimePickerField';
import dayjs from 'dayjs';

const SchedulingStepForm = ({ selectsRange = false }) => {
	const [scheduleFields, setScheduleFields] = useState(false);
	const [values, setValues] = useState({
		time: {
			date: new Date(),
			hour: '00',
			min: '00'
		},
		startStamp: {
			date: new Date(),
			hour: '00',
			min: '00'
		}
	});
	const optionsText = [
		{ value: 'now', label: 'Now' },
		{ value: 'schedule', label: 'Schedule' }
	];
	const classes = useSchedulingStyles();

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

	const handleDateChange = (selectedDate) => {
		if (selectsRange) {
			const [selectedStartDate, selectedEndDate] = selectedDate;

			setValues((prevState) => ({
				time: {
					...prevState.time
				},
				startStamp: {
					...prevState.startStamp,
					date: selectedStartDate
				}
			}));
		} else {
			setValues((prevState) => ({
				time: {
					...prevState.time
				},
				startStamp: {
					...prevState.startStamp,
					date: selectedDate
				}
			}));
		}
	};

	const handleScheduleChange = (value) => {
		if (value === 'schedule') {
			setScheduleFields(true);
		} else {
			setScheduleFields(false);
		}
	};

	const formateDate = (date) =>
		dayjs(date || new Date()).format('MMM DD, YYYY');

	return (
		<div>
			<div className={classes.scheduleRootBox}>
				<div className={classes.scheduleGridMain}>
					<div>
						<FormikSelect
							label='Send to eligible user'
							name={`scheduling.schedule_notification`}
							placeholder='Please select'
							options={optionsText}
							onChange={handleScheduleChange}
						/>
						{scheduleFields && (
							<div>
								<SchedulerDateField
									value={formateDate(values.startStamp.date)}
								/>
								<TimePickerField
									name='time'
									label={selectsRange ? 'START TIME' : 'TIME'}
									value={values.time}
									onChange={handleTimeChange}
								/>
							</div>
						)}
					</div>
					<div>
						{scheduleFields && (
							<InlineDatePicker
								name='schedule_date'
								startDate={values.startStamp.date}
								value={values.startStamp.date}
								onChange={handleDateChange}
								formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)}
								calendarStartDay={1}
								// selectsRange={selectsRange}
								// past dates disabled
								minDate={new Date()}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SchedulingStepForm;

SchedulingStepForm.propTypes = {
	options: PropTypes.array,
	selectsRange: PropTypes.bool
};
