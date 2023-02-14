/* eslint-disable no-useless-escape */
import * as Yup from 'yup';
import { omit } from 'lodash';
import { ARTICLE_ELEMENTS_TYPES } from './index';
import { areAllFieldsEmpty } from '../commonHelpers';

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
				element_type: Yup.string().required(),
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
						then: (schema) =>
							schema
								.matches(
									/https:\/\/(www\.)?twitter\.com\/[A-Za-z0-9-_&@;:%()#~!*',\$\.\+]+\/status\/[0-9]+(\/)?(\?[A-Za-z0-9-_&@;:%()#~!*',\$\.\+\=]*)*$/,
									"The URL doesn't seem to be of a tweet. Please enter correct URL."
								)
								.required(),
						otherwise: (schema) => schema
					}),

				// IG element validations
				ig_post_url: Yup.string()
					.trim()
					.label('Instagram Post URL')
					.when('element_type', {
						is: (val) => val === ARTICLE_ELEMENTS_TYPES.IG,
						then: (schema) =>
							schema
								.matches(
									/https:\/\/(www\.)?instagram\.com\/(p|reel)\/[A-Za-z0-9-_&@;:%()#~!*',\$\.\+]+(\/)?(\?[A-Za-z0-9-_&@;:%()#~!*',\$\.\+\=]*)*$/,
									"The URL doesn't seem to be of an Instagram post. Please enter correct URL."
								)
								.required(),
						otherwise: (schema) => schema
					}),

				// Youtube element validations
				youtube_video_url: Yup.string()
					.trim()
					.label('Youtube Post URL')
					.when('element_type', {
						is: (val) => val === ARTICLE_ELEMENTS_TYPES.YOUTUBE,
						then: (schema) =>
							schema
								.matches(
									/https:\/\/(www\.)?(youtube\.com\/watch\?v=[A-Za-z0-9-_&@;:%()#~!*'=,\$\.\+]+|youtu\.be\/[A-Za-z0-9-_&@;:%()#~!*',\$\.\+\?\=]+)*$/,
									"The URL doesn't seem to be of a Youtube video. Please enter correct URL."
								)
								.required(),
						otherwise: (schema) => schema
					}),

				// Tiktok element validations
				tiktok_video_url: Yup.string()
					.trim()
					.label('Tiktok Post URL')
					.when('element_type', {
						is: (val) => val === ARTICLE_ELEMENTS_TYPES.TIKTOK,
						then: (schema) =>
							schema
								.matches(
									/https:\/\/(www\.)?tiktok\.com\/[A-Za-z0-9_.+-@&?=]+\/video\/[0-9]+(\/)?(\?[A-Za-z0-9-_&@;:%()#~!*',\$\.\+\=]*)*$/,
									"The URL doesn't seem to be of a Tiktok video. Please enter correct URL."
								)
								.required(),
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
		.required()
});

export const articleTemplateFormValidationSchema = Yup.object().shape({
	template_name: Yup.string().label('Template Name').required()
});
