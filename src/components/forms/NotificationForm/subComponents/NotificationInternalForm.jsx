import React from 'react';
import { Stepper, Step, StepButton, StepContent } from '@material-ui/core';

import NextStepButton from './NextStepButton';
import { stepsComponents } from './steps';
import { stepsData } from '../../../../data/helpers';
import { useNotificationStyles } from '../index.style';

const NotificationInternalForm = () => {
	const [activeStep, setActiveStep] = React.useState(0);
	const [completed, setCompleted] = React.useState(new Set());

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
		return completed.has(step);
	};

	const classes = useNotificationStyles();

	return (
		<div className={classes.root}>
			<Stepper activeStep={activeStep} orientation='vertical' nonLinear>
				{stepsData.map((step, index) => (
					<Step key={step.key}>
						<StepButton
							id={index}
							onClick={handleStep}
							completed={isStepCompleted(index)}
							disabled={!isStepCompleted(index)}
							className={classes.stepLabel}
						>
							{step.label}
						</StepButton>
						<StepContent>
							{stepsComponents[step.key]}
							<div className={classes.actionsContainer}>
								<NextStepButton
									currentStep={step.key}
									onClick={handleNext(index)}
								/>
							</div>
						</StepContent>
					</Step>
				))}
			</Stepper>
		</div>
	);
};

export default NotificationInternalForm;
