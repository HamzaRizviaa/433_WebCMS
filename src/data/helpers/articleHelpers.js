/* eslint-disable no-unused-vars */
import { getFormatter } from '../../components/ui/Table/ColumnFormatters';
import { getDateTime } from '../utils';

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

export const getFileElementData = (file) => {
	return {
		description: file?.description || undefined,
		media_url:
			file?.media_url?.split('cloudfront.net/')[1] ||
			file?.media_url ||
			undefined,
		thumbnail_url:
			file?.thumbnail_url?.split('cloudfront.net/')[1] ||
			file?.thumbnail_url ||
			undefined,
		width: file?.width || undefined,
		height: file?.height || undefined,
		file_name: file?.file_name || undefined,
		dropbox_url: file?.dropbox_url || undefined,
		ig_post_url: file?.ig_post_url || undefined,
		twitter_post_url: file?.twitter_post_url || undefined
	};
};
