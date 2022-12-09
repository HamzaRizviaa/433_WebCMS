import moment from 'moment';
import * as Yup from 'yup';
import React from 'react';
import { omit } from 'lodash';
import { getFormatter } from '../../components/ui/Table/ColumnFormatters';
import { getDateTime, makeid } from '../utils';
import {
	Text,
	Instragram,
	ImageVideo,
	TwitterLine,
	BallIcon,
	Question
} from '../../assets/svg-icons';

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

export const articleSidebarElements = [
	{
		image: <Text />,
		text: 'Add Text',
		data: {
			description: '',
			dropbox_url: '',
			element_type: 'TEXT'
		}
	},
	{
		image: <ImageVideo />,
		text: 'Add Image / Video',
		data: {
			uploadedFiles: [],
			dropbox_url: '',
			element_type: 'MEDIA'
		}
	},
	{
		image: <TwitterLine />,
		text: 'Add Tweet',
		data: {
			twitter_post_url: '',
			dropbox_url: '',
			element_type: 'TWITTER'
		}
	},
	{
		image: <Instragram />,
		text: 'Add IG post',
		data: {
			instagram_post_url: '',
			dropbox_url: '',
			element_type: 'IG'
		}
	},
	{
		image: <Question />,
		text: 'Add Question',
		data: {
			question_data: {},
			element_type: 'QUESTION'
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
			element_type: 'MATCH'
		}
	}
];

export const ElementTypes = {
	MEDIA: 'MEDIA',
	TEXT: 'TEXT',
	TWITTER: 'TWITTER',
	IG: 'IG',
	QUESTION: 'QUESTION',
	MATCH: 'MATCH'
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
			'rules',
			...portraitFileKeys,
			...landscapeFileKeys,
			'main_category_id',
			'sub_category_id',
			'media_type',
			'sub_category'
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

	const uploadedFiles = [
		{
			id: makeid(10),
			file_name: article?.file_name,
			media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${article?.image}`,
			type: 'image',
			width: article.width,
			height: article.height
		}
	];
	const uploadedLandscapeCoverImage = [
		{
			id: makeid(10),
			file_name: article?.landscape_file_name,
			media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${article?.landscape_image}`,
			type: 'image',
			width: article.landscape_width,
			height: article.landscape_height
		}
	];

	formattedArticle.uploadedFiles = uploadedFiles;
	formattedArticle.uploadedLandscapeCoverImage = uploadedLandscapeCoverImage;

	return formattedArticle;
};

export const articleDataFormatterForService = (article) => {
	return article;
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
