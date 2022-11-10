/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { isEmpty } from 'lodash';
import { getFormatter } from '../../components/ui/Table/ColumnFormatters';
import { getDateTime, makeid } from '../utils';
import { getUserDataObject } from './index';
import * as Yup from 'yup';

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
		text: 'POST DATE | TIME',
		sort: true,
		formatter: (content) =>
			getFormatter('wrapper', { content: getDateTime(content) })
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
		formatter: () => getFormatter('options', { title: 'EDIT NEWS' })
	}
];

export const newsDataFormatterForForm = (news) => {
	const formattedNews = { ...news };

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

	return formattedNews;
};

export const newsDataFormatterForService = (
	news,
	mediaFiles,
	isDraft = false
) => {
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
		translations: undefined,
		user_data: getUserDataObject(),
		save_draft: isDraft,
		banner_title: news.banner_title,
		banner_description: news.banner_description,
		show_likes: news.show_likes,
		show_comments: news.show_comments,
		labels: news.labels,
		slides: slides,

		// Destructing the viral id for edit state
		...(news.id ? { news_id: news.id } : {})
	};

	return newsData;
};

//
// News Form Helpers
//
export const newsFormInitialValues = {
	labels: [],
	banner_title: '',
	banner_description: '',
	show_likes: true,
	show_comments: true,
	slides: []
};

export const newsFormValidationSchema = Yup.object().shape({
	labels: Yup.array()
		.min(7, (obj) => {
			const labelsCount = obj.value?.length;
			return `You need to add ${
				7 - labelsCount
			} more labels in order to upload news`;
		})
		.required('You need to enter atleast 7 labels')
		.label('Labels'),
	banner_title: Yup.string()
		.trim()
		.required('You need to enter a banner title')
		.label('Banner Title'),
	banner_description: Yup.string()
		.trim()
		.required('You need to enter a banner description')
		.label('Banner Description'),
	show_likes: Yup.boolean().required(),
	show_comments: Yup.boolean().required(),
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
