import moment from 'moment';
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

export const ElementTypes = {
	MEDIA: 'MEDIA',
	TEXT: 'TEXT',
	TWITTER: 'TWITTER',
	IG: 'IG',
	QUESTION: 'QUESTION',
	MATCH: 'MATCH'
};

export const default433Profile = `${process.env.REACT_APP_MEDIA_ENDPOINT}/media/photos/Profile433.svg`;

export const matchElementDataFormatter = (item) => ({
	Day: moment(item?.data?.match?.data?.startdate).format('ddd, DD MMM'),
	Time: moment(item?.data?.match?.data?.startdate).format('HH:mm'),
	Team_1: {
		Name: item?.data?.match?.data?.participant_teams_data[0]?.name,
		Logo: item?.data?.match?.data?.participant_teams_data[0]?.team_logo,
		Team_Color:
			item?.data?.match?.data?.participant_teams_data[0]?.property
				?.home_shirt_color_1
	},
	Team_2: {
		Name: item?.data?.match?.data?.participant_teams_data[1]?.name,
		Logo: item?.data?.match?.data?.participant_teams_data[1]?.team_logo,
		Team_Color:
			item?.data?.match?.data?.participant_teams_data[1]?.property
				?.home_shirt_color_1
	}
});
