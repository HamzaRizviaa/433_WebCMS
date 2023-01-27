export const stepsData = [
	{ key: 'notification', label: 'Notification' },
	{ key: 'target', label: 'Target' },
	{ key: 'scheduling', label: 'Scheduling' },
	{ key: 'conversionEvents', label: 'Conversion Events' },
	{ key: 'additionalOptions', label: 'Additional Options (optional)' }
];

export const booleanOptions = [
	{ value: 'enabled', label: 'Enabled' },
	{ value: 'disabled', label: 'Disabled' }
];

export const expirationUnitOptions = [
	{ value: 'weeks', label: 'Weeks' },
	{ value: 'days', label: 'Days' },
	{ value: 'hours', label: 'Hours' },
	{ value: 'minutes', label: 'Minutes' }
];

export const expirationUnitRange = {
	weeks: 5,
	days: 8,
	hours: 25,
	minutes: 61
};

export const notificationInitialValues = {
	save_draft: true,
	notification: {
		uploadedFiles: [],
		notification_title: '',
		notification_text: '',
		notification_name: '',
		notification_image: '',
		notification_image_filename: '',
		notification_image_width: '',
		notification_image_height: '',
		notification_image_dropbox_url: ''
	},
	target: [{ topic_name: '' }],
	scheduling: {
		is_scheduled: false,
		date: '',
		time: '',
		schedule_date: null,
		schedule_notification: 'now'
	},
	conversion_events: {
		goal_metrics: '',
		analytics_label: ''
	},
	additional_options: {
		android_notification_channel: '',
		custom_data: [
			{ key: 'module_type', value: '' },
			{ key: 'post_id', value: '' },
			{ key: 'notification_type', value: 'comment' },
			{ key: '', value: '' }
		],
		sound: 'enabled',
		apple_badge: 'disabled',
		expires_in: 4,
		expiration_unit: 'weeks'
	}
};
