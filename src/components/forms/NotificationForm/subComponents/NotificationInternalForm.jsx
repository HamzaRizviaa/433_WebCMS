import React from 'react';

import { useNotificationStyles } from '../index.style';
import NotificationFormButtons from './NotificationFormButtons';
import NotificationStepper from './NotificationStepper';

const NotificationInternalForm = () => {
	const classes = useNotificationStyles();

	return (
		<div className={classes.root}>
			<NotificationStepper />
			<NotificationFormButtons />
		</div>
	);
};

export default NotificationInternalForm;
