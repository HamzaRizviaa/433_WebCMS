import captureVideoFrame from 'capture-video-frame';
import UploadFileService from '../services/fileUploadService';

// eslint-disable-next-line no-unused-vars
import { FileObject } from '../../components/ui/inputs/DropzoneField';
import { toast } from 'react-toastify';

/**
 *
 * @param {Array<FileObject>} files - Files to upload
 * @param {string} libraryType - type of library
 * @returns {Promise<object[]>}
 */
const uploadFilesToS3 = async (files, libraryType) => {
	try {
		const signedUrlsPromise = files.map((fileObject) => {
			if (fileObject && fileObject.file) {
				return UploadFileService.getSignedUrl(fileObject.fileExtension);
			}
			return null;
		});

		const signedUrls = await Promise.all(signedUrlsPromise);

		const uploadedFilesDataPromise = signedUrls.map((item, index) => {
			if (item) {
				return uploadFileAndVideoThumbnail(
					item,
					files[index]?.file,
					files[index]?.mime_type
				);
			}
			return null;
		});

		const uploadedFilesData = await Promise.all(uploadedFilesDataPromise);

		const completeUploadsPromise = uploadedFilesData.map((item, index) => {
			if (item) {
				const { uploadedFileResult } = item;

				const payload = {
					file_name: files[index]?.file_name,
					type: libraryType,
					data: {
						bucket: 'media',
						multipart_upload:
							files[index]?.mime_type == 'video/mp4'
								? [
										{
											e_tag: uploadedFileResult?.headers?.etag.replace(
												/['"]+/g,
												''
											),
											part_number: 1
										}
								  ]
								: ['image'],
						keys: {
							image_key: signedUrls[index]?.data?.keys?.image_key,
							video_key: signedUrls[index]?.data?.keys?.video_key,
							audio_key: ''
						},
						upload_id:
							files[index]?.mime_type == 'video/mp4'
								? signedUrls[index]?.data?.upload_id
								: 'image'
					}
				};

				if (uploadedFileResult?.status === 200) {
					return UploadFileService.completeUploadedFile(payload);
				}

				return null;
			}

			return null;
		});

		const completeUploads = await Promise.all(completeUploadsPromise);

		const result = completeUploads.map((item, index) => {
			if (!files[index]?.file) return files[index];

			if (item) {
				if (item?.status_code === 200) {
					item.data.signedUrlKeyDelete =
						uploadedFilesData[index]?.signedUrlKeyDelete;
					item.data.height = files[index]?.height;
					item.data.width = files[index]?.width;
					return item.data;
				}
			}

			return null;
		});

		return result;
	} catch (err) {
		toast.error('Failed to upload files. Please try again');
		throw new Error(err);
	}
};

export default uploadFilesToS3;

const uploadFileAndVideoThumbnail = async (signedUrlData, file, mimeType) => {
	if (signedUrlData?.data?.url) {
		const signedUrlKeyDelete =
			signedUrlData?.data?.upload_id === 'image'
				? signedUrlData?.data?.keys?.image_key
				: signedUrlData?.data?.upload_id === 'audio'
				? signedUrlData?.data?.keys?.audio_key
				: signedUrlData?.data?.keys?.video_key;

		const uploadedFileResult = await UploadFileService.uploadFileToSignedUrl(
			signedUrlData?.data?.url,
			file,
			mimeType
		);

		if (signedUrlData?.data?.video_thumbnail_url) {
			const frame = captureVideoFrame('my-video', 'png');
			await UploadFileService.uploadVideoThumbnail(
				signedUrlData?.data?.video_thumbnail_url,
				frame.blob
			);
		}

		return { uploadedFileResult, signedUrlKeyDelete };
	}

	return { uploadedFileResult: null, signedUrlKeyDelete: null };
};
