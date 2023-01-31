import React from 'react';
import PropTypes from 'prop-types';

import { useNotificationStyles } from '../index.style';
import NotificationFormButtons from './NotificationFormButtons';
import NotificationStepper from './NotificationStepper';

const NotificationInternalForm = ({ openDeleteModal }) => {
	const classes = useNotificationStyles();

	return (
		<div className={classes.root}>
			<NotificationStepper />
			<NotificationFormButtons openDeleteModal={openDeleteModal} />
		</div>
	);
};

NotificationInternalForm.propTypes = {
	openDeleteModal: PropTypes.func.isRequired
};

export default NotificationInternalForm;
