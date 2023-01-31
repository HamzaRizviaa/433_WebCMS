import axiosInstance from '../axiosInstance';

class NotificationsService {
	/**
	 * This function is responsible for the creation of a single notification
	 * @param {Object} data - The data field contains the properties of a notification
	 * @returns Promise of the AxiosResponse Object
	 */
	static postNotification(data) {
		return axiosInstance.post('/notifications/send-notification', data);
	}

	/**
	 * This function is responsible for the fetching of a single notification
	 * @param {string} id - The id of a notification
	 * @returns Promise of the AxiosResponse Object
	 */
	static getSpecificNotification(id) {
		return axiosInstance.get(`/notifications/get-notification/`, {
			params: {
				notification_id: id
			}
		});
	}

	/**
	 * This function is responsible for the deletion of a single notification
	 * @param {string} id -  The id of a notification
	 * @returns Promise of the AxiosResponse Object
	 */
	static deleteNotification(data) {
		return axiosInstance.delete('/notifications/delete-notification', {
			params: {
				notification_id: data.id,
				module_type: data.moduleType
			}
		});
	}
}

export default NotificationsService;
