import axios from 'axios';
import captureVideoFrame from 'capture-video-frame';
import { getLocalStorageDetails } from './index';

const uploadFileToServer = async (uploadedFile, libraryType) => {
	try {
		const result = await axios.post(
			`${process.env.REACT_APP_API_ENDPOINT}/media-upload/get-signed-url`,
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
			const _result = await axios.put(
				result?.data?.data?.url,
				uploadedFile.file,
				{
					headers: { 'Content-Type': uploadedFile.mime_type }
				}
			);
			if (result?.data?.data?.video_thumbnail_url) {
				const frame = captureVideoFrame('my-video', 'png');
				await axios.put(result?.data?.data?.video_thumbnail_url, frame.blob, {
					headers: { 'Content-Type': 'image/png' }
				});
			}
			if (_result?.status === 200) {
				console.log(
					result?.data?.data,
					'upload id ',
					uploadedFile,
					'upload file to server'
				);
				const uploadResult = await axios.post(
					`${process.env.REACT_APP_API_ENDPOINT}/media-upload/complete-upload`,
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
						}
					},
					{
						headers: {
							Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
						}
					}
				);
				if (uploadResult?.data?.status_code === 200) {
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
		console.log('Error');
		return null;
	}
};

export default uploadFileToServer;
