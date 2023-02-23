import { getFormatter } from '../../components/ui/Table/ColumnFormatters';

export const rbacColumns = [
	{
		dataField: 'title',
		text: 'NAME',
		sort: true,
		formatter: (content) => getFormatter('markup', { content: content || '-' })
	},

	{
		dataField: 'rule_type',
		text: 'ROLE',
		sort: true,
		formatter: (content) => getFormatter('markup', { content: content || '-' })
	},
	{
		dataField: 'rule_type',
		text: 'LAST ONLINE',
		sort: true,
		formatter: (content) => getFormatter('markup', { content: content || '-' })
	},
	{
		dataField: 'rule_type',
		text: 'STATUS',
		sort: true,
		formatter: (content) => getFormatter('markup', { content: content || '-' })
	},

	{
		dataField: 'options',
		text: 'OPTIONS',
		formatter: () => getFormatter('options', { title: 'EDIT RBAC' })
	}
];
