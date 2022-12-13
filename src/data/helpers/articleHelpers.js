/* eslint-disable no-unused-vars */
import moment from 'moment';
import * as Yup from 'yup';
import React from 'react';
import { pick, omit, isEmpty } from 'lodash';
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
			description: '',
			dropbox_url: '',
			element_type: ARTICLE_ELEMENTS_TYPES.TEXT
		}
	},
	{
		image: <ImageVideo />,
		text: 'Add Image / Video',
		data: {
			uploadedFiles: [],
			dropbox_url: '',
			element_type: ARTICLE_ELEMENTS_TYPES.MEDIA
		}
	},
	{
		image: <TwitterLine />,
		text: 'Add Tweet',
		data: {
			twitter_post_url: '',
			dropbox_url: '',
			element_type: ARTICLE_ELEMENTS_TYPES.TWITTER
		}
	},
	{
		image: <Instragram />,
		text: 'Add IG post',
		data: {
			instagram_post_url: '',
			dropbox_url: '',
			element_type: ARTICLE_ELEMENTS_TYPES.IG
		}
	},
	{
		image: <Question />,
		text: 'Add Question',
		data: {
			element_type: ARTICLE_ELEMENTS_TYPES.QUESTION,
			question_data: {
				question_type: 'quiz',
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
			league_name: '',
			match_title: '',
			team_name: '',
			match_id: '',
			element_type: ARTICLE_ELEMENTS_TYPES.MATCH
		}
	}
];

export const uploadArticleFiles = async (article) => {
	const { author_image, uploadedFiles, uploadedLandscapeCoverImage, elements } =
		article;

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
		if (item.element_type === 'MEDIA') {
			if (item.uploadedFiles[0].file) {
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
						: {})
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
						: {})
				};
			}
		} else {
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
	Day: moment(item?.data?.match?.data?.startdate).format('ddd, DD MMM'),
	Time: moment(item?.data?.match?.data?.startdate).format('HH:mm'),
	Team_1: {
		Name: item?.data?.match?.data?.participant_teams_data[0]?.name,
		Logo: item?.data?.match?.data?.participant_teams_data[0]?.team_logo,
		Team_Color:
			item?.data?.match?.data?.participant_teams_data[0]?.property
				?.home_shirt_color_1
	},
	Team_2: {
		Name: item?.data?.match?.data?.participant_teams_data[1]?.name,
		Logo: item?.data?.match?.data?.participant_teams_data[1]?.team_logo,
		Team_Color:
			item?.data?.match?.data?.participant_teams_data[1]?.property
				?.home_shirt_color_1
	}
});

const articleElementsFormatterForForm = (elements) => {
	const MEDIA_KEYS = ['id', 'element_type', 'sort_order', 'dropbox_url'];

	return elements.map((elem) => {
		if (elem.element_type === ARTICLE_ELEMENTS_TYPES.MEDIA) {
			const formattedElement = {
				...pick(elem, MEDIA_KEYS),
				uploadedFiles: [
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
					uploadedFiles: elem.question_data.image
						? [
								{
									media_url:
										`${process.env.REACT_APP_MEDIA_ENDPOINT}/${elem.question_data.image}` ||
										undefined,
									file_name: elem.question_data.file_name
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

export const articleDataFormatterForForm = (article) => {
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

	console.log({ formattedArticle });

	return formattedArticle;
};

export const articleDataFormatterForService = (
	article,
	files,
	isDraft = false
) => {
	const { uploadedFiles, uploadedLandscapeCoverImage } = article;
	const [authorImgFile, portraitImgFile, landscapeImgFile] = files;
	const { media_url: authorMediaUrl } = authorImgFile;

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

		author_image:
			authorMediaUrl.split('cloudfront.net/')[1] ||
			Profile433.split('cloudfront.net/')[1],

		// Destructing the porperties of portrait file
		...(uploadedFiles.length && !isEmpty(portraitImgFile)
			? {
					file_name: portraitImgFile.file_name,
					image: portraitImgFile.media_url,
					height: portraitImgFile.height,
					width: portraitImgFile.width
			  }
			: uploadedFiles.length
			? { ...uploadedFiles.length[0] }
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
					landscape_image: landscapeImgFile.media_url,
					landscape_height: landscapeImgFile.height,
					landscape_width: landscapeImgFile.width
			  }
			: uploadedLandscapeCoverImage.length
			? { ...uploadedLandscapeCoverImage.length[0] }
			: {
					landscape_file_name: '',
					landscape_image: '',
					landscape_height: 0,
					landscape_width: 0
			  })
	};

	return articleData;
};

export const articleFormInitialValues = {
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
	elements: []
};

//
// Article Validation
//
const elementBaseSchema = Yup.object().shape({
	element_type: Yup.string().required()
});

const textElementValidationSchema = elementBaseSchema.shape({
	description: Yup.string().required(),
	dropbox_url: Yup.string()
});

const mediaElementValidationSchema = elementBaseSchema.shape({
	uploadedFiles: Yup.array().min(1).required(),
	dropbox_url: Yup.string()
});

const twitterElementValidationSchema = elementBaseSchema.shape({
	twitter_post_url: Yup.string().required(),
	dropbox_url: Yup.string()
});

const igElementValidationSchema = elementBaseSchema.shape({
	instagram_post_url: Yup.string().required(),
	dropbox_url: Yup.string()
});

const questionElementValidationSchema = elementBaseSchema.shape({});

const matchElementValidationSchema = elementBaseSchema.shape({
	league_name: Yup.string().required(),
	match_title: Yup.string().required(),
	team_name: Yup.string().required(),
	match_id: Yup.string().required()
});

export const articleFormValidationSchema = Yup.object().shape({
	mainCategory: Yup.string().required().label('Main Category'),
	subCategory: Yup.string().required().label('Sub Category'),
	author_text: Yup.string().required().label('Author Name'),
	author_image: Yup.array().required().label('Author Image'),
	title: Yup.string().max(43).required().label('Title'),
	sub_text: Yup.string().max(84).required().label('Sub Title'),
	uploadedFiles: Yup.array().min(1).required().label('Portrait Image'),
	dropbox_url: Yup.string(),
	uploadedLandscapeCoverImage: Yup.array()
		.min(1)
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
	elements: Yup.array().of(
		Yup.mixed().oneOf([
			textElementValidationSchema,
			mediaElementValidationSchema,
			twitterElementValidationSchema,
			igElementValidationSchema,
			questionElementValidationSchema,
			matchElementValidationSchema
		])
	)
});
