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
		({ name, description, sort_order, title, ...rest }) => {
			return {
				...rest,
				sort_order: sort_order,
				description,
				name,
				title,
				...(rest.image
					? {
							media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${rest.image}`,
							file_name: rest.file_name
					  }
					: {})
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
		news.newsSlides.length > 0
			? news.newsSlides.map((item, index) => {
					console.log('itemSlide', item);
					return {
						//id: item.data[0].id,
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
		slides: slides,
		...(news.labels?.length ? { labels: [...news.labels] } : {}),

		// Destructing the viral id for edit state
		...(news.id ? { news_id: news.id } : {})
	};

	return newsData;
};

//
// Viral Form Helpers
//
export const newsFormInitialValues = {
	dropbox_url: '',
	labels: [],
	banner_title: '',
	banner_description: '',
	show_likes: true,
	show_comments: true,
	newsSlides: []
};

export const newsFormValidationSchema = Yup.object().shape({
	labels: Yup.array().min(7).required().label('Labels'),
	banner_title: Yup.string().required().label('Banner Title'),
	banner_description: Yup.string().required().label('Banner Description'),
	show_likes: Yup.boolean().required(),
	show_comments: Yup.boolean().required(),
	newsSlides: Yup.array().of(
		Yup.object({
			uploadedFiles: Yup.array().min(1).required(),
			dropbox_url: Yup.string(),
			title: Yup.string().label('Title'),
			description: Yup.string().label('Description'),
			name: Yup.string().label('Name')
		})
	)
});
