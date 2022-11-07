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

	formattedNews.uploadedFiles = !isEmpty(news.file_name)
		? [
				{
					id: makeid(10),
					file_name: news?.file_name,
					media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${news?.url}`,
					type: news?.thumbnail_url ? 'video' : 'image',
					...(news?.thumbnail_url
						? {
								thumbnail_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${news?.thumbnail_url}`
						  }
						: {})
				}
		  ]
		: [];

	return formattedNews;
};

export const newsDataFormatterForService = (news, file, isDraft = false) => {
	const newsData = {
		save_draft: isDraft,
		translations: undefined,
		user_data: getUserDataObject()
	};

	return newsData;
};

//
// News Form Helpers
//
export const newsFormInitialValues = {
	dropbox_url: '',
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
	slides: Yup.array().of(
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
});
