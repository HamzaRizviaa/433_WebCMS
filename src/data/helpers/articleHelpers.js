import moment from 'moment';
import * as Yup from 'yup';
import React from 'react';
import { pick, omit, isEmpty, cloneDeep } from 'lodash';
import { getFormatter } from '../../components/ui/Table/ColumnFormatters';
import { getDateTime, makeid, uploadFileToServer } from '../utils';
import {
	Text,
	Instragram,
	ImageVideo,
	TwitterLine,
	BallIcon,
	Question
} from '../../assets/svg-icons';
import { getUserDataObject } from './index';
import { areAllFieldsEmpty } from './commonHelpers';

export const Profile433 = `${process.env.REACT_APP_MEDIA_ENDPOINT}/media/photos/6c69e8b4-12ad-4f51-adb5-88def57d73c7.png`;
export const default433Profile = `${process.env.REACT_APP_MEDIA_ENDPOINT}/media/photos/Profile433.svg`;

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

export const ARTICLE_ELEMENTS_TYPES = {
	MEDIA: 'MEDIA',
	TEXT: 'TEXT',
	TWITTER: 'TWITTER',
	IG: 'IG',
	QUESTION: 'QUESTION',
	MATCH: 'MATCH'
};

export const articleSidebarElements = [
	{
		image: <Text />,
		text: 'Add Text',
		data: {
			element_type: ARTICLE_ELEMENTS_TYPES.TEXT,
			description: '',
			dropbox_url: ''
		}
	},
	{
		image: <ImageVideo />,
		text: 'Add Image / Video',
		data: {
			element_type: ARTICLE_ELEMENTS_TYPES.MEDIA,
			uploadedFiles: [],
			dropbox_url: ''
		}
	},
	{
		image: <TwitterLine />,
		text: 'Add Tweet',
		data: {
			element_type: ARTICLE_ELEMENTS_TYPES.TWITTER,
			twitter_post_url: '',
			dropbox_url: ''
		}
	},
	{
		image: <Instragram />,
		text: 'Add IG post',
		data: {
			element_type: ARTICLE_ELEMENTS_TYPES.IG,
			ig_post_url: '',
			dropbox_url: ''
		}
	},
	{
		image: <Question />,
		text: 'Add Question',
		data: {
			element_type: ARTICLE_ELEMENTS_TYPES.QUESTION,
			question_data: {
				question_type: 'poll',
				uploadedFiles: [],
				labels: [],
				dropbox_url: '',
				question: '',
				answers: [
					{
						answer: ''
					},
					{
						answer: ''
					}
				]
			}
		}
	},
	{
		image: <BallIcon />,
		text: 'Add Match',
		data: {
			element_type: ARTICLE_ELEMENTS_TYPES.MATCH,
			league_name: '',
			match_title: '',
			team_name: '',
			match_id: '',
			match: {}
		}
	}
];

export const checkIfAnyArticleElementIsEmpty = (elements) => {
	return elements.some((item) => {
		return item.element_type === ARTICLE_ELEMENTS_TYPES.QUESTION
			? areAllFieldsEmpty(
					omit(item.question_data, ['question_type', 'answers'])
			  ) && item.question_data.answers.every((ans) => !ans.answer)
			: areAllFieldsEmpty({
					...omit(item, ['id', 'element_type', 'sort_order'])
			  });
	});
};

