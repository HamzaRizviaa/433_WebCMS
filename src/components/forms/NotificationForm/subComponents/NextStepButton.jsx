import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFormikContext } from 'formik';

import Button from '../../../ui/Button';
import { notificationStepsValidationSchemas } from '../../../../data/helpers';
import { useNotificationStyles } from '../index.style';

const NextStepButton = ({ currentStep, onClick }) => {
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

	const classes = useNotificationStyles();

	return (
		<Button
			className={classes.button}
			color='primary'
			onClick={onClick}
			disabled={isStepInvalid}
		>
			{currentStep === 'additional_options' ? 'FINISH' : 'NEXT STEP'}
		</Button>
	);
};

NextStepButton.propTypes = {
	currentStep: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
};

export default NextStepButton;
