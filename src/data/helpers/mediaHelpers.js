import { getFormatter } from '../../components/ui/Table/ColumnFormatters';
import { getDateTime, getLocalStorageDetails, makeid } from '../utils';
import { isEmpty } from 'lodash';
import axios from 'axios';
import dayjs from 'dayjs';
import * as Yup from 'yup';
import { advancedSettingsValidationSchema } from './advancedSettingsHelpers';
import { CalendarYellowIcon } from '../../assets/svg-icons';
import { toast } from 'react-toastify';

export const mediaColumns = [
	{
		dataField: 'title',
		text: 'TITLE',
		sort: true,
		formatter: (content) => getFormatter('markup', { content })
	},
	{
		dataField: 'file_name',
		text: 'MEDIA',
		sort: true,
		formatter: (_, row) =>
			getFormatter('media', {
				thumbnailUrl: row?.thumbnail_url ? row?.thumbnail_url : row?.media,
				mediaUrl: '', //row?.media || row?.image,
				fileName: row.file_name,
				fileHeight: row.height,
				fileWidth: row.width
			})
	},
	{
		dataField: 'post_date',
		text: 'POST, SCHEDULE DATE | TIME',
		sort: true,
		formatter: (content, row) =>
			getFormatter('textAndIcon', {
				content: dayjs(content).format('DD-MM-YYYY | HH:mm'),
				Icon: row.is_scheduled ? CalendarYellowIcon : null
			})
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
		dataField: 'type',
		text: 'TYPE',
		sort: true,
		formatter: (content) => getFormatter('markup', { content })
	},
	{
		dataField: 'user',
		text: 'USER',
		sort: true,
		formatter: (content) => getFormatter('markup', { content })
	},
	{
		dataField: 'status',
		text: 'STATUS',
		sort: true,
		formatter: (content) => getFormatter('status', { status: content })
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
		formatter: () => getFormatter('options', { title: 'EDIT MEDIA' })
	}
];

export const mediaDataFormatterForForm = (media, allRules) => {
	const rules = {};
	const formattedMedia = { ...media };

	allRules.forEach((rule) => {
		rules[rule._id] = false;
	});
	//This loop should always run after the first one.
	media.rules.forEach((rule) => {
		rules[rule._id] = true;
	});

	if (formattedMedia?.labels) {
		const updatedLabels = formattedMedia?.labels.map((label) => ({
			id: -1,
			name: label
		}));
		formattedMedia.labels = updatedLabels;
	}

	formattedMedia.uploadedFiles = !isEmpty(formattedMedia.media_url)
		? [
				{
					id: makeid(10),
					file_name: media?.file_name_media,
					media_url: media?.media_url
						? `${process.env.REACT_APP_MEDIA_ENDPOINT}/${media?.media_url}`
						: '',
					type: media?.media_type === 'Watch' ? 'video' : 'audio'
				}
		  ]
		: [];

	formattedMedia.uploadedCoverImage = formattedMedia?.cover_image?.portrait
		?.image_url
		? [
				{
					id: makeid(10),
					file_name: formattedMedia?.file_name_portrait_image,
					media_url: formattedMedia?.cover_image
						? `${process.env.REACT_APP_MEDIA_ENDPOINT}/${formattedMedia?.cover_image?.portrait?.image_url}`
						: '',
					type: 'image'
				}
		  ]
		: [];

	formattedMedia.uploadedLandscapeCoverImage = media?.cover_image?.landscape
		?.image_url
		? [
				{
					id: makeid(10),
					file_name: media?.file_name_landscape_image,
					media_url: media?.cover_image
						? `${process.env.REACT_APP_MEDIA_ENDPOINT}/${media?.cover_image?.landscape?.image_url}`
						: '',
					type: 'image'
				}
		  ]
		: [];
	formattedMedia.mainCategory = media?.main_category_id;
	formattedMedia.subCategory = media?.sub_category_id;
	formattedMedia.mainCategoryName = media?.media_type;
	formattedMedia.media_dropbox_url = media?.dropbox_url?.media;
	formattedMedia.image_dropbox_url = media?.dropbox_url?.portrait_cover_image;
	formattedMedia.landscape_image_dropbox_url =
		media?.dropbox_url?.landscape_cover_image;
	formattedMedia.rules = rules;
	formattedMedia.is_scheduled = media.is_scheduled;
	formattedMedia.save_draft = media.is_draft;

	if (media.is_scheduled) formattedMedia.schedule_date = media.schedule_date;

	return formattedMedia;
};