export const uploadArticleFiles = async (article) => {
	const { author_image, uploadedFiles, uploadedLandscapeCoverImage } = article;
	const elements = cloneDeep(article.elements);

	let files = [
		author_image.length ? author_image[0] : undefined,
		uploadedFiles.length ? uploadedFiles[0] : undefined,
		uploadedLandscapeCoverImage.length
			? uploadedLandscapeCoverImage[0]
			: undefined
	];

	files = files.map(async (item) => {
		if (item?.file) {
			const file = await uploadFileToServer(item, 'articleLibrary');
			return { ...file, ...pick(item, ['width', 'height']) };
		} else {
			return item;
		}
	});

	const elementsFiles = elements.map(async (item, index) => {
		if (item.element_type === ARTICLE_ELEMENTS_TYPES.MEDIA) {
			if (item.uploadedFiles.length === 0) {
				elements[index] = {
					...omit(item, ['uploadedFiles']),
					sort_order: index + 1
				};
			} else if (item.uploadedFiles[0].file) {
				// This block will be executed if a new media file is uploaded
				const uploadedFile = await uploadFileToServer(
					item.uploadedFiles[0],
					'articleLibrary'
				);
				elements[index] = {
					...omit(elements[index], 'uploadedFiles'),
					...omit(uploadedFile, [
						'signedUrlKeyDelete',
						'sort_order',
						'thumbnail_url'
					]),
					...pick(item.uploadedFiles[0], ['width', 'height']),
					...(uploadedFile.thumbnail_url
						? { thumbnail_url: uploadedFile.thumbnail_url }
						: {}),
					sort_order: index + 1
				};
				return uploadedFile;
			} else {
				// This block will be executed if there isn't any new media file uplaoded
				elements[index] = {
					...omit(item, ['uploadedFiles']),
					...item.uploadedFiles[0],
					media_url:
						item.uploadedFiles[0].media_url.split('cloudfront.net/')[1],
					...(item.uploadedFiles[0].thumbnail_url
						? {
								thumbnail_url:
									item.uploadedFiles[0].thumbnail_url.split(
										'cloudfront.net/'
									)[1]
						  }
						: {}),
					sort_order: index + 1
				};
			}
		} else if (item.element_type === ARTICLE_ELEMENTS_TYPES.QUESTION) {
			console.log({ item });
			elements[index].question_data.answers = item.question_data.answers.map(
				(answerItem, answerIndex) => ({
					...answerItem,
					position: answerIndex,
					type:
						item.question_data.question_type === 'poll'
							? 'poll'
							: answerIndex === 0
							? 'right_answer'
							: `wrong_answer_${answerIndex}`
				})
			);

			if (item.question_data.uploadedFiles.length === 0) {
				elements[index] = {
					...item,
					...omit(item.question_data, ['uploadedFiles']),
					sort_order: index + 1
				};
			} else if (item.question_data.uploadedFiles[0].file) {
				// This block will be executed if a new file is uploaded
				const uploadedFile = await uploadFileToServer(
					item.question_data.uploadedFiles[0],
					'articleLibrary'
				);
				const questionData = {
					...omit(item.question_data, ['uploadedFiles']),
					image: uploadedFile.media_url,
					file_name: uploadedFile.file_name,
					width: item.question_data.uploadedFiles[0].width || 0,
					height: item.question_data.uploadedFiles[0].height || 0
				};
				elements[index].question_data = questionData;
				elements[index].sort_order = index + 1;
				return uploadedFile;
			} else {
				const questionData = {
					...omit(item.question_data, ['uploadedFiles']),
					image: item.question_data.uploadedFiles[0].media_url.includes(
						'cloudfront.net/'
					)
						? item.question_data.uploadedFiles[0].media_url.split(
								'cloudfront.net/'
						  )[1]
						: item.question_data.uploadedFiles[0].media_url,
					file_name: item.question_data.uploadedFiles[0].file_name,
					width: item.question_data.uploadedFiles[0].width || 0,
					height: item.question_data.uploadedFiles[0].height || 0
				};
				elements[index].question_data = questionData;
				elements[index].sort_order = index + 1;
			}
		} else {
			elements[index].sort_order = index + 1;
			return item;
		}
	});

	const response = await Promise.all([...files, ...elementsFiles]);

	return {
		uploadedFilesRes: response,
		elements
	};
};

