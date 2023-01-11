import { getFormatter } from '../../components/ui/Table/ColumnFormatters';
import { getDateTime } from '../utils';

export const ruleColumns = [
	{
		dataField: 'title',
		text: 'TITLE',
		sort: true,
		formatter: (content) => getFormatter('markup', { content })
	},

	{
		dataField: 'rule_type',
		text: 'RULE TYPE',
		sort: true,
		formatter: (content) => getFormatter('markup', { content })
	},
	{
		dataField: 'geo_block',
		text: 'GEO-BLOCK',
		sort: true,
		formatter: (content) => getFormatter('markup', { content })
	},
	{
		dataField: 'geo_block_time',
		text: 'GEO-BLOCK TIME',
		sort: true,
		formatter: (content) =>
			getFormatter('wrapper', { content: getDateTime(content) })
	},
	{
		dataField: 'age_restriction',
		text: 'AGE RESTRICTION',
		sort: true,
		formatter: (content) => getFormatter('markup', { content })
	},
	{
		dataField: 'tier',
		text: 'TIER',
		sort: true,
		formatter: (content) => getFormatter('status', { status: content })
	},
	{
		dataField: 'post_date',
		text: 'POST DATE | TIME',
		sort: true,
		formatter: (content) =>
			getFormatter('wrapper', { content: getDateTime(content) })
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
		formatter: () => getFormatter('options', { title: 'EDIT RULE' })
	}
];
