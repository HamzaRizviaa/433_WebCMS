import { getFormatter } from '../../components/ui/Table/ColumnFormatters';
import { getDateTime } from '../utils';
import { advancedSettingsValidationSchema } from './advancedSettingsHelpers';
import * as Yup from 'yup';

const ageFormatter = (content) => {
	if (content.min !== undefined && content.max !== undefined) {
		return `> ${content.min} & < ${content.max}`;
	}
	if (content.min && content.max === undefined) {
		return `> ${content.min}`;
	}
	if (content.max && content.min === undefined) {
		return `< ${content.max}`;
	}

	return '-';
};

export const ruleColumns = [
	{
		dataField: 'title',
		text: 'TITLE',
		sort: true,
		formatter: (content) => getFormatter('markup', { content: content || '-' })
	},

	{
		dataField: 'rule_type',
		text: 'RULE TYPE',
		sort: true,
		formatter: (content) => getFormatter('markup', { content: content || '-' })
	},
	{
		dataField: 'geoblocking.countries',
		text: 'GEO-BLOCK',
		sort: true,
		formatter: (content) => getFormatter('markup', { content: content || '-' })
	},
	{
		dataField: 'geoblocking.duration',
		text: 'GEO-BLOCK TIME',
		sort: true,
		formatter: (content) =>
			getFormatter('wrapper', { content: content ? content + ' hours' : '-' })
	},
	{
		dataField: 'age',
		text: 'AGE RESTRICTION',
		formatter: (content) =>
			getFormatter('wrapper', { content: ageFormatter(content) })
	},
	{
		dataField: 'tier',
		text: 'TIER',
		sort: true,
		formatter: (content) => getFormatter('markup', { content: content || '-' })
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

export const ruleDataFormatterForForm = (rule) => {
	console.log(rule, 'rule on helpers');
	//rule - rule library

	const payload = {
		id: rule.id,
		title: rule.title,
		age: {
			min: rule.min,
			max: rule.max
		},
		geoblocking: {
			countries: rule.countries,
			duration: rule.duration
		}
	};

	// if (viral.is_scheduled) payload.schedule_date = viral.schedule_date;

	return payload;
};

export const ruleDataFormatterForService = (rule) => {
	const { id } = rule;

	const payload = {
		id: rule.id,
		title: rule.title,
		age: {
			min: rule.min,
			max: rule.max
		},
		geoblocking: {
			countries: rule.countries,
			duration: rule.duration
		},
		...(id ? { rule_id: id } : {})
	};

	// const ruleData = {
	// 	// Spreading the properties of rule
	// 	...rest,

	// 	// Spreading the rule id for edit state
	// 	...(id ? { rule_id: id } : {})
	// };

	return payload;
};

export const ruleFormInitialValues = {
	title: '',
	min: '',
	max: '',
	countries: [],
	duration: ''
};

export const ruleFormValidationSchema = advancedSettingsValidationSchema.shape({
	title: Yup.string().required('You need to enter a title')
});
