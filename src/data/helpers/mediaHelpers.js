import { getFormatter } from '../../components/ui/Table/ColumnFormatters';
import { getDateTime, makeid } from '../utils';
import { isEmpty } from 'lodash';
// import { getUserDataObject } from './index';
import * as Yup from 'yup';

export const mediaColumns = [
	{
		dataField: 'title',
		text: 'TITLE',
		sort: true,
		formatter: (content) => getFormatter('markup', { content })
	},
	{
		dataField: 'file_name',
		text: 'MEDIA',
		sort: true,
		formatter: (_, row) =>
			getFormatter('media', {
				thumbnailUrl: row?.thumbnail_url ? row?.thumbnail_url : row?.media,
				mediaUrl: '', //row?.media || row?.image,
				fileName: row.file_name,
				fileHeight: row.height,
				fileWidth: row.width
			})
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
		dataField: 'type',
		text: 'TYPE',
		sort: true,
		formatter: (content) => getFormatter('markup', { content })
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
		formatter: () => getFormatter('options', { title: 'EDIT MEDIA' })
	}
];

export const mediaDataFormatterForForm = (media) => {
	const formattedMedia = { ...media };

	if (formattedMedia?.labels) {
		const updatedLabels = formattedMedia?.labels.map((label) => ({
			id: -1,
			name: label
		}));
		formattedMedia.labels = updatedLabels;
	}

	formattedMedia.uploadedFiles = !isEmpty(media.file_name)
		? [
				{
					id: makeid(10),
					file_name: media?.file_name,
					media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${media?.url}`,
					type: media?.thumbnail_url ? 'video' : 'image',
					...(media?.thumbnail_url
						? {
								thumbnail_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${media?.thumbnail_url}`
						  }
						: {})
				}
		  ]
		: [];

	return formattedMedia;
};

export const mediaDataFormatterForService = (id, payload) => {
	console.log('ID', id);
	console.log('PAYLOAD', payload);
};

export const mediaFormInitialValues = {
	mainCategory: '',
	subCategory: '',
	title: '',
	media_dropbox_url: '', // uploaded file
	image_dropbox_url: '', //portrait
	landscape_image_dropbox_url: '', //landscape
	description: '',
	labels: [],
	uploadedFiles: [],
	uploadedCoverImage: [], // PORTRAIT
	uploadedLandscapeCoverImage: [], //LANDSCAPE
	show_likes: true,
	show_comments: true
};

export const mediaFormValidationSchema = Yup.object().shape({
	mainCategory: Yup.string(),
	subCategory: Yup.string(),
	title: Yup.string().required().label('Title'),
	media_dropbox_url: Yup.string(),
	image_dropbox_url: Yup.string(),
	landscape_image_dropbox_url: Yup.string(),
	description: Yup.string().required().label('Description'),
	labels: Yup.array().min(7).required().label('Labels'),
	uploadedFiles: Yup.array().min(1).required(),
	uploadedCoverImage: Yup.array().min(1).required(),
	uploadedLandscapeCoverImage: Yup.array().min(1).required(),
	show_likes: Yup.boolean().required(),
	show_comments: Yup.boolean().required()
});
