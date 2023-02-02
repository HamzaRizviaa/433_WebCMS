import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import NotificationFormButtons from './NotificationFormButtons';
import NotificationStepper from './NotificationStepper';
import { resetSpecificNotification } from '../../../../data/features/notification/notificationSlice';
import { useNotificationStyles } from '../index.style';

const NotificationInternalForm = ({
	isEdit,
	status,
	openDeleteModal,
	onSubmitHandler
}) => {
	const dispatch = useDispatch();
	const classes = useNotificationStyles();

	useEffect(() => {
		return () => {
			dispatch(resetSpecificNotification());
		};
	}, []);

	return (
		<div className={classes.root}>
			<NotificationStepper status={status} />
			<NotificationFormButtons
				isEdit={isEdit}
				status={status}
				openDeleteModal={openDeleteModal}
				onSubmitHandler={onSubmitHandler}
			/>
		</div>
	);
};

NotificationInternalForm.propTypes = {
	isEdit: PropTypes.bool.isRequired,
	status: PropTypes.string,
	openDeleteModal: PropTypes.func.isRequired,
	onSubmitHandler: PropTypes.func.isRequired
};

export default NotificationInternalForm;
