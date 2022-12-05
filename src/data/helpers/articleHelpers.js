import * as Yup from 'yup';
import { getFormatter } from '../../components/ui/Table/ColumnFormatters';
import { getDateTime } from '../utils';

const Profile433 = `${process.env.REACT_APP_MEDIA_ENDPOINT}/media/photos/6c69e8b4-12ad-4f51-adb5-88def57d73c7.png`;

export const articleTableColumns = [
	{
		dataField: 'article_title',
		text: 'ARTICLE TITLE',
		sort: true,
		formatter: (_, row) =>
			getFormatter('media', {
				fileName: row.title,
				fileHeight: row.height,
				fileWidth: row.width,
				mediaUrl: row.image
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
		dataField: 'user',
		text: 'USER',
		sort: true,
		formatter: (content) => getFormatter('markup', { content })
	},
	{
		dataField: 'last_edit',
		text: 'LAST EDIT',
		sort: true,
		formatter: (content) =>
			getFormatter('wrapper', { content: getDateTime(content) })
	},
	{
		dataField: 'status',
		text: 'STATUS',
		sort: true,
		formatter: (content) => getFormatter('status', { status: content })
	},
	{
		dataField: 'options',
		text: 'OPTIONS',
		formatter: () => getFormatter('options', { title: 'EDIT ARTICLE' })
	}
];

export const articleDataFormatterForForm = () => {};

export const articleFormInitialValues = {
	mainCategoryId: '',
	subCategoryId: '',
	mainCategoryName: '',
	subCategoryName: '',
	title: '',
	sub_text: '',
	dropbox_url: '',
	landscape_dropbox_url: '',
	uploadedFiles: [],
	uploadedLandscapeCoverImage: [],
	author_text: '433 Team',
	author_image: Profile433,
	labels: [],
	show_likes: true,
	show_comments: true
};

export const articleFormValidationSchema = Yup.object().shape({
	mainCategory: Yup.string().required().label('Main Category'),
	subCategory: Yup.string().required().label('Sub Category'),
	author_text: Yup.string().required().label('Author Name'),
	author_image: Yup.string().required().label('Author Image'),
	title: Yup.string().max(43).required().label('Title'),
	sub_text: Yup.string().max(84).required().label('Sub Title'),
	uploadedFiles: Yup.array().min(1).required().label('Portrait Image'),
	dropbox_url: Yup.string(),
	uploadedLandscapeCoverImage: Yup.array()
		.min(1)
		.required()
		.label('Landscape Image'),
	landscape_dropbox_url: Yup.string(),
	labels: Yup.array()
		.min(4, (obj) => {
			const labelsCount = obj.value?.length;
			return `You need to add ${
				4 - labelsCount
			} more labels in order to upload article`;
		})
		.required('You need to enter atleast 4 labels')
		.label('Labels'),
	show_likes: Yup.boolean().required(),
	show_comments: Yup.boolean().required()
});
