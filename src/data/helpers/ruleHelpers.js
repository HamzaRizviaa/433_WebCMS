/* eslint-disable no-unused-vars */
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
	const { _id } = rule;
	//rule - rule library

	const payload = {
		title: rule.title,
		age: {
			min: rule.age.min,
			max: rule.age.max
		},
		geoblocking: {
			countries: rule.geoblocking.countries,
			duration: rule.geoblocking.duration
		},
		geoblockToggle: rule.geoblocking.countries.length > 0 || false,
		ageToggle: !!rule.age.min || !!rule.age.max,
		...(_id ? { _id } : {})
	};

	// if (viral.is_scheduled) payload.schedule_date = viral.schedule_date;

	return payload;
};

export const ruleDataFormatterForService = (rule) => {
	const { _id } = rule;

	const payload = {
		title: rule.title,
		age: {
			min: rule.age.min,
			max: rule.age.max
		},
		geoblocking: {
			countries: rule.geoblocking.countries,
			duration: rule.geoblocking.duration
		},
		...(_id ? { _id } : {})
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
	age: {
		min: '',
		max: ''
	},
	geoblocking: {
		countries: [],
		duration: ''
	},
	ageToggle: false,
	geoblockToggle: false
};

export const ruleFormValidationSchema = Yup.object().shape({
	title: Yup.string().required('You need to enter a title'),
	age: Yup.object().shape(
		{
			min: Yup.string().when('max', {
				is: (max) => !max,
				// !max || max.length === 0,
				then: Yup.string().required('At least one of the Fields is required'),
				otherwise: Yup.string().notRequired()
			}),
			max: Yup.string().when('min', {
				is: (min) => !min,
				then: Yup.string().required('At least one of the Fields is requiredd'),
				otherwise: Yup.string().notRequired()
			})
		},
		['max', 'min']
	),
	geoblocking: Yup.object().shape({
		countries: Yup.array()
			.min(1, "You can't leave this blank.")
			.required("You can't leave this blank."),
		duration: Yup.string()
	})
});
