import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';

import FormikSelect from '../../../../ui/inputs/formik/FormikSelect';
import SchedulerDateField from '../../../../ui/inputs/SchedulerDateField';
import InlineDatePicker from '../../../../ui/inputs/InlineDatePicker';
import TimePickerField from '../../../../ui/inputs/TimePickerField';
import { scheduleOptions } from '../../../../../data/helpers';
import { useNotificationStyles } from '../../index.style';

const SchedulingStepForm = () => {
	const { values, setFieldValue } = useFormikContext();

	const handleTimeChange = (name, value) => {
		setFieldValue(name, value);
	};

	const handleDateChange = (selectedDate) => {
		setFieldValue('scheduling.date', selectedDate);
	};

	const formatDate = (date) => dayjs(date || new Date()).format('MMM DD, YYYY');

	const showDateAndTime =
		values.scheduling.schedule_notification === 'schedule';

	const classes = useNotificationStyles();

	return (
		<div>
			<div className={classes.stepContainer}>
				<div className={classes.scheduleGridMain}>
					<div className={classes.scheduleFieldsContainer}>
						<FormikSelect
							label='SEND TO ELIGIBLE USER'
							name='scheduling.schedule_notification'
							placeholder='Please select'
							options={scheduleOptions}
						/>
						{showDateAndTime && (
							<div>
								<SchedulerDateField
									className={classes.dateField}
									value={formatDate(values.scheduling.date)}
								/>
								<TimePickerField
									name='scheduling.time'
									label='TIME'
									value={values.scheduling.time}
									onChange={handleTimeChange}
									showSeparator
								/>
							</div>
						)}
					</div>
					<div>
						{showDateAndTime && (
							<InlineDatePicker
								name='scheduling.date'
								value={values.scheduling.date}
								onChange={handleDateChange}
								formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 3)}
								calendarStartDay={1}
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
