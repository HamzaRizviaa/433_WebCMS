import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';
import { useDispatch } from 'react-redux';

import Button from '../../../ui/Button';
import { isPastTime } from '../../../../data/utils';
import { notificationStepsValidationSchemas } from '../../../../data/helpers';
import {
	resetSchedulerError,
	setSchedulerError
} from '../../../../data/features/notification/notificationSlice';
import { useNotificationStyles } from '../index.style';

const NextStepButton = ({ currentStep, onClick, isPublished }) => {
	const dispatch = useDispatch();
	const [isStepInvalid, setStepInvalidState] = useState(false);

	const { values } = useFormikContext();

	const currentStepValues = values[currentStep];
	const currentStepSchema = notificationStepsValidationSchemas[currentStep];

	useEffect(() => {
		currentStepSchema
			.validate(currentStepValues)
			.then(() => setStepInvalidState(false))
			.catch(() => setStepInvalidState(true));
	}, [values]);

	const handleClick = () => {
		const { scheduling } = values;
		const dateAndTime = {
			date: scheduling.date,
			hours: scheduling.time.hour,
			mins: scheduling.time.min
		};
		if (
			!isPublished &&
			currentStep === 'scheduling' &&
			scheduling.schedule_notification === 'schedule'
		) {
			const isPastTimeError = isPastTime(dateAndTime);
			if (isPastTimeError) {
				dispatch(setSchedulerError());
				return;
			} else {
				dispatch(resetSchedulerError());
			}
		}
		onClick();
	};

	const classes = useNotificationStyles();

	if (currentStep === 'additional_options') return null;

	return (
		<Button
			className={classes.button}
			color='primary'
			onClick={handleClick}
			disabled={isStepInvalid}
		>
			NEXT STEP
		</Button>
	);
};

NextStepButton.propTypes = {
	currentStep: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	isPublished: PropTypes.bool
};

export default NextStepButton;
