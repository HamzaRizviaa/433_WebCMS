import axios from 'axios';
import captureVideoFrame from 'capture-video-frame';
import { getLocalStorageDetails } from './index';
import { toast } from 'react-toastify';
const uploadFileToServer = async (
	uploadedFile,
	libraryType,
	isHlsFormatEnabled
) => {
	let signedUrlKeyDelete = '';

	try {
		const result = await axios.post(
			`${process.env.REACT_APP_API_ENDPOINT}/media-upload/get-signed-url`, //converting files into smaller parts if file is huge
			{
				file_type: uploadedFile.fileExtension,
				parts: 1
			},
			{
				headers: {
					Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
				}
			}
		);

		if (result?.data?.data?.url) {
			signedUrlKeyDelete =
				result?.data?.data?.upload_id === 'image'
					? result?.data?.data?.keys?.image_key
					: result?.data?.data?.upload_id === 'audio'
					? result?.data?.data?.keys?.audio_key
					: result?.data?.data?.keys?.video_key;

			const _result = await axios.put(
				//to get e_tag
				result?.data?.data?.url,
				uploadedFile.file,
				{
					headers: { 'Content-Type': uploadedFile.mime_type }
				}
			);
			if (result?.data?.data?.video_thumbnail_url) {
				const frame = captureVideoFrame('my-video', 'png');
				await axios.put(result?.data?.data?.video_thumbnail_url, frame.blob, {
					//to get thumbnail of video
					headers: { 'Content-Type': 'image/png' }
				});
			}
			if (_result?.status === 200) {
				const uploadResult = await axios.post(
					`${process.env.REACT_APP_API_ENDPOINT}/media-upload/complete-upload`, //for completion of image/audio/video uplaod with different data properties
					{
						file_name: uploadedFile.file.name,
						type: libraryType,
						data: {
							bucket: 'media',
							multipart_upload:
								uploadedFile?.mime_type == 'video/mp4'
									? [
											{
												e_tag: _result?.headers?.etag.replace(/['"]+/g, ''),
												part_number: 1
											}
									  ]
									: ['image'],
							keys: {
								image_key: result?.data?.data?.keys?.image_key,
								video_key: result?.data?.data?.keys?.video_key,
								audio_key: ''
							},
							upload_id:
								uploadedFile?.mime_type == 'video/mp4'
									? result?.data?.data?.upload_id
									: 'image'
						},
						api_version: isHlsFormatEnabled ? 2 : 1
					},
					{
						headers: {
							Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
						}
					}
				);
				if (uploadResult?.data?.status_code === 200) {
					uploadResult.data.data.signedUrlKeyDelete = signedUrlKeyDelete;
					return uploadResult.data.data;
				} else {
					throw 'Error';
				}
			} else {
				throw 'Error';
			}
		} else {
			throw 'Error';
		}
	} catch (error) {
		toast.error('Failed to upload files, Please try again');
		throw new Error();

		// console.log('Error');
		// return null;
	}
};

export default uploadFileToServer;
