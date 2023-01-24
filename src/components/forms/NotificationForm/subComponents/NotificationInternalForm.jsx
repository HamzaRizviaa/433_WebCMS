import React from 'react';
import { Stepper, Step, StepLabel, StepContent } from '@material-ui/core';

import Button from '../../../ui/Button';
import NotificationStepForm from './steps/NotificationStepForm';
import { useNotificationStyles } from '../index.style';
import TargetStepForm from './steps/TargetStepForm';
import SchedulingStepForm from './steps/SchedulingStepForm';
import ConversionEventStepForm from './steps/ConversionEventStepForm';
import AdditionalOptionStepForm from './steps/AdditionalOptionStepForm';

const NotificationInternalForm = () => {
	const [activeStep, setActiveStep] = React.useState(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	// const handleBack = () => {
	// 	setActiveStep((prevActiveStep) => prevActiveStep - 1);
	// };

	const handleClick = (event) => {
		setActiveStep(Number(event.currentTarget.id));
	};

	const classes = useNotificationStyles();

	return (
		<div className={classes.root}>
			<Stepper activeStep={activeStep} orientation='vertical'>
				<Step>
					<StepLabel id={0} onClick={handleClick} className={classes.stepLabel}>
						Notification
					</StepLabel>
					<StepContent>
						<NotificationStepForm />
						<div className={classes.actionsContainer}>
							<Button
								size='medium'
								className={classes.button}
								color='primary'
								onClick={handleNext}
							>
								NEXT STEP
							</Button>
						</div>
					</StepContent>
				</Step>
				<Step>
					<StepLabel id={1} onClick={handleClick} className={classes.stepLabel}>
						Target
					</StepLabel>
					<StepContent>
						<TargetStepForm />
						<div className={classes.actionsContainer}>
							<Button
								size='medium'
								className={classes.button}
								color='primary'
								onClick={handleNext}
							>
								NEXT STEP
							</Button>
						</div>
					</StepContent>
				</Step>
				<Step>
					<StepLabel id={2} onClick={handleClick} className={classes.stepLabel}>
						Scheduling
					</StepLabel>
					<StepContent>
						<SchedulingStepForm />
						<div className={classes.actionsContainer}>
							<Button
								size='medium'
								className={classes.button}
								color='primary'
								onClick={handleNext}
							>
								NEXT STEP
							</Button>
						</div>
					</StepContent>
				</Step>
				<Step>
					<StepLabel id={3} onClick={handleClick} className={classes.stepLabel}>
						Conversion events
					</StepLabel>
					<StepContent>
						<ConversionEventStepForm />
						<div className={classes.actionsContainer}>
							<Button
								size='medium'
								className={classes.button}
								color='primary'
								onClick={handleNext}
							>
								NEXT STEP
							</Button>
						</div>
					</StepContent>
				</Step>
				<Step>
					<StepLabel id={4} onClick={handleClick} className={classes.stepLabel}>
						Additional Option (optional)
					</StepLabel>
					<StepContent>
						<AdditionalOptionStepForm />
						<div className={classes.actionsContainer}>
							<Button
								size='medium'
								className={classes.button}
								color='primary'
								onClick={handleNext}
							>
								Finish
							</Button>
						</div>
					</StepContent>
				</Step>
			</Stepper>
		</div>
	);
};

export default NotificationInternalForm;
