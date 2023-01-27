import * as yup from 'yup';

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

export const scheduleOptions = [
	{ value: 'now', label: 'Now' },
	{ value: 'schedule', label: 'Schedule' }
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

// INITIAL VALUES
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
		date: new Date(),
		time: { hour: '00', min: '00' },
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

// VALIDATION SCHEMAS

const step1ValidationSchema = yup.object({});
const step2ValidationSchema = yup.array().of(yup.object({}));
const step3ValidationSchema = yup.object({});
const step4ValidationSchema = yup.object({});
const step5ValidationSchema = yup.object({
	android_notification_channel: yup.string(),
	sound: yup.string().required('Required!'),
	apple_badge: yup.string().required('Required!'),
	expires_in: yup.string().required('Required!'),
	expiration_unit: yup.string().required('Required!'),
	custom_data: yup.array().of(
		yup.object().shape(
			{
				key: yup
					.string()
					.when('value', {
						is: (value) => !!value,
						then: yup.string().required('Key is required if value is present.'),
						otherwise: (schema) => schema
					})
					.test(
						'Is-duplicated?',
						'This key is already declared',
						function (value, ctx) {
							const customDataArray = ctx?.from[1]?.value?.custom_data || [];
							const filteredData = customDataArray.filter(
								(item) => item.key === value
							);
							return filteredData.length <= 1;
						}
					),
				value: yup.string().when('key', {
					is: (key) => !!key,
					then: yup.string().required('Value is required if key is present.'),
					otherwise: (schema) => schema
				})
			},
			['value', 'key']
		)
	)
});

export const notificationValidationSchema = yup.object({
	notification: step1ValidationSchema,
	target: step2ValidationSchema,
	scheduling: step3ValidationSchema,
	conversion_events: step4ValidationSchema,
	additional_options: step5ValidationSchema
});
