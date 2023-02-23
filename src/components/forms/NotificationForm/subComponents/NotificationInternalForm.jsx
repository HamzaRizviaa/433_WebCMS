import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { usePermissionsAccessControl } from '../../../../hooks';
import NotificationFormButtons from './NotificationFormButtons';
import NotificationStepper from './NotificationStepper';
import { resetSpecificNotification } from '../../../../data/features/notification/notificationSlice';
import { useNotificationStyles } from '../index.style';

const NotificationInternalForm = ({
	isEdit,
	status,
	openDeleteModal,
	onSubmitHandler,
	handleClose
}) => {
	const dispatch = useDispatch();
	const classes = useNotificationStyles();

	const { permissions, getIsFieldInteractionAllowed } =
		usePermissionsAccessControl();
	const isFieldInteractionAllowed = getIsFieldInteractionAllowed(
		'Notifications',
		isEdit
	);

	useEffect(() => {
		return () => {
			dispatch(resetSpecificNotification());
		};
	}, []);

	return (
		<div className={classes.root}>
			<NotificationStepper
				status={status}
				isFieldInteractionAllowed={isFieldInteractionAllowed}
			/>
			<NotificationFormButtons
				isEdit={isEdit}
				status={status}
				isFieldInteractionAllowed={isFieldInteractionAllowed}
				canUserDelete={permissions && permissions.Notifications.delete}
				openDeleteModal={openDeleteModal}
				onSubmitHandler={onSubmitHandler}
				handleClose={handleClose}
			/>
		</div>
	);
};

NotificationInternalForm.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string,
	openDeleteModal: PropTypes.func.isRequired,
	onSubmitHandler: PropTypes.func.isRequired,
	handleClose: PropTypes.func.isRequired
};

export default NotificationInternalForm;
