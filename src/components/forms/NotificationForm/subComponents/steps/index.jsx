import React from 'react';

import NotificationStepForm from './NotificationStepForm';
import TargetStepForm from './TargetStepForm';
import SchedulingStepForm from './SchedulingStepForm';
import ConversionEventStepForm from './ConversionEventStepForm';
import AdditionalOptionStepForm from './AdditionalOptionStepForm';

export const stepsComponents = {
	notification: <NotificationStepForm />,
	target: <TargetStepForm />,
	scheduling: <SchedulingStepForm />,
	conversion_events: <ConversionEventStepForm />,
	additional_options: <AdditionalOptionStepForm />
};
