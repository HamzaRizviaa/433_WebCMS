import { Profile433 } from './index';

export const articleUnwantedKeysForDeepEqual = [
	'mainCategoryId',
	'subCategoryId',
	'mainCategoryName',
	'subCategoryName'
];

export const articleTemplateUnwantedKeysForDeepEqual = ['template_name'];

export const articleFormStatusInitialValues = {
	dirty: false
};

export const articleFormInitialValues = (allRules) => {
	const rules = {};

	allRules.forEach((rule) => {
		rules[rule._id] = false;
	});

	return {
		mainCategoryId: '',
		subCategoryId: '',
		mainCategoryName: '',
		subCategoryName: '',
		title: '',
		sub_text: '',
		dropbox_url: '',
		landscape_dropbox_url: '',
		uploadedFiles: [],
		uploadedLandscapeCoverImage: [],
		author_text: '433 Team',
		author_image: [{ media_url: Profile433 }],
		labels: [],
		show_likes: true,
		show_comments: true,
		is_scheduled: false,
		save_draft: true,
		elements: [],
		rules
	};
};

export const articleTemplateFormInitialValues = (allRules) => {
	const initialValues = articleFormInitialValues(allRules);

	return {
		...initialValues,
		template_name: ''
	};
};
