import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import DrawerLayout from '../../layouts/DrawerLayout';
import NotificationInternalForm from './subComponents/NotificationInternalForm';
import { selectNotificationSliderState } from '../../../data/selectors/notificationSelectors';
import { closeNotificationSlider } from '../../../data/features/notification/notificationSlice';
import { notificationInitialValues } from '../../../data/helpers';

const NotificationForm = ({
	isEdit
	// status // draft or publish
}) => {
	const dispatch = useDispatch();
	const isSliderOpen = useSelector(selectNotificationSliderState);

	const handleClose = () => {
		dispatch(closeNotificationSlider());
	};

	return (
		<DrawerLayout
			open={isSliderOpen}
			handleClose={handleClose}
			title={isEdit ? 'Edit Notification' : 'Compose Notification'}
			notifID={''}
			isLoading={false}
			customWidth={850}
		>
			<Formik initialValues={notificationInitialValues}>
				<Form>
					<NotificationInternalForm />
				</Form>
			</Formik>
		</DrawerLayout>
	);
};

NotificationForm.propTypes = {
	isEdit: PropTypes.bool.isRequired
	// status: PropTypes.string.isRequired
};

export default NotificationForm;
