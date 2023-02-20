import dayjs from 'dayjs';
import { pick, omit, isEmpty, cloneDeep } from 'lodash';
import { getUserDataObject } from '../commonHelpers';
import { makeid, uploadFileToServer } from '../../utils';
import { ARTICLE_ELEMENTS_TYPES } from './index';

export const elementTypeToTitleMapper = {
	IG: 'Add IG post',
	TWITTER: 'Add Tweet',
	YOUTUBE: 'Add Youtube video',
	TIKTOK: 'Add Tiktok post'
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
	Day: dayjs(item?.match?.startdate).format('MMMM D'),
	Time: dayjs(item?.match?.startdate).format('HH:mm'),
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
			'status',
			'schedule_date'
		]),
		author_image: [
			{
				media_url: `${process.env.REACT_APP_MEDIA_ENDPOINT}/${article?.author_image}`
			}
		],
		mainCategoryId: article.main_category_id || '',
		subCategoryId: article.sub_category_id || '',
		mainCategoryName: article.media_type,
		subCategoryName: article.sub_category,
		is_scheduled: article.is_scheduled || false,
		save_draft: article.is_draft || true
	};

	if (article.is_scheduled) {
		formattedArticle.schedule_date = article.schedule_date;
	}

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

export const articleDataFormatterForService = (article, files, allRules) => {
	const { uploadedFiles, uploadedLandscapeCoverImage } = article;
	const [authorImgFile, portraitImgFile, landscapeImgFile] = files;
	const { media_url: authorMediaUrl } = authorImgFile;
	const filteredRules = allRules.filter((rule) => article.rules[rule._id]);

	const articleData = {
		save_draft: article.save_draft,
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
			'subCategoryName',
			'schedule_date'
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

	if (article.schedule_date) articleData.schedule_date = article.schedule_date;

	return articleData;
};

export const articleTemplateDataFormatterForService = (
	article,
	files,
	allRules
) => {
	const articleData = articleDataFormatterForService(article, files, allRules);

	return {
		...omit(articleData, [
			'save_draft',
			'article_id',
			isEmpty(articleData.main_category_id) ? 'main_category_id' : '',
			isEmpty(articleData.sub_category_id) ? 'sub_category_id' : ''
		]),

		// Destructing the article template data

		...(article.id ? { article_template_id: article.id } : {}),
		template_name: article.template_name
	};
};

export const getYoutubeVideoEmbedId = (videoUrl = '') => {
	if (videoUrl.includes('youtube.com'))
		return videoUrl.split('watch?v=')[1] || '';
	else if (videoUrl.includes('youtu.be'))
		return videoUrl.split('youtu.be/')[1] || '';
	else return '';
};

export const getTiktokEmbedId = (tiktokUrl = '') => {
	if (tiktokUrl.includes('tiktok.com'))
		return tiktokUrl.split('/video/')[1] || '';
	return '';
};
