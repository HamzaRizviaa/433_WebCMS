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

export const ruleDataFormatterForForm = (rule, allRules) => {
	//rule - rule library
	//rules - geo blockiing rules

	const rules = {};

	allRules.forEach((rule) => {
		rules[rule._id] = false;
	});
	//This loop should always run after the first one.
	rule.rules.forEach((rule) => {
		rules[rule._id] = true;
	});

	const payload = {
		id: rule.id,
		title: rule.title,
		rules
	};

	// if (viral.is_scheduled) payload.schedule_date = viral.schedule_date;

	return payload;
};

export const ruleDataFormatterForService = (rule, allRules) => {
	const { id, schedule_date, ...rest } = rule;
	const filteredRules = allRules.filter((rule) => rule.rules[rule._id]);

	const ruleData = {
		// Spreading the properties of rule
		...rest,
		rules: filteredRules,

		// Spreading the rule id for edit state
		...(id ? { viral_id: id } : {}),

		// Spreading the rule schedule flag for edit state
		...(schedule_date ? { schedule_flag_enabled: true, schedule_date } : {})
	};

	return ruleData;
};

export const ruleFormInitialValues = (allRules) => {
	const rules = {};

	allRules.forEach((rule) => {
		rules[rule._id] = false;
	});

	return {
		title: '',
		rules
	};
};

// export const ruleFormValidationSchema = advancedSettingsValidationSchema.shape({
// 	title: Yup.string().required('You need to enter a title')
// });
