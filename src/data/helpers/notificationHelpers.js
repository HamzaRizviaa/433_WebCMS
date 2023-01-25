export const stepsData = [
	{ key: 'notification', label: 'Notification' },
	{ key: 'target', label: 'Target' },
	{ key: 'scheduling', label: 'Scheduling' },
	{ key: 'conversionEvents', label: 'Conversion Events' },
	{ key: 'additionalOption', label: 'Additional Options (optional)' }
];

export const notificationInitialValues = {
	notification: {
		notification_title: '',
		notification_text: '',
		notification_image: '',
		notification_name: ''
	},
	target: [
		{
			target_users: [
				{ appId: '' },
				{
					target_type: '',
					target_operator: '',
					target_data: []
				}
			]
		}
	],
	scheduling: {
		send_to_eligible_user: '',
		date: '',
		time: '',
		schedule_date: null
	},
	conversion_events: {
		goal_metrics: '',
		analytics_label: ''
	},
	additional_options: {
		android_notification_channel: '',
		sound: '',
		apple_badge: '',
		expires_in: 0,
		expiration_unit: ''
	}
};
