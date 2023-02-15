/* eslint-disable react/react-in-jsx-scope */
import * as yup from 'yup';
import uploadFilesToS3 from '../utils/uploadFilesToS3';
import {
	formatScheduleDate,
	generateISODateTimeStamp,
	getRelativePath
} from './commonHelpers';
import { getAllNewsApi } from '../features/newsLibrary/newsLibraryActions';
import { getAllArticlesApi } from '../features/articleLibrary/articleLibraryActions';
import { getAllMedia } from '../features/mediaLibrary/mediaLibraryActions';
import { getAllViralsApi } from '../features/viralLibrary/viralLibraryActions';
import { AndroidIcon, AppleIcon } from '../../assets/svg-icons';

export const topicNameOptions = [
	{
		value: 'ios',
		label: (
			<div className='select-label-with-icon'>
				<AppleIcon /> <span>IOS</span>
			</div>
		)
	},
	{
		value: 'android',
		label: (
			<div className='select-label-with-icon'>
				<AndroidIcon /> <span>Android</span>
			</div>
		)
	}
];

export const stepsData = [
	{ key: 'notification', label: 'Notification' },
	{ key: 'target', label: 'Target' },
	{ key: 'scheduling', label: 'Scheduling' },
	// { key: 'conversion_events', label: 'Conversion Events' },
	{ key: 'additional_options', label: 'Additional Options (optional)' }
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
	weeks: 4,
	days: 7,
	hours: 24,
	minutes: 60
};

export const libraryTypeToActionMapper = {
	news: getAllNewsApi,
	media: getAllMedia,
	article: getAllArticlesApi,
	viral: getAllViralsApi
};

export const filterSelectedTopics = (
	selectedTopics,
	allTopics,
	currentIndex
) => {
	const topicNames = selectedTopics
		.filter((_, idx) => idx !== currentIndex)
		.map((item) => item.topic_name);

	const filteredTopicNameOptions = allTopics.filter(
		(item) => !topicNames.includes(item.value)
	);

	return filteredTopicNameOptions;
};

export const notificationDataFormatterForForm = (notif) => {
	const { startStamp } = formatScheduleDate(notif.schedule_date);

	const emptyObj = { key: '', value: '' };

	const payload = {
		save_draft: notif.notification_status === 'draft',
		notification_id: notif.id,
		notification_status: notif.notification_status,
		notification: {
			notification_title: notif.notification_title,
			notification_text: notif.notification_text,
			uploadedFiles: notif.notification_image
				? [
						{
							media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${notif.notification_image}`,
							file_name: notif.notification_image_filename,
							width: notif.notification_image_width,
							height: notif.notification_image_height
						}
				  ]
				: [],
			notification_image_dropbox_url: notif.notification_image_dropbox_url,
			notification_name: notif.notification_name
		},
		target: notif.target,
		scheduling: {
			date: startStamp.date || new Date(),
			time: { hour: startStamp.hour || '00', min: startStamp.min || '00' },
			schedule_notification: notif.schedule_date ? 'schedule' : 'now'
		},
		additional_options: {
			android_notification_channel:
				notif.additional_options.android_notification_channel,
			custom_data: [...notif.additional_options.custom_data, emptyObj],
			sound: notif.additional_options.sound ? 'enabled' : 'disabled',
			apple_badge: notif.additional_options.apple_badge
				? 'enabled'
				: 'disabled',
			expiration_unit: notif.additional_options.expiration_unit,
			expires_in: notif.additional_options.expires_in
		}
	};
	return payload;
};

export const notificationDataFormatterForService = async (values) => {
	const uploadedFiles = await uploadFilesToS3(
		values.notification.uploadedFiles,
		'newslibrary'
	);

	const { scheduling } = values;

	const notificationData = {
		save_draft: values.save_draft,
		is_scheduled:
			!values.save_draft && scheduling.schedule_notification === 'schedule',
		notification: {
			notification_title: values?.notification?.notification_title || '',
			notification_text: values?.notification?.notification_text || '',
			notification_name: values?.notification?.notification_name || '',
			notification_image:
				getRelativePath(uploadedFiles[0]?.media_url) || undefined,
			notification_image_filename:
				values?.notification?.uploadedFiles[0]?.file_name,
			notification_image_width: values?.notification?.uploadedFiles[0]?.width,
			notification_image_height: values?.notification?.uploadedFiles[0]?.height,
			notification_image_dropbox_url: values?.notification_image_dropbox_url
		},
		target: values.target,
		additional_options: {
			android_notification_channel:
				values?.additional_options.android_notification_channel,
			sound: values?.additional_options.sound === 'enabled',
			apple_badge: values?.additional_options.apple_badge === 'enabled',
			expires_in: values?.additional_options.expires_in,
			expiration_unit: values?.additional_options.expiration_unit,
			custom_data: values?.additional_options.custom_data.filter(
				(data) => data.key
			)
		}
	};

	if (scheduling.schedule_notification === 'schedule') {
		notificationData.schedule_date = generateISODateTimeStamp(
			scheduling.date,
			scheduling.time.hour,
			scheduling.time.min
		);
	}

	if (values.notification_id)
		notificationData.notification_id = values.notification_id;

	return notificationData;
};

// INITIAL VALUES
export const notificationInitialValues = {
	save_draft: true,
	notification: {
		uploadedFiles: [],
		notification_title: '',
		notification_text: '',
		notification_name: ''
	},
	target: [{ topic_name: '' }],
	scheduling: {
		is_scheduled: false,
		date: new Date(),
		time: { hour: '00', min: '00' },
		schedule_notification: 'now'
	},
	// conversion_events: {
	// 	goal_metrics: '',
	// 	analytics_label: ''
	// },
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

const step1ValidationSchema = yup.object({
	notification_title: yup.string(),
	notification_text: yup
		.string()
		.required('You need to enter notification text'),
	uploadedFiles: yup.array().max(1),
	notification_name: yup.string()
});
const step2ValidationSchema = yup.array().of(
	yup.object({
		topic_name: yup.string().required('You need to enter topic name')
	})
);
const step3ValidationSchema = yup.object({
	time: yup.object().when('schedule_notification', {
		is: (val) => val === 'schedule',
		then: yup.object({ min: yup.string().required('Required!') }),
		otherwise: yup.object().notRequired()
	})
});

// const step4ValidationSchema = yup.object({});
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
						'This key is duplicated',
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

export const notificationStepsValidationSchemas = {
	notification: step1ValidationSchema,
	target: step2ValidationSchema,
	scheduling: step3ValidationSchema,
	// conversion_events: step4ValidationSchema,
	additional_options: step5ValidationSchema
};

export const notificationValidationSchema = yup.object(
	notificationStepsValidationSchemas
);
