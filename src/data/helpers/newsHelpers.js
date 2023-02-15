import dayjs from 'dayjs';
import * as Yup from 'yup';

import { getFormatter } from '../../components/ui/Table/ColumnFormatters';
import { getDateTime } from '../utils';
import { getUserDataObject } from './index';
import { advancedSettingsValidationSchema } from './advancedSettingsHelpers';
import { CalendarYellowIcon } from '../../assets/svg-icons';

export const newsColumns = [
	{
		dataField: 'media',
		text: 'MEDIA',
		sort: true,
		formatter: (_, row) =>
			getFormatter('media', {
				thumbnailUrl: '',
				mediaUrl: row?.media || row?.image,
				fileName: row.file_name,
				fileHeight: row.height,
				fileWidth: row.width,
				noOfSlides: row.total_slides,
				showSlidesIcon: true
			})
	},
	{
		dataField: 'news_title',
		text: 'NEWS TITLE',
		sort: true,
		formatter: (content) => getFormatter('markup', { content })
	},
	{
		dataField: 'post_date',
		text: 'POST, SCHEDULE DATE | TIME',
		sort: true,
		formatter: (content, row) =>
			getFormatter('textAndIcon', {
				content: dayjs(content).format('DD-MM-YYYY | HH:mm'),
				Icon: row.is_scheduled ? CalendarYellowIcon : null
			})
	},
	{
		dataField: 'labels',
		text: 'LABELS',
		sort: true,
		formatter: (content) =>
			getFormatter('markup', {
				content: `${content[0]}${content[1] ? `, ${content[1]}` : ''}`
			})
	},
	{
		dataField: 'user',
		text: 'USER',
		sort: true,
		formatter: (content) => getFormatter('markup', { content })
	},
	{
		dataField: 'status',
		text: 'STATUS',
		sort: true,
		formatter: (content) => getFormatter('status', { status: content })
	},
	{
		dataField: 'last_edit',
		text: 'LAST EDIT',
		sort: true,
		formatter: (content) =>
			getFormatter('wrapper', { content: getDateTime(content) })
	},
	{
		dataField: 'options',
		text: 'OPTIONS',
		formatter: (_, row) =>
			getFormatter('options', {
				title: 'EDIT NEWS',
				notificationTitle: 'NOTIFICATION',
				contentType: 'news',
				contentId: row.id,
				notificationId: row.notification_id,
				notificationStatus: row.notification_status
			})
	}
];

export const newsDataFormatterForForm = (news, allRules) => {
	const formattedNews = { ...news };
	const rules = {};

	allRules.forEach((rule) => {
		rules[rule._id] = false;
	});

	//This loop should always run after the first one.
	news.rules.forEach((rule) => {
		rules[rule._id] = true;
	});

	if (formattedNews?.labels) {
		const updatedLabels = formattedNews?.labels.map((label) => ({
			id: -1,
			name: label
		}));
		formattedNews.labels = updatedLabels;
	}

	let slidesData = news.slides.map(
		({ name, description, title, dropbox_url, ...rest }) => {
			return {
				dropbox_url,
				description,
				name,
				title,
				uploadedFiles: rest.image
					? [
							{
								media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${rest.image}`,
								file_name: rest.file_name,
								width: rest.width,
								height: rest.height
							}
					  ]
					: []
			};
		}
	);

	formattedNews.slides = slidesData;
	formattedNews.rules = rules;
	formattedNews.save_draft = formattedNews.is_draft;

	return formattedNews;
};

export const newsDataFormatterForService = (news, mediaFiles, allRules) => {
	const { schedule_date, ...rest } = news;
	const filteredRules = allRules.filter((rule) => news.rules[rule._id]);
	let slides =
		news.slides.length > 0
			? news.slides.map((item, index) => {
					return {
						image:
							mediaFiles[index]?.media_url?.split('cloudfront.net/')[1] ||
							mediaFiles[index]?.media_url,
						file_name: mediaFiles[index]?.file_name,
						height: item.uploadedFiles[0]?.height,
						width: item.uploadedFiles[0]?.width,
						dropbox_url: item?.dropbox_url,
						description: item?.description,
						title: item?.title,
						name: item?.name,
						sort_order: index + 1
					};
			  })
			: [];

	const newsData = {
		...rest,
		translations: undefined,
		user_data: getUserDataObject(),
		banner_title: news.banner_title,
		banner_description: news.banner_description,
		show_likes: news.show_likes,
		show_comments: news.show_comments,
		labels: news.labels,
		slides: slides,
		rules: filteredRules
	};

	if (news.id) newsData.news_id = news.id;
	if (news.is_scheduled) newsData.schedule_date = schedule_date;

	return newsData;
};

export const newsFormInitialValues = (allRules) => {
	const rules = {};

	allRules.forEach((rule) => {
		rules[rule._id] = false;
	});

	return {
		labels: [],
		banner_title: '',
		banner_description: '',
		show_likes: true,
		show_comments: true,
		slides: [],
		rules,
		save_draft: true,
		is_scheduled: false
	};
};

export const newsFormValidationSchema = advancedSettingsValidationSchema.shape({
	labels: Yup.array()
		.min(4, (obj) => {
			const labelsCount = obj.value?.length;
			return `You need to add ${
				4 - labelsCount
			} more labels in order to upload news`;
		})
		.required('You need to enter atleast 4 labels')
		.label('Labels'),
	banner_title: Yup.string()
		.trim()
		.required('You need to enter a banner title')
		.label('Banner Title'),
	banner_description: Yup.string()
		.trim()
		.required('You need to enter a banner description')
		.label('Banner Description'),
	slides: Yup.array()
		.of(
			Yup.object({
				uploadedFiles: Yup.array()
					.min(1, 'Each News Slide should contain an Image.')
					.required(),
				dropbox_url: Yup.string().label('Dropbox URL'),
				title: Yup.string().label('Title'),
				description: Yup.string().label('Description'),
				name: Yup.string().label('Name')
			})
		)
		.min(1, 'Atleast one slide is required.')
});
