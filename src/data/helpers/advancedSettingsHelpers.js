import React from 'react';
import * as Yup from 'yup';

export const advancedSettingsValidationSchema = Yup.object().shape({
	rules: Yup.object(),
	show_likes: Yup.boolean().required(),
	show_comments: Yup.boolean().required()
});

export const advancedSettingsValidationSchemaQuestions = Yup.object().shape({
	rules: Yup.object()
});

export const toolTipHandler = (val) => {
	const newObj = {};

	Object.keys(val).forEach((key) => {
		const value = val[key];

		if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
			Object.assign(newObj, toolTipHandler(value));
		} else {
			if (typeof value !== 'string') {
				newObj[key] = value;
			}
		}
	});
	return newObj;
};

export const toolTipFormatter = (obj) => {
	const countriesArray =
		obj.countries?.length > 0 ? obj.countries.map((item) => item.name) : [];

	const values = {
		...obj,
		countries:
			obj.countries?.length > 0
				? countriesArray.join(', ').replace(/, ([^,]*)$/, ' & $1')
				: 'None'
	};

	return Object.entries(values).map(([key, value]) => (
		<div key={key} style={{ textTransform: 'capitalize' }}>
			{key} :{' '}
			{key === 'duration'
				? value + ' hours'
				: key === 'min' || key === 'max'
				? value + ' years'
				: value}
		</div>
	));
};
