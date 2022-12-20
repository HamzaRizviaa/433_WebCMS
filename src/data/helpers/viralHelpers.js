import { omit, isEmpty } from 'lodash';
import { getFormatter } from '../../components/ui/Table/ColumnFormatters';
import { getDateTime, makeid } from '../utils';
import { advancedSettingsValidationSchema, getUserDataObject } from './index';
import * as Yup from 'yup';

export const viralTableColumns = [
	{
		dataField: 'viral',
		text: 'VIRAL',
		sort: true,
		formatter: (_, row) =>
			getFormatter('media', {
				thumbnailUrl: row.thumbnail_url,
				mediaUrl: row.media,
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
		formatter: () => getFormatter('options', { title: 'EDIT VIRAL' })
	}
];

export const viralDataFormatterForForm = (viral) => {
	const formattedViral = { ...viral };

	if (formattedViral?.labels) {
		const updatedLabels = formattedViral?.labels.map((label) => ({
			id: -1,
			name: label
		}));
		formattedViral.labels = updatedLabels;
	}

	formattedViral.uploadedFiles = !isEmpty(viral.file_name)
		? [
				{
					id: makeid(10),
					file_name: viral?.file_name,
					media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${viral?.url}`,
					type: viral?.thumbnail_url ? 'video' : 'image',
					...(viral?.thumbnail_url
						? {
								thumbnail_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${viral?.thumbnail_url}`
						  }
						: {})
				}
		  ]
		: [];

	return formattedViral;
};

export const viralDataFormatterForService = (viral, file, isDraft = false) => {
	const { uploadedFiles } = viral;

	const viralData = {
		save_draft: isDraft,
		translations: undefined,
		user_data: getUserDataObject(),

		// Destructing the properties of viral
		...omit(viral, ['uploadedFiles', 'id', 'url']),
		media_url: viral.id ? viral.url : '',

		// Destructing the porperties of files
		...(uploadedFiles.length && !isEmpty(file)
			? {
					...omit(file, ['sort_order', 'signedUrlKeyDelete']),
					height: uploadedFiles[0].height || 0,
					width: uploadedFiles[0].width || 0
			  }
			: uploadedFiles.length
			? { ...uploadedFiles.length[0] }
			: {
					media_url: '',
					file_name: '',
					thumbnail_url: null,
					height: 0,
					width: 0
			  }),

		// Destructing the viral id for edit state
		...(viral.id ? { viral_id: viral.id } : {})
	};

	return viralData;
};

//
// Viral Form Helpers
//
export const viralFormInitialValues = {
	caption: '',
	dropbox_url: '',
	uploadedFiles: [],
	labels: [],
	show_likes: true,
	show_comments: true
};

export const viralFormValidationSchema = advancedSettingsValidationSchema.shape(
	{
		caption: Yup.string().required('You need to enter a caption'),
		dropbox_url: Yup.string(),
		uploadedFiles: Yup.array().min(1).required(),
		labels: Yup.array()
			.min(4, (obj) => {
				const labelsCount = obj.value?.length;
				return `You need to add ${
					4 - labelsCount
				} more labels in order to upload viral`;
			})
			.required('You need to enter atleast 4 labels')
			.label('Labels')
	}
);
