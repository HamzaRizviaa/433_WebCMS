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
	const { _id } = rule;
	//rule - rule library

	const payload = {
		title: rule?.title,
		...(rule?.age?.min || rule?.age?.max
			? {
					age: { ...rule?.age }
			  }
			: {}),
		geoblocking: {
			countries: rule?.geoblocking?.countries || [],
			duration: rule?.geoblocking?.duration || ''
		},
		toggleObject: {
			geoblockToggle: rule?.geoblocking?.countries?.length > 0 || false,
			ageToggle: !!rule?.age?.min || !!rule?.age?.max || false
		},
		...(_id ? { _id } : {})
	};

	console.log('Rulepayload', payload);

	// if (viral.is_scheduled) payload.schedule_date = viral.schedule_date;

	return payload;
};

export const ruleDataFormatterForService = (rule) => {
	const { _id, toggleObject } = rule;

	const payload = {
		title: rule?.title,
		...(toggleObject?.ageToggle
			? {
					age: {
						...(rule?.age?.min ? { min: rule?.age?.min } : {}),
						...(rule?.age?.max ? { max: rule?.age?.max } : {})
					}
			  }
			: {}),
		...(toggleObject?.geoblockToggle
			? {
					geoblocking: {
						...(rule?.geoblocking?.countries?.length
							? { countries: rule?.geoblocking?.countries }
							: {}),
						...(rule?.geoblocking?.duration
							? { duration: rule?.geoblocking?.duration }
							: {})
					}
			  }
			: {}),
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
	toggleObject: {
		ageToggle: false,
		geoblockToggle: false
	}
};

export const ruleFormValidationSchema = Yup.object().shape({
	title: Yup.string().required('You need to enter a title'),
	// age: Yup.object().shape(
	// 	{
	// 		min: Yup.string().when('max', {
	// 			is: (max) => !max,
	// 			// !max || max.length === 0,
	// 			then: Yup.string().required('At least one of the Fields is required'),
	// 			otherwise: Yup.string().notRequired()
	// 		}),
	// 		max: Yup.string().when('min', {
	// 			is: (min) => !min,
	// 			then: Yup.string().required('At least one of the Fields is requiredd'),
	// 			otherwise: Yup.string().notRequired()
	// 		})
	// 	},
	// 	['max', 'min']
	// ),
	age: Yup.object()
		.when('toggleObject.ageToggle', {
			is: true,
			then: Yup.object().shape(
				{
					min: Yup.number()
						.when('max', {
							is: (max) => !max,
							then: Yup.number().required(
								'At least one of the Fields is required'
							),
							otherwise: Yup.number()
								.notRequired()
								.lessThan(Yup.ref('max'), 'Must be less than max age')
						})
						.test(
							'Is-positive?',
							'The number must be greater than 0',
							(value) => (value === undefined ? true : value > 0)
						),
					max: Yup.number()
						.when('min', {
							is: (min) => !min,
							then: Yup.number().required(
								'At least one of the Fields is requiredd'
							),
							otherwise: Yup.number()
								.notRequired()
								.moreThan(Yup.ref('min'), 'Must be greater than min age')
						})
						.test(
							'Is-positive?',
							'The number must be greater than 0',

							(value) => (value === undefined ? true : value > 0)
						)
				},
				['max', 'min']
			),
			otherwise: Yup.object().notRequired()
		})
		.default(undefined),
	toggleObject: Yup.object()
		.shape({
			ageToggle: Yup.boolean(),
			geoblockToggle: Yup.boolean()
		})
		.required('At least one toggle is required')
		.default(undefined)
		.test(
			'atleast-one-toggle',
			'At least one toggle is required',
			function (value) {
				return value.ageToggle || value.geoblockToggle;
			}
		),
	geoblocking: Yup.object()
		.when('toggleObject.geoblockToggle', {
			is: true,
			then: Yup.object().shape({
				countries: Yup.array()
					.min(1, "You can't leave this blank.")
					.required("You can't leave this blank."),
				duration: Yup.number().test(
					'Is-positive?',
					'The number must be greater than 0',
					(value) => (value === undefined ? true : value > 0)
				)
			}),
			otherwise: Yup.object().notRequired()
		})
		.default(undefined)
	// geoblocking: Yup.object().shape({
	// 	countries: Yup.array()
	// 		.min(1, "You can't leave this blank.")
	// 		.required("You can't leave this blank."),
	// 	duration: Yup.string()
	// })
});
