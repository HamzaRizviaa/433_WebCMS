import React, { useMemo, useState } from 'react';
import { Formik, Form } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import DrawerLayout from '../../layouts/DrawerLayout';
import DeleteModal from '../../ui/modals/DeleteModal';
import NotificationInternalForm from './subComponents/NotificationInternalForm';
import useCommonParams from '../../../hooks/useCommonParams';
import {
	selectLibraryData,
	selectNotificationSliderState,
	selectSpecificNotification,
	selectSpecificNotificationStatus
} from '../../../data/selectors/notificationSelectors';
import {
	closeNotificationSlider,
	createOrEditNotificationThunk,
	deleteNotificationThunk,
	resetSchedulerError
} from '../../../data/features/notification/notificationSlice';
import {
	libraryTypeToActionMapper,
	notificationDataFormatterForForm,
	notificationDataFormatterForService,
	notificationInitialValues,
	notificationValidationSchema
} from '../../../data/helpers';

const NotificationForm = () => {
	const dispatch = useDispatch();

	// Query params
	const { queryParams } = useCommonParams();

	// Local States
	const [isLoading, setIsLoading] = useState(false);
	const [isDeleteModalOpen, setDeleteModalState] = useState(false);

	// Redux States
	const isSliderOpen = useSelector(selectNotificationSliderState);
	const libraryData = useSelector(selectLibraryData);
	const specificNotification = useSelector(selectSpecificNotification);
	const notificationLoadingStatus = useSelector(
		selectSpecificNotificationStatus
	);

	const isEdit = !!specificNotification?.id;
	const status = specificNotification?.notification_status;

	const initialValues = useMemo(() => {
		const initialValuesClone = { ...notificationInitialValues };

		const customData = initialValuesClone.additional_options.custom_data;
		customData[0].value = libraryData.contentType;
		customData[1].value = libraryData.contentId;

		return isEdit && !isEmpty(specificNotification)
			? notificationDataFormatterForForm(specificNotification)
			: initialValuesClone;
	}, [libraryData, isEdit, specificNotification]);

	const openDeleteModal = () => setDeleteModalState(true);
	const closeDeleteModal = () => setDeleteModalState(false);

	const handleClose = () => {
		dispatch(closeNotificationSlider());
		dispatch(resetSchedulerError());
	};

	const onSubmitHandler = async (values) => {
		setIsLoading(true);

		const getTableData = libraryTypeToActionMapper[libraryData.contentType];

		try {
			const notificationData = await notificationDataFormatterForService(
				values
			);
			const { type } = await dispatch(
				createOrEditNotificationThunk(notificationData)
			);

			if (type === 'notifications/createOrEditNotificationThunk/fulfilled') {
				dispatch(getTableData(queryParams));
				handleClose();
			}
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};

	const onDeleteHandler = async () => {
		setIsLoading(true);
		setDeleteModalState(false);

		const getTableData = libraryTypeToActionMapper[libraryData.contentType];

		try {
			await dispatch(
				deleteNotificationThunk({
					id: specificNotification?.id,
					moduleType: libraryData.contentType
				})
			);

			handleClose();
			dispatch(getTableData(queryParams));
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<DrawerLayout
			open={isSliderOpen}
			handleClose={handleClose}
			title={isEdit ? 'Edit Notification' : 'Compose Notification'}
			notifID={specificNotification?.id}
			isLoading={isLoading || notificationLoadingStatus === 'pending'}
			customWidth={850}
		>
			<Formik
				initialValues={initialValues}
				validationSchema={notificationValidationSchema}
				onSubmit={onSubmitHandler}
				enableReinitialize
				validateOnMount
			>
				<Form>
					<NotificationInternalForm
						openDeleteModal={openDeleteModal}
						isEdit={isEdit}
						status={status}
						onSubmitHandler={onSubmitHandler}
					/>
				</Form>
			</Formik>
			<DeleteModal
				open={isDeleteModalOpen}
				toggle={closeDeleteModal}
				deleteBtn={onDeleteHandler}
				text='Notification'
				isSubmitting={isLoading}
			/>
		</DrawerLayout>
	);
};

export default NotificationForm;