export const matchElementDataFormatter = (item) => ({
	Day: moment(item?.match?.startdate).format('ddd, DD MMM'),
	Time: moment(item?.match?.startdate).format('HH:mm'),
	Team_1: {
		Name: item?.match?.participant_teams_data?.[0]?.name,
		Logo: item?.match?.participant_teams_data?.[0]?.team_logo,
		Team_Color:
			item?.match?.participant_teams_data?.[0]?.property?.home_shirt_color_1
	},
	Team_2: {
		Name: item?.match?.participant_teams_data?.[1]?.name,
		Logo: item?.match?.participant_teams_data?.[1]?.team_logo,
		Team_Color:
			item?.match?.participant_teams_data?.[1]?.property?.home_shirt_color_1
	}
});

const articleElementsFormatterForForm = (elements) => {
	const MEDIA_KEYS = ['id', 'element_type', 'sort_order', 'dropbox_url'];

	return elements.map((elem) => {
		if (elem.element_type === ARTICLE_ELEMENTS_TYPES.MEDIA) {
			const formattedElement = {
				...pick(elem, MEDIA_KEYS),
				uploadedFiles: elem.media_url
					? [
							{
								file_name: elem.file_name,
								media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${elem.media_url}`,
								width: elem.width,
								height: elem.height,
								...(elem.thumbnail_url
									? {
											type: 'video',
											thumbnail_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${elem.thumbnail_url}`
									  }
									: { type: 'image' })
							}
					  ]
					: []
			};
			return formattedElement;
		} else if (elem.element_type === ARTICLE_ELEMENTS_TYPES.QUESTION) {
			const formattedElement = {
				id: elem.id,
				element_type: elem.element_type,
				sort_order: elem.sort_order,
				question_data: {
					...omit(elem.question_data, [
						'id',
						'question_id',
						'image',
						'file_name',
						'width',
						'height',
						'end_date'
					]),
					labels: elem.question_data.labels.map((label) => ({
						id: -1,
						name: label
					})),
					uploadedFiles: elem.question_data.image
						? [
								{
									media_url:
										`${process.env.REACT_APP_MEDIA_ENDPOINT}/${elem.question_data.image}` ||
										undefined,
									file_name: elem.question_data.file_name,
									width: elem.question_data.width,
									height: elem.question_data.height
								}
						  ]
						: []
				}
			};
			return formattedElement;
		} else {
			return elem;
		}
	});
};

