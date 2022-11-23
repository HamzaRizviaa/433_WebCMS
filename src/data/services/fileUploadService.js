import axios from 'axios';
import axiosInstance from '../axiosInstance';

class UploadFileService {
	static async getSignedUrl(fileExtension, parts = 1) {
		const payload = {
			file_type: fileExtension,
			parts
		};

		const { data } = await axiosInstance.post(
			'/media-upload/get-signed-url',
			payload
		);

		return data;
	}

	static async uploadFileToSignedUrl(url, file, mimeType) {
		const res = await axios.put(url, file, {
			headers: {
				'Content-Type': mimeType
			}
		});

		return res;
	}

	static async uploadVideoThumbnail(url, payload) {
		const { data } = await axios.put(url, payload, {
			headers: { 'Content-Type': 'image/png' }
		});

		return data;
	}

	static async completeUploadedFile(payload) {
		const { data } = await axiosInstance.post(
			'/media-upload/complete-upload',
			payload
		);

		return data;
	}
}

export default UploadFileService;
