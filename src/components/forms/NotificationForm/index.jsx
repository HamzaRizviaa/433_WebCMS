import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import DrawerLayout from '../../layouts/DrawerLayout';
import NotificationInternalForm from './subComponents/NotificationInternalForm';
import {
	selectLibraryData,
	selectNotificationSliderState
} from '../../../data/selectors/notificationSelectors';
import {
	closeNotificationSlider,
	createOrEditNotificationThunk
} from '../../../data/features/notification/notificationSlice';
import {
	notificationInitialValues,
	notificationValidationSchema
} from '../../../data/helpers';

const NotificationForm = ({
	isEdit
	// status // draft or publish
}) => {
	const dispatch = useDispatch();
	const isSliderOpen = useSelector(selectNotificationSliderState);
	const libraryData = useSelector(selectLibraryData);

	const initialValues = useMemo(() => {
		const initialValuesClone = { ...notificationInitialValues };

		const customData = initialValuesClone.additional_options.custom_data;
		customData[0].value = libraryData.contentType;
		customData[1].value = libraryData.contentId;

		return initialValuesClone;
	}, [libraryData]);

	const handleClose = () => {
		dispatch(closeNotificationSlider());
	};

	const onSubmitHandler = useCallback(async (values, formikBag) => {
		formikBag.setSubmitting(true);

		try {
			// const notificationData = notificationDataFormatterForService(values);

			const { type } = await dispatch(createOrEditNotificationThunk(values));

			if (type === 'notifications/createOrEditNotificationThunk/fulfilled') {
				handleClose();

				if (isEdit) {
					// edit thunk
				} else {
					// navigate back to library
				}
			}
		} catch (e) {
			console.error(e);
		} finally {
			formikBag.setSubmitting(false);
		}
	}, []);

	return (
		<DrawerLayout
			open={isSliderOpen}
			handleClose={handleClose}
			title={isEdit ? 'Edit Notification' : 'Compose Notification'}
			notifID={''}
			isLoading={false}
			customWidth={850}
		>
			<Formik
				initialValues={initialValues}
				validationSchema={notificationValidationSchema}
				enableReinitialize
				validateOnMount
				onSubmit={onSubmitHandler}
			>
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
