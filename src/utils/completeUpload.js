import axios from 'axios';
import { getLocalStorageDetails } from './index';

const completeUplaod = async (
	form,
	promiseFile,
	libraryType,
	image = false
) => {
	return await axios.post(
		`${process.env.REACT_APP_API_ENDPOINT}/media-upload/complete-upload`,
		{
			file_name:
				form?.uploadedFiles[0]?.file_name ||
				form?.uploadedCoverImage[0]?.file_name,
			type: libraryType,
			data: {
				bucket: 'media',
				multipart_upload: image
					? ['image']
					: [
							{
								e_tag: promiseFile?.signed_response?.headers?.etag.replace(
									/['"]+/g,
									''
								),
								part_number: 1
							}
					  ],
				keys: {
					image_key: image
						? promiseFile?.keys?.image_key
						: form.uploadedCoverImage[0]?.keys?.image_key || '',
					...(form.mainCategory.name === 'Watch' ||
					form.mainCategory === 'Watch'
						? {
								video_key: promiseFile?.keys?.video_key,
								audio_key: ''
						  }
						: {
								audio_key: promiseFile?.keys?.audio_key,
								video_key: ''
						  })
				},
				upload_id:
					form.mainCategory?.name === 'Watch' || form.mainCategory === 'Watch'
						? promiseFile?.upload_id || 'image'
						: 'audio'
			}
		},
		{
			headers: {
				Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
			}
		}
	);
};
export default completeUplaod;
