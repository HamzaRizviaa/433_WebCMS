import { getFormatter } from '../../components/ui/Table/ColumnFormatters';
import { getDateTime } from '../utils';
import { advancedSettingsValidationSchema } from './advancedSettingsHelpers';
import * as Yup from 'yup';
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
		dataField: 'created_at',
		text: 'POST DATE | TIME',
		sort: true,
		formatter: (content) =>
			getFormatter('wrapper', { content: getDateTime(content) })
	},
	{
		dataField: 'updated_at',
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
