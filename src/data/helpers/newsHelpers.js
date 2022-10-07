import { getFormatter } from '../../components/ui/Table/ColumnFormatters';
import { getDateTime } from '../utils';

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
		sort: true,
		formatter: () => getFormatter('options', { title: 'EDIT NEWS' })
	}
];
