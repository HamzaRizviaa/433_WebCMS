import { getFormatter } from '../../components/ui/Table/ColumnFormatters';
import { getDateTime, getLocalStorageDetails, makeid } from '../utils';
import { isEmpty } from 'lodash';
import axios from 'axios';
import * as Yup from 'yup';

const fileDuration = 10;
let portraitFileWidth = 100;
let portraitFileHeight = 100;
let landscapeFileWidth = 100;
let landscapeFileHeight = 100;
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

export const mediaDataFormatterForForm = (media) => {
	console.log('prebuild', media);
	const formattedMedia = { ...media };

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
					type: media?.mainCategory === 'Watch' ? 'video' : 'audio'
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
	formattedMedia.mainCategory = media?.media_type;
	formattedMedia.subCategory = media?.sub_category;
	console.log(formattedMedia);
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
			throw 'Error';
		}
	} catch (error) {
		console.log('Error');
		return null;
	}
};

export const fileUploadsArray = (media) => {
	let uploadFilesPromiseArray = [
		media.uploadedFiles[0], //audio/video
		media.uploadedCoverImage[0], //portrait
		media.uploadedLandscapeCoverImage[0] //landscape
	].map(async (_file) => {
		if (_file.file) {
			return await uploadFileToServer(_file, _file.type);
		} else {
			return _file;
		}
	});
	return Promise.all([...uploadFilesPromiseArray]);
};

export const mediaDataFormatterForServer = (
	media,
	isDraft = false,
	mediaFiles,
	userData
) => {
	console.log('MEDIA FILE WITH', media);
	const mediaData = {
		title: media.title,
		translations: undefined,
		description: media.description,
		duration: Math.round(fileDuration),
		type: 'medialibrary',
		save_draft: isDraft,
		main_category_id: media.mainCategory,
		sub_category_id: media.subCategory,
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
		media_url: mediaFiles[0]?.keys?.video_key || mediaFiles[0]?.keys?.audio_key,
		height: media?.uploadedFiles[0]?.height,
		width: media?.uploadedFiles[0]?.width,
		cover_image: {
			...(mediaFiles[1]?.url
				? {
						portrait: {
							width: portraitFileWidth,
							height: portraitFileHeight,
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
							width: landscapeFileWidth,
							height: landscapeFileHeight,
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
		file_name_media: media?.uploadedFiles[0]?.file_name,
		file_name_portrait_image: media?.uploadedCoverImage[0]?.file_name,
		file_name_landscape_image: media?.uploadedLandscapeCoverImage[0]?.file_name,
		file_name: media?.uploadedFiles[0]?.file_name,
		video_data: mediaFiles[0]?.keys?.video_key || null,
		image_data: mediaFiles[1]?.keys?.image_key || null,
		audio_data: mediaFiles[0]?.keys?.audio_key || null
	};
	return mediaData;
};

export const completeUpload = (data, media) => {
	return Promise.all([...data]).then(async (mediaFiles) => {
		mediaFiles.map(async (file, index) => {
			if (file?.signed_response) {
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
								...(media.mainCategory.name === 'Watch' ||
								media?.mainCategory === 'Watch'
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
								media.mainCategory.name === 'Watch' ||
								media?.mainCategory === 'Watch'
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
			} else {
				Promise.resolve();
			}
		});
	});
};

export const mediaFormInitialValues = {
	mainCategory: '',
	subCategory: '',
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
	show_comments: true
};

export const mediaFormValidationSchema = Yup.object().shape({
	mainCategory: Yup.string(),
	subCategory: Yup.string(),
	title: Yup.string().required().label('Title'),
	media_dropbox_url: Yup.string(),
	image_dropbox_url: Yup.string(),
	landscape_image_dropbox_url: Yup.string(),
	description: Yup.string().required().label('Description'),
	labels: Yup.array().min(7).required().label('Labels'),
	uploadedFiles: Yup.array().min(1).required(),
	uploadedCoverImage: Yup.array().min(1).required(),
	uploadedLandscapeCoverImage: Yup.array().min(1).required(),
	show_likes: Yup.boolean().required(),
	show_comments: Yup.boolean().required()
});