export const articleDataFormatterForForm = (article, allRules) => {
	const rules = {};

	allRules.forEach((rule) => {
		rules[rule._id] = false;
	});
	//This loop should always run after the first one.
	article.rules.forEach((rule) => {
		rules[rule._id] = true;
	});

	const portraitFileKeys = ['file_name', 'image', 'height', 'width'];
	const landscapeFileKeys = [
		'landscape_image',
		'landscape_file_name',
		'landscape_width',
		'landscape_height'
	];

	const formattedArticle = {
		...omit(article, [
			...portraitFileKeys,
			...landscapeFileKeys,
			'rules',
			'main_category_id',
			'sub_category_id',
			'media_type',
			'sub_category',
			'is_draft',
			'status'
		]),
		author_image: [
			{
				media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${article?.author_image}`
			}
		],
		mainCategoryId: article.main_category_id,
		subCategoryId: article.sub_category_id,
		mainCategoryName: article.media_type,
		subCategoryName: article.sub_category
	};

	if (formattedArticle.labels) {
		const updatedLabels = formattedArticle.labels.map((label) => ({
			id: -1,
			name: label
		}));
		formattedArticle.labels = updatedLabels;
	}

	const uploadedFiles = !isEmpty(article.image)
		? [
				{
					id: makeid(10),
					file_name: article?.file_name,
					media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${article?.image}`,
					type: 'image',
					width: article.width,
					height: article.height
				}
		  ]
		: [];

	const uploadedLandscapeCoverImage = !isEmpty(article.landscape_image)
		? [
				{
					id: makeid(10),
					file_name: article?.landscape_file_name,
					media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${article?.landscape_image}`,
					type: 'image',
					width: article.landscape_width,
					height: article.landscape_height
				}
		  ]
		: [];

	formattedArticle.uploadedFiles = uploadedFiles;
	formattedArticle.uploadedLandscapeCoverImage = uploadedLandscapeCoverImage;

	const elements = articleElementsFormatterForForm(article.elements);
	formattedArticle.elements = elements;
	formattedArticle.rules = rules;
	return formattedArticle;
};

export const articleDataFormatterForService = (
	article,
	files,
	isDraft = false,
	allRules
) => {
	const { uploadedFiles, uploadedLandscapeCoverImage } = article;
	const [authorImgFile, portraitImgFile, landscapeImgFile] = files;
	const { media_url: authorMediaUrl } = authorImgFile;
	const filteredRules = allRules.filter((rule) => article.rules[rule._id]);
	const articleData = {
		save_draft: isDraft,
		translations: undefined,
		user_data: getUserDataObject(),
		main_category_id: article.mainCategoryId,
		sub_category_id: article.subCategoryId,

		// Destructing the article id for edit state
		...(article.id ? { article_id: article.id } : {}),

		// Destructing the properties of article
		...omit(article, [
			'id',
			'uploadedFiles',
			'uploadedLandscapeCoverImage',
			'mainCategoryId',
			'subCategoryId',
			'mainCategoryName',
			'subCategoryName'
		]),

		author_image: authorMediaUrl.includes('cloudfront.net/')
			? authorMediaUrl.split('cloudfront.net/')[1]
			: authorMediaUrl,

		// Destructing the porperties of portrait file
		...(uploadedFiles.length && !isEmpty(portraitImgFile)
			? {
					file_name: portraitImgFile.file_name,
					image: portraitImgFile.media_url.includes('cloudfront.net/')
						? portraitImgFile.media_url.split('cloudfront.net/')[1]
						: portraitImgFile.media_url,
					height: portraitImgFile.height,
					width: portraitImgFile.width
			  }
			: {
					file_name: '',
					image: '',
					height: 0,
					width: 0
			  }),

		// Destructing the porperties of landscape file
		...(uploadedLandscapeCoverImage.length && !isEmpty(landscapeImgFile)
			? {
					landscape_file_name: landscapeImgFile.file_name,
					landscape_image: landscapeImgFile.media_url.includes(
						'cloudfront.net/'
					)
						? landscapeImgFile.media_url.split('cloudfront.net/')[1]
						: landscapeImgFile.media_url,
					landscape_height: landscapeImgFile.height,
					landscape_width: landscapeImgFile.width
			  }
			: {
					landscape_file_name: '',
					landscape_image: '',
					landscape_height: 0,
					landscape_width: 0
			  }),
		rules: filteredRules
	};

	return articleData;
};

export const articleUnwantedKeysForDeepEqual = [
	'mainCategoryId',
	'subCategoryId',
	'mainCategoryName',
	'subCategoryName'
];

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

//
// Article Validation
//
const questionElementValidationSchema = Yup.object().shape({
	question_type: Yup.string().label('Question Type').required(),
	uploadedFiles: Yup.array()
		.min(1, 'You need to upload an image in order to upload')
		.required(),
	labels: Yup.array()
		.min(1, 'You need to add 1 more label in order to post question')
		.required(),
	dropbox_url: Yup.string(),
	question: Yup.string().trim().required('You need to enter a question'),
	answers: Yup.array()
		.of(
			Yup.object().shape({
				answer: Yup.string().trim().required('You need to enter an answer')
			})
		)
		.min(2, 'Atleast 2 answers are required')
});

export const articleFormValidationSchema = Yup.object().shape({
	mainCategoryId: Yup.string().required().label('Main Category'),
	subCategoryId: Yup.string().required().label('Sub Category'),
	mainCategoryName: Yup.string().required().label('Main Category'),
	subCategoryName: Yup.string().required().label('Sub Category'),
	author_text: Yup.string().required().label('Author Name'),
	author_image: Yup.array().required().label('Author Image'),
	title: Yup.string().max(43).required().label('Article Title'),
	sub_text: Yup.string().max(84).required().label('Sub Title'),
	uploadedFiles: Yup.array()
		.min(1, 'You need to upload a portrait image in order to post article')
		.required()
		.label('Portrait Image'),
	dropbox_url: Yup.string(),
	uploadedLandscapeCoverImage: Yup.array()
		.min(1, 'You need to upload a landscape image in order to post article')
		.required()
		.label('Landscape Image'),
	landscape_dropbox_url: Yup.string(),
	labels: Yup.array()
		.min(4, (obj) => {
			const labelsCount = obj.value?.length;
			return `You need to add ${
				4 - labelsCount
			} more labels in order to upload article`;
		})
		.required('You need to enter atleast 4 labels')
		.label('Labels'),
	show_likes: Yup.boolean().required(),
	show_comments: Yup.boolean().required(),
	elements: Yup.array()
		.of(
			Yup.object({
				// Common fields validations
				id: Yup.string(),
				element_type: Yup.mixed()
					.oneOf([...Object.values(ARTICLE_ELEMENTS_TYPES)])
					.required(),
				sort_order: Yup.number(),
				dropbox_url: Yup.string().trim(),

				// Text element validations
				description: Yup.string()
					.trim()
					.label('Text')
					.when('element_type', {
						is: (val) => val === ARTICLE_ELEMENTS_TYPES.TEXT,
						then: (schema) => schema.required(),
						otherwise: (schema) => schema
					}),

				// Media element validations
				uploadedFiles: Yup.array()
					.label('Media')
					.when('element_type', {
						is: (val) => val === ARTICLE_ELEMENTS_TYPES.MEDIA,
						then: (schema) =>
							schema
								.min(1, 'You need to upload an image/video to post article')
								.required(),
						otherwise: (schema) => schema
					}),

				// Twitter element validations
				twitter_post_url: Yup.string()
					.trim()
					.label('Twitter Post URL')
					.when('element_type', {
						is: (val) => val === ARTICLE_ELEMENTS_TYPES.TWITTER,
						then: (schema) => schema.required(),
						otherwise: (schema) => schema
					}),

				// IG element validations
				ig_post_url: Yup.string()
					.trim()
					.label('Instagram Post URL')
					.when('element_type', {
						is: (val) => val === ARTICLE_ELEMENTS_TYPES.IG,
						then: (schema) => schema.required(),
						otherwise: (schema) => schema
					}),

				// Question element validations
				question_data: Yup.object().when('element_type', {
					is: (val) => val === ARTICLE_ELEMENTS_TYPES.QUESTION,
					then: () => questionElementValidationSchema,
					otherwise: (schema) => schema.optional()
				}),

				// Match element validations
				league_name: Yup.string()
					.label('League Name')
					.when('element_type', {
						is: (val) => val === ARTICLE_ELEMENTS_TYPES.MATCH,
						then: (schema) => schema.required(),
						otherwise: (schema) => schema.optional()
					}),
				team_name: Yup.string()
					.label('Team Name')
					.when('element_type', {
						is: (val) => val === ARTICLE_ELEMENTS_TYPES.MATCH,
						then: (schema) => schema.required(),
						otherwise: (schema) => schema.optional()
					}),
				match_id: Yup.string()
					.label('Match Id')
					.when('element_type', {
						is: (val) => val === ARTICLE_ELEMENTS_TYPES.MATCH,
						then: (schema) => schema.required(),
						otherwise: (schema) => schema.optional()
					}),
				match_title: Yup.string()
					.label('Match Title')
					.when('element_type', {
						is: (val) => val === ARTICLE_ELEMENTS_TYPES.MATCH,
						then: (schema) => schema.required(),
						otherwise: (schema) => schema.optional()
					}),
				match: Yup.object().when('element_type', {
					is: (val) => val === ARTICLE_ELEMENTS_TYPES.MATCH,
					then: (schema) => schema.required(),
					otherwise: (schema) => schema.optional()
				})
			})
		)
		.min(1)
});

export const articleTemplateFormValidationSchema =
	articleFormValidationSchema.shape({
		template_name: Yup.string().label('Template Name').required()
	});
