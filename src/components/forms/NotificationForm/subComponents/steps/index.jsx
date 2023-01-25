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
	conversionEvents: <ConversionEventStepForm />,
	additionalOptions: <AdditionalOptionStepForm />
};
