import React from 'react';
import NotificationStepForm from './NotificationStepForm';
import TargetStepForm from './TargetStepForm';
import SchedulingStepForm from './SchedulingStepForm';
import AdditionalOptionStepForm from './AdditionalOptionStepForm';
// import ConversionEventStepForm from './ConversionEventStepForm';

export const stepsComponents = {
	notification: <NotificationStepForm />,
	target: <TargetStepForm />,
	scheduling: <SchedulingStepForm />,
	additional_options: <AdditionalOptionStepForm />
	// conversion_events: <ConversionEventStepForm />,
};
