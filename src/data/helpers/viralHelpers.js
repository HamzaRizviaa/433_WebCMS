import * as Yup from 'yup';
import dayjs from 'dayjs';
import { omit, isEmpty } from 'lodash';

import { CalendarYellowIcon } from '../../assets/svg-icons';
import { getFormatter } from '../../components/ui/Table/ColumnFormatters';
import { makeid } from '../utils';
import { advancedSettingsValidationSchema } from './advancedSettingsHelpers';
import { getRelativePath } from './commonHelpers';

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
		dataField: 'last_edit',
		text: 'LAST EDIT',
		sort: true,
		formatter: (content) =>
			getFormatter('wrapper', {
				content: dayjs(content).format('DD-MM-YYYY | HH:mm')
			})
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

export const viralDataFormatterForForm = (viral, allRules) => {
	const rules = {};

	allRules.forEach((rule) => {
		rules[rule._id] = false;
	});
	//This loop should always run after the first one.
	viral.rules.forEach((rule) => {
		rules[rule._id] = true;
	});

	const updatedLabels = viral?.labels.map((label) => ({
		id: -1,
		name: label
	}));

	const uploadedFiles = !isEmpty(viral.file_name)
		? [
				{
					id: makeid(10),
					file_name: viral?.file_name,
					media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${viral?.url}`,
					type: viral?.thumbnail_url ? 'video' : 'image',
					height: viral.height,
					width: viral.width,
					...(viral?.thumbnail_url
						? {
								thumbnail_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${viral?.thumbnail_url}`
						  }
						: {})
				}
		  ]
		: [];

	const payload = {
		id: viral.id,
		caption: viral.caption,
		dropbox_url: viral.dropbox_url,
		labels: updatedLabels,
		show_likes: viral.show_likes,
		show_comments: viral.show_comments,
		save_draft: viral.status === 'draft',
		is_scheduled: viral.is_scheduled,
		uploadedFiles,
		rules
	};

	if (viral.is_scheduled) payload.schedule_date = viral.schedule_date;

	return payload;
};

export const viralDataFormatterForService = (viral, file, allRules) => {
	const { id, uploadedFiles, schedule_date, ...rest } = viral;
	const filteredRules = allRules.filter((rule) => viral.rules[rule._id]);

	const viralData = {
		// Spreading the properties of viral
		...rest,

		// Spreading the porperties of files
		...(!isEmpty(file)
			? {
					...omit(file, ['sort_order', 'signedUrlKeyDelete']),
					height: uploadedFiles[0].height || 0,
					width: uploadedFiles[0].width || 0
			  }
			: {
					media_url: getRelativePath(uploadedFiles[0]?.media_url) || '',
					file_name: uploadedFiles[0]?.file_name || '',
					thumbnail_url:
						getRelativePath(uploadedFiles[0]?.thumbnail_url) || null,
					height: uploadedFiles[0]?.height || 0,
					width: uploadedFiles[0]?.width || 0
			  }),
		rules: filteredRules,

		// Spreading the viral id for edit state
		...(id ? { viral_id: id } : {}),

		// Spreading the viral schedule flag for edit state
		...(schedule_date ? { schedule_flag_enabled: true, schedule_date } : {})
	};

	return viralData;
};

//
// Viral Form Helpers
//

export const viralFormInitialValues = (allRules) => {
	const rules = {};

	allRules.forEach((rule) => {
		rules[rule._id] = false;
	});

	return {
		caption: '',
		dropbox_url: '',
		uploadedFiles: [],
		labels: [],
		show_likes: true,
		show_comments: true,
		save_draft: true,
		rules
	};
};

export const viralFormValidationSchema = advancedSettingsValidationSchema.shape(
	{
		caption: Yup.string().required('You need to enter a caption'),
		dropbox_url: Yup.string(),
		uploadedFiles: Yup.array()
			.min(1, 'You need to upload a file to post viral')
			.required(),
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