const uploadFileToServer = async (file, type) => {
	try {
		const result = await axios.post(
			`${process.env.REACT_APP_API_ENDPOINT}/media-upload/get-signed-url`,
			{
				file_type: file.fileExtension === '.mpeg' ? '.mp3' : file.fileExtension,
				parts: 1
			},
			{
				headers: {
					Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
				}
			}
		);

		if (result?.data?.data?.url) {
			let response = await axios.put(result?.data?.data?.url, file.file, {
				headers: { 'Content-Type': file.mime_type }
			});
			return {
				...result.data.data,
				signed_response: response,
				fileType: type
			};
		} else {
			throw Error('Bad Request');
		}
	} catch (error) {
		console.error(error);
		toast.error('Failed to upload files. Please try again');
		throw Error(error.message || 'something went wrong');
	}
};

export const fileUploadsArray = (media) => {
	let uploadFilesPromiseArray = [
		media.uploadedFiles[0], //audio/video
		media.uploadedCoverImage[0], //portrait
		media.uploadedLandscapeCoverImage[0] //landscape
	].map(async (_file) => {
		if (_file?.file) {
			return await uploadFileToServer(_file, _file.type);
		} else {
			return _file;
		}
	});
	return Promise.all([...uploadFilesPromiseArray]);
};

export const mediaDataFormatterForServer = (
	media,
	mediaFiles,
	userData,
	completedUploadFiles,
	allRules
) => {
	const filteredRules = allRules.filter((rule) => media.rules[rule._id]);
	const mediaData = {
		title: media.title,
		is_scheduled: media.is_scheduled,
		translations: undefined,
		description: media.description,
		duration: media?.uploadedFiles[0]?.duration
			? Math.ceil(media?.uploadedFiles[0]?.duration)
			: 0,
		type: 'medialibrary',
		save_draft: media.save_draft,
		main_category_id: media.mainCategoryContent || media.main_category_id,
		sub_category_id: media.subCategoryContent || media.sub_category_id,
		show_likes: media.show_likes ? true : false,
		show_comments: media.show_comments ? true : false,
		user_data: userData,
		dropbox_url: {
			media: media.media_dropbox_url // audio video
				? media.media_dropbox_url
				: '',
			portrait_cover_image: media.image_dropbox_url //portrait
				? media.image_dropbox_url
				: '',
			landscape_cover_image: media.landscape_image_dropbox_url //landscape
				? media.landscape_image_dropbox_url
				: ''
		},
		...(media.labels.length ? { labels: [...media.labels] } : { labels: [] }),
		media_url: media?.uploadedFiles?.length
			? completedUploadFiles[0]?.data?.data?.video_data ||
			  completedUploadFiles[0]?.data?.data?.audio_data ||
			  media?.uploadedFiles[0]?.media_url.split('cloudfront.net/')[1]
			: '',
		height: media?.uploadedFiles[0]?.height,
		width: media?.uploadedFiles[0]?.width,
		cover_image: {
			...(mediaFiles[1]?.url
				? {
						portrait: {
							// ...media?.uploadedCoverImage[0],
							height: media?.uploadedCoverImage[0].height || 100,
							width: media?.uploadedCoverImage[0].width || 100,
							image_url: mediaFiles[1]?.keys?.image_key
						}
				  }
				: {
						portrait: {
							...media?.uploadedCoverImage[0],
							image_url:
								media?.uploadedCoverImage[0]?.media_url.split(
									'cloudfront.net/'
								)[1]
						}
				  }),
			...(mediaFiles[2]?.url
				? {
						landscape: {
							// ...media?.uploadedLandscapeCoverImage[0],
							height: media?.uploadedLandscapeCoverImage[0].height || 100,
							width: media?.uploadedLandscapeCoverImage[0].width || 100,
							image_url: mediaFiles[2]?.keys?.image_key
						}
				  }
				: {
						landscape: {
							...media?.uploadedLandscapeCoverImage[0],
							image_url:
								media?.uploadedLandscapeCoverImage[0]?.media_url.split(
									'cloudfront.net/'
								)[1]
						}
				  })
		},
		...(media.id ? { media_id: media.id } : {}),
		rules: filteredRules,
		file_name_media: media?.uploadedFiles?.length
			? media?.uploadedFiles[0]?.file_name
			: '',
		file_name_portrait_image: media?.uploadedCoverImage[0]?.file_name,
		file_name_landscape_image: media?.uploadedLandscapeCoverImage[0]?.file_name,
		file_name: media?.uploadedFiles[0]?.file_name,
		video_data: completedUploadFiles[0]?.data?.data?.video_data || null,
		image_data: null,
		audio_data: completedUploadFiles[0]?.data?.data?.audio_data || null,

		// Spreading the media schedule flag for edit state
		...(media.is_scheduled ? { schedule_date: media.schedule_date } : {})
	};
	return mediaData;
};

