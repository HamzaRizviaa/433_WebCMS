import React from 'react';
import dayjs from 'dayjs';

import { getFormatter } from '../../../components/ui/Table/ColumnFormatters';
import { getDateTime } from '../../utils';
import {
	Text,
	Instragram,
	ImageVideo,
	TwitterLine,
	BallIcon,
	Question,
	CalendarYellowIcon
} from '../../../assets/svg-icons';

export const Profile433 = `${process.env.REACT_APP_MEDIA_ENDPOINT}/media/photos/6c69e8b4-12ad-4f51-adb5-88def57d73c7.png`;
export const default433Profile = `${process.env.REACT_APP_MEDIA_ENDPOINT}/media/photos/Profile433.svg`;

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

export const ARTICLE_ELEMENTS_TYPES = {
	MEDIA: 'MEDIA',
	TEXT: 'TEXT',
	TWITTER: 'TWITTER',
	IG: 'IG',
	QUESTION: 'QUESTION',
	MATCH: 'MATCH'
};

export const articleSidebarElements = [
	{
		image: <Text />,
		text: 'Add Text',
		data: {
			element_type: ARTICLE_ELEMENTS_TYPES.TEXT,
			description: '',
			dropbox_url: ''
		}
	},
	{
		image: <ImageVideo />,
		text: 'Add Image / Video',
		data: {
			element_type: ARTICLE_ELEMENTS_TYPES.MEDIA,
			uploadedFiles: [],
			dropbox_url: ''
		}
	},
	{
		image: <TwitterLine />,
		text: 'Add Tweet',
		data: {
			element_type: ARTICLE_ELEMENTS_TYPES.TWITTER,
			twitter_post_url: '',
			dropbox_url: ''
		}
	},
	{
		image: <Instragram />,
		text: 'Add IG post',
		data: {
			element_type: ARTICLE_ELEMENTS_TYPES.IG,
			ig_post_url: '',
			dropbox_url: ''
		}
	},
	{
		image: <Question />,
		text: 'Add Question',
		data: {
			element_type: ARTICLE_ELEMENTS_TYPES.QUESTION,
			question_data: {
				question_type: 'poll',
				uploadedFiles: [],
				labels: [],
				dropbox_url: '',
				question: '',
				answers: [
					{
						answer: ''
					},
					{
						answer: ''
					}
				]
			}
		}
	},
	{
		image: <BallIcon />,
		text: 'Add Match',
		data: {
			element_type: ARTICLE_ELEMENTS_TYPES.MATCH,
			league_name: '',
			match_title: '',
			team_name: '',
			match_id: '',
			match: {}
		}
	}
];

// EXPORTS
export * from './articleValidationHelpers';
export * from './articleInitialValuesHelpers';
export * from './articleDataFormatterHelpers';
