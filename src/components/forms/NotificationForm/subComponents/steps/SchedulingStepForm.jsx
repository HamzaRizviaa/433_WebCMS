import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import { useSelector } from 'react-redux';
import { Collapse } from '@material-ui/core';

import FormikSelect from '../../../../ui/inputs/formik/FormikSelect';
import SchedulerDateField from '../../../../ui/inputs/SchedulerDateField';
import InlineDatePicker from '../../../../ui/inputs/InlineDatePicker';
import TimePickerField from '../../../../ui/inputs/TimePickerField';
import { scheduleOptions } from '../../../../../data/helpers';
import { selectSchedulerError } from '../../../../../data/selectors/notificationSelectors';
import { useNotificationStyles } from '../../index.style';
import { useFormStyles } from '../../../forms.style';

const SchedulingStepForm = ({ status }) => {
	const { values, setFieldValue } = useFormikContext();

	const isPublished = status === 'published';

	const schedulerError = useSelector(selectSchedulerError);

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
	const formClasses = useFormStyles();

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
							disabled={isPublished}
						/>
						{showDateAndTime && (
							<div>
								<SchedulerDateField
									className={classes.dateField}
									value={formatDate(values.scheduling.date)}
									disabled={isPublished}
								/>
								<TimePickerField
									name='scheduling.time'
									label='TIME'
									value={values.scheduling.time}
									onChange={handleTimeChange}
									showSeparator
									disabled={isPublished}
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
								disabled={isPublished}
							/>
						)}
					</div>
				</div>
				<Collapse in={!!schedulerError}>
					<div className={formClasses.schedulerErrorContainer}>
						<div className={formClasses.schedulerErrorTitle}>Whoops...</div>
						<div className={formClasses.schedulerErrorText}>
							{schedulerError}
						</div>
					</div>
				</Collapse>
			</div>
		</div>
	);
};

export default SchedulingStepForm;

SchedulingStepForm.propTypes = {
	options: PropTypes.array,
	selectsRange: PropTypes.bool,
	status: PropTypes.string
};