export const completeUpload = async (data, media) => {
	// let mediaArray = [];
	const mediaFiles = await Promise.all([...data]);
	const mediaArray = mediaFiles.map(async (file, index) => {
		if (file?.signed_response) {
			try {
				const newFileUpload = await axios.post(
					`${process.env.REACT_APP_API_ENDPOINT}/media-upload/complete-upload`,
					{
						file_name:
							index === 1
								? media.uploadedCoverImage[0].file_name
								: index === 2
								? media.uploadedLandscapeCoverImage[0]?.file_name
								: media.uploadedFiles[0].file_name,
						type: 'medialibrary',
						data: {
							bucket: 'media',
							multipart_upload:
								media.uploadedFiles[0]?.mime_type == 'video/mp4'
									? [
											{
												e_tag: file?.signed_response?.headers?.etag.replace(
													/['"]+/g,
													''
												),
												part_number: 1
											}
									  ]
									: ['image'],
							keys: {
								image_key: file?.keys?.image_key,
								...(media.mainCategoryName === 'Watch' ||
								media?.mainCategoryName === 'Watch'
									? {
											video_key: file?.keys?.video_key,
											audio_key: ''
									  }
									: {
											audio_key: file?.keys?.audio_key,
											video_key: ''
									  })
							},
							upload_id:
								media.mainCategoryName === 'Watch' ||
								media?.mainCategoryName === 'Watch'
									? file.upload_id || 'image'
									: file.fileType === 'image'
									? 'image'
									: 'audio'
						}
					},
					{
						headers: {
							Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
						}
					}
				);

				return newFileUpload;
			} catch (error) {
				console.error(error);
				toast.error('Failed to upload files. Please try again');
				throw Error(error.message || 'something went wrong');
			}
		}
	});

	const resolvedMediaFiles = Promise.all(mediaArray);
	return resolvedMediaFiles;
};

export const mediaUnwantedKeysForDeepEqual = [
	'mainCategory',
	'subCategory',
	'mainCategoryContent',
	'subCategoryContent'
];

export const mediaFormStatusInitialValues = {
	dirty: false
};

export const mediaFormInitialValues = (allRules) => {
	const rules = {};

	allRules.forEach((rule) => {
		rules[rule._id] = false;
	});

	return {
		mainCategory: '',
		subCategory: '',
		save_draft: true,
		is_scheduled: false,
		title: '',
		media_dropbox_url: '', // uploaded file
		image_dropbox_url: '', //portrait
		landscape_image_dropbox_url: '', //landscape
		description: '',
		labels: [],
		uploadedFiles: [],
		uploadedCoverImage: [], // PORTRAIT
		uploadedLandscapeCoverImage: [], //LANDSCAPE
		show_likes: true,
		show_comments: true,
		mainCategoryContent: '',
		subCategoryContent: '',
		rules
	};
};

export const mediaFormValidationSchema = advancedSettingsValidationSchema.shape(
	{
		mainCategory: Yup.string().required().label('Main Category'),
		subCategory: Yup.string().required().label('Sub Category'),
		title: Yup.string().required().label('Title'),
		media_dropbox_url: Yup.string(),
		image_dropbox_url: Yup.string(),
		landscape_image_dropbox_url: Yup.string(),
		description: Yup.string().required().label('Description'),
		labels: Yup.array()
			.min(4, (obj) => {
				const labelsCount = obj.value?.length;
				return `You need to add ${
					4 - labelsCount
				} more labels in order to upload media`;
			})
			.required('You need to enter atleast 4 labels')
			.label('Labels'),
		uploadedFiles: Yup.array()
			.min(1, 'You need to upload a file to post media')
			.required(),
		uploadedCoverImage: Yup.array().min(1).required(),
		uploadedLandscapeCoverImage: Yup.array().min(1).required()
	}
);
