import React from 'react';
import { Stepper, Step, StepButton, StepContent } from '@material-ui/core';
import PropTypes from 'prop-types';
import NextStepButton from './NextStepButton';
import { stepsComponents } from './steps';
import { stepsData } from '../../../../data/helpers';
import { useNotificationStyles } from '../index.style';

const NotificationStepper = ({ status }) => {
	const [activeStep, setActiveStep] = React.useState(0);
	const [completed, setCompleted] = React.useState(new Set());

	const isPublished = status === 'published';

	const handleNext = (index) => () => {
		const newCompleted = new Set(completed);
		newCompleted.add(index);
		setCompleted(newCompleted);

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleStep = (event) => {
		setActiveStep(Number(event.currentTarget.id));
	};

	const isStepCompleted = (step) => {
		return isPublished || completed.has(step);
	};

	const classes = useNotificationStyles();

	return (
		<Stepper activeStep={activeStep} orientation='vertical' nonLinear>
			{stepsData.map((step, index) => (
				<Step key={step.key}>
					<StepButton
						id={index}
						onClick={handleStep}
						completed={isStepCompleted(index)}
						disabled={
							index === 3
								? !isStepCompleted(index - 1)
								: !isStepCompleted(index)
						}
						className={classes.stepLabel}
					>
						{step.label}
					</StepButton>
					<StepContent>
						{React.cloneElement(stepsComponents[step.key], { status })}
						<div className={classes.actionsContainer}>
							<NextStepButton
								currentStep={step.key}
								onClick={handleNext(index)}
								isPublished={isPublished}
							/>
						</div>
					</StepContent>
				</Step>
			))}
		</Stepper>
	);
};

export default NotificationStepper;

NotificationStepper.propTypes = {
	status: PropTypes.string
};
