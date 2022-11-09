import axiosInstance from '../axiosInstance';

const sortKeysMapping = {
	title: 'title',
	file_name: 'media',
	post_date: 'postdate',
	labels: 'label',
	user: 'user',
	status: 'status',
	last_edit: 'lastedit',
	type: 'type'
};

class MediaLibraryService {
	/**
	 * This function is responsible for the fetching of all media
	 * @param {*} queryParams
	 * @returns Promise of the AxiosResponse Object
	 */
	static getMediaApi = (queryParams) => {
		const params = {
			...queryParams,
			limit: 20,
			sort_by: sortKeysMapping[queryParams.sort_by] || null
		};

		return axiosInstance.get('/media/get-media', { params });
	};

	static getAllMediaApi = (endPoint) => axiosInstance.get(`/${endPoint}`);

	static getMainCategoriesApi = () =>
		axiosInstance.get(`/media/get-main-categories`);

	static getSpecificMediaApi = (id) => axiosInstance.get(`/media/edit/${id}`);

	static getMediaLabelsApi = () => axiosInstance.get(`/label/all-labels`);

	static postMedia = (data) => {
		console.log('dataaas',data)
		return axiosInstance.post('/media/create-media', data, {
			params: {
				api_version: 2
			}
		});
	};

	static deleteMedia = (data) => {
		return axiosInstance.post('/media/delete-media', data, {
			params: {
				api_version: 2
			}
		});
	};

	static uploadMedia = async (id, payload) => {
		// let media_type = form.mainCategory?.id;
		console.log(id,payload)
		// try {
		// 	const result = await axios.post(
		// 		`${process.env.REACT_APP_API_ENDPOINT}/media/create-media`,

		// 		{ media_id: id, ...payload },
		// 		{
		// 			headers: {
		// 				Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
		// 			},
		// 			params: {
		// 				api_version: 2 //isTranslationsEnabled ? 1 : 2
		// 			}
		// 		}
		// 	);
		// 	console.log('result...........', result);
		// 	if (result?.data?.status_code === 200) {
		// 		toast.success(
		// 			isEdit
		// 				? 'Media has been updated!'
		// 				: payload?.save_draft
		// 				? 'Draft has been saved'
		// 				: 'Media has been uploaded!'
		// 		);
		// 		setIsLoadingUploadMedia(false);
		// 		dispatch(getMedia(queryParams));
		// 		handleClose();

		// 		if (isEdit && !(status === 'draft' && payload.save_draft === false)) {
		// 			dispatch(getMedia(queryParams));
		// 		} else if (isSearchParamsEmpty) {
		// 			dispatch(getMedia());
		// 		} else {
		// 			navigate('/media-library');
		// 		}
		// 	}
		// } catch (e) {
		// 	toast.error(
		// 		isEdit ? 'Failed to update media!' : 'Failed to create media!'
		// 	);
		// 	setIsLoadingUploadMedia(false);

		// 	console.log(e);
		// }
	};
}

export default MediaLibraryService;
