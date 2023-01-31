import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import NotificationsService from '../../services/notificationsService';

export const getSpecificNotification = createAsyncThunk(
	'notifications/getSpecificRule', // not url , url is in services
	async (id) => {
		const response = await NotificationsService.getSpecificNotification(id);
		if (response?.data?.data) {
			return response.data.data;
		} else {
			return [];
		}
	}
);

export const createOrEditRuleThunk = createAsyncThunk(
	'notifications/createOrEditRuleThunk',
	async (data) => {
		try {
			const response = await NotificationsService.postNotification(data);

			if (response.data.status_code === 200) {
				toast.success(
					data.rule_id
						? 'Notification has been edited!'
						: 'Notification has been created!'
				);
			}
		} catch (e) {
			toast.error(
				data.rule_id
					? 'Failed to edit Notification!'
					: 'Failed to create Notification!'
			);
			console.error(e);
			throw new Error(e);
		}
	}
);

export const deleteRuleThunk = createAsyncThunk(
	'notifications/deleteRuleThunk',
	async (data) => {
		try {
			const response = await NotificationsService.deleteNotification(data);

			if (response.data.status_code === 200) {
				toast.success('Notification has been deleted!');
			}
		} catch (e) {
			toast.error('Failed to delete Notification!');
			console.error(e);
		}
	}
);
