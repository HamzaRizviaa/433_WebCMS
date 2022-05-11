import React, { useState, useEffect, useRef } from 'react';
import classes from './_uploadOrEditMedia.module.scss';
import PropTypes from 'prop-types';
import Slider from '../../slider';
import Button from '../../button';
import LoadingOverlay from 'react-loading-overlay';
import { MenuItem, TextField, Select } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useDropzone } from 'react-dropzone';
import { makeid } from '../../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import checkFileSize from '../../../utils/validateFileSize';
import {
	getMainCategories,
	getMediaLabels
} from './../../../pages/MediaLibrary/mediaLibrarySlice';
import { getLocalStorageDetails } from '../../../utils';
import { getMedia } from '../../../pages/MediaLibrary/mediaLibrarySlice';
import Close from '@material-ui/icons/Close';
import axios from 'axios';
import { toast } from 'react-toastify';
import DragAndDropField from '../../DragAndDropField';
import Labels from '../../Labels';
import { Tooltip, Fade } from '@mui/material';
import Slide from '@mui/material/Slide';
import { ReactComponent as Info } from '../../../assets/InfoButton.svg';
import PrimaryLoader from '../../PrimaryLoader';
import validateForm from '../../../utils/validateForm';
import validateDraft from '../../../utils/validateDraft';

const UploadOrEditMedia = ({
	open,
	handleClose,
	title,
	heading1,
	buttonText,
	isEdit,
	page,
	status
}) => {
	const [mediaLabels, setMediaLabels] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [fileRejectionError, setFileRejectionError] = useState('');
	const [fileRejectionError2, setFileRejectionError2] = useState('');
	const [subCategoryLabelColor, setSubCategoryLabelColor] = useState('#ffffff');
	const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
	const [previewFile, setPreviewFile] = useState(null);
	const [previewBool, setPreviewBool] = useState(false);
	const [isLoadingUploadMedia, setIsLoadingUploadMedia] = useState(false);
	const [extraLabel, setExtraLabel] = useState('');
	const [disableDropdown, setDisableDropdown] = useState(true);
	const [fileWidth, setFileWidth] = useState(0);
	const [fileHeight, setFileHeight] = useState(0);
	const [fileDuration, setFileDuration] = useState(0);
	const [editBtnDisabled, setEditBtnDisabled] = useState(false);
	const [draftBtnDisabled, setDraftBtnDisabled] = useState(false);
	const [isError, setIsError] = useState({});
	const videoRef = useRef(null);
	const imgRef = useRef(null);
	const previewRef = useRef(null);
	const loadingRef = useRef(null);
	const [form, setForm] = useState({
		mainCategory: '',
		subCategory: '',
		title: '',
		media_dropbox_url: '',
		image_dropbox_url: '',
		description: '',
		labels: [],
		uploadedFiles: [],
		uploadedCoverImage: []
	});

	const specificMedia = useSelector(
		(state) => state.mediaLibraryOriginal.specificMedia
	);
	const mainCategories = useSelector(
		(state) => state.mediaLibraryOriginal.mainCategories
	);
	const specificMediaStatus = useSelector(
		(state) => state.mediaLibraryOriginal
	);
	const labels = useSelector((state) => state.mediaLibraryOriginal.labels);

	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			accept: `${
				form.mainCategory?.name === 'Watch' ||
				specificMedia?.media_type === 'Watch'
					? 'video/mp4'
					: 'audio/mp3, audio/mpeg'
			}`,
			maxFiles: 1,
			validator: checkFileSize
		});
	const dispatch = useDispatch();

	useEffect(() => {
		if (labels.length) {
			setMediaLabels([...labels]);
		}
	}, [labels]);

	useEffect(() => {
		setMediaLabels((labels) => {
			return labels.filter((label) => label.id != null);
		});
		if (extraLabel) {
			let flag = mediaLabels.some((label) => label.name == extraLabel);
			if (flag == false) {
				setMediaLabels((labels) => {
					return [...labels, { id: null, name: extraLabel }];
				});
			}
		}
	}, [extraLabel]);

	useEffect(() => {
		if (specificMedia) {
			if (specificMedia?.labels) {
				let _labels = [];
				specificMedia.labels.map((label) =>
					_labels.push({ id: -1, name: label })
				);

				setForm((prev) => {
					return {
						...prev,
						labels: _labels
					};
				});
			}

			setForm((prev) => {
				return {
					...prev,
					title: specificMedia?.title,
					description: specificMedia?.description,
					media_dropbox_url: specificMedia?.media_dropbox_url,
					image_dropbox_url: specificMedia?.image_dropbox_url,
					mainCategory: specificMedia?.media_type,
					subCategory: specificMedia?.sub_category,
					uploadedFiles: specificMedia?.media_url
						? [
								{
									id: makeid(10),
									file_name: specificMedia?.file_name_media,
									media_url: specificMedia?.media_url
										? `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificMedia?.media_url}`
										: '',
									type:
										specificMedia?.media_type === 'Watch' ? 'video' : 'audio'
								}
						  ]
						: [],
					uploadedCoverImage: specificMedia?.cover_image
						? [
								{
									id: makeid(10),
									file_name: specificMedia?.file_name_image,
									media_url: specificMedia?.cover_image
										? `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificMedia?.cover_image}`
										: '',
									type: 'image'
								}
						  ]
						: []
				};
			});
		}
	}, [specificMedia]);

	useEffect(() => {
		dispatch(getMainCategories());
		dispatch(getMediaLabels());
		return () => {
			resetState();
		};
	}, []);

	const {
		acceptedFiles: acceptedFiles2,
		fileRejections: fileRejections2,
		getRootProps: getRootProps2,
		getInputProps: getInputProps2
	} = useDropzone({
		accept: '.jpeg, .jpg, .png',
		maxFiles: 1,
		validator: checkFileSize
	});

	const updateSubCategories = async (mainCategory) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_API_ENDPOINT}/media/get-sub-categories/${mainCategory.id}`,
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);

			if (response?.data?.data?.length) {
				setSubCategories([...response.data.data]);
			} else {
				setSubCategories([]);
			}
		} catch (error) {
			console.log({ error });
		}
	};

	useEffect(() => {
		if (form.mainCategory && !isEdit) {
			updateSubCategories(form.mainCategory);
		}
	}, [form.mainCategory]);

	useEffect(() => {
		if (!open) {
			resetState();
		}
	}, [open]);

	useEffect(() => {
		if (fileRejections.length) {
			fileRejections.forEach(({ errors }) => {
				return errors.forEach((e) => setFileRejectionError(e.message));
			});
			setTimeout(() => {
				setFileRejectionError('');
			}, [5000]);
		}
	}, [fileRejections]);

	useEffect(() => {
		if (fileRejections2.length) {
			fileRejections2.forEach(({ errors }) => {
				return errors.forEach((e) => setFileRejectionError2(e.message));
			});
			setTimeout(() => {
				setFileRejectionError2('');
			}, [5000]);
		}
	}, [fileRejections2]);

	const getFileType = (type) => {
		if (type) {
			let _type = type.split('/');
			return _type && _type[1];
		}
	};

	const selectFileType = (type) => {
		switch (type) {
			case 'video/mp4':
				return 'video';
			case 'audio/mp3':
				return 'audio';
			case 'audio/mpeg':
				return 'audio';
			default:
				return 'image';
		}
	};

	useEffect(() => {
		if (acceptedFiles?.length) {
			let newFiles = acceptedFiles.map((file) => {
				let id = makeid(10);

				return {
					id: id,
					file_name: file.name,
					media_url: URL.createObjectURL(file),
					fileExtension: `.${getFileType(file.type)}`,
					mime_type: file.type,
					file: file,
					type: selectFileType(file.type)
				};
			});
			setForm((prev) => {
				return {
					...prev,
					uploadedFiles: [...form.uploadedFiles, ...newFiles]
				};
			});
		}
	}, [acceptedFiles]);

	useEffect(() => {}, [videoRef.current]);

	useEffect(() => {
		if (acceptedFiles2?.length) {
			let newFiles = acceptedFiles2.map((file) => {
				let id = makeid(10);
				return {
					id: id,
					file_name: file.name,
					media_url: URL.createObjectURL(file),
					fileExtension: `.${getFileType(file.type)}`,
					mime_type: file.type,
					file: file,
					type: file.type === 'video/mp4' ? 'video' : 'image'
				};
			});

			setForm((prev) => {
				return {
					...prev,
					uploadedCoverImage: [...form.uploadedCoverImage, ...newFiles]
				};
			});
		}
	}, [acceptedFiles2]);

	const resetState = () => {
		setFileRejectionError2('');
		setSubCategoryLabelColor('#ffffff');
		setTimeout(() => {
			setDeleteBtnStatus(false);
		}, 1000);

		setPreviewFile(null);
		setPreviewBool(false);
		setExtraLabel('');
		setDisableDropdown(true);
		setFileWidth(0);
		setFileHeight(0);
		setFileDuration(0);
		setEditBtnDisabled(false);
		setDraftBtnDisabled(false);
		setIsError({});
		setForm({
			title: '',
			description: '',
			media_dropbox_url: '',
			image_dropbox_url: '',
			mainCategory: '',
			subCategory: '',
			labels: [],
			uploadedFiles: [],
			uploadedCoverImage: []
		});
	};

	const handleDeleteFile = (id) => {
		setForm((prev) => {
			return {
				...prev,
				uploadedFiles: form.uploadedFiles.filter((file) => file.id !== id)
			};
		});
	};

	const handleDeleteFile2 = (id) => {
		setForm((prev) => {
			return {
				...prev,
				uploadedCoverImage: form.uploadedCoverImage.filter(
					(file) => file.id !== id
				)
			};
		});
	};

	const validatePostBtn = () => {
		setIsError({
			uploadedFiles: form.uploadedFiles.length < 1,
			selectedLabels: form.labels.length < 7,
			uploadedCoverImage: form.uploadedCoverImage.length < 1,
			mainCategory: !form.mainCategory,
			subCategory: !form.subCategory.name,
			titleMedia: !form.title && { message: 'You need to enter a Title' },
			description: !form.description
		});

		setTimeout(() => {
			setIsError({});
		}, 5000);
	};

	const validateDraftBtn = () => {
		setIsError({
			uploadedFiles: form.uploadedFiles.length < 1,
			selectedLabelsDraft: form.labels.length < 1,
			uploadedCoverImage: form.uploadedCoverImage.length < 1,
			titleMedia: !form.title && { message: 'You need to enter a Title' },
			description: !form.description
		});

		setTimeout(() => {
			setIsError({});
		}, 5000);
	};

	const deleteMedia = async (id, isDraft) => {
		setDeleteBtnStatus(true);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/media/delete-media`,
				{
					media_id: id,
					is_draft: isDraft
				},
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			if (result?.data?.status_code === 200) {
				if (result?.data?.data?.is_deleted === false) {
					toast.error(
						'The media or article cannot be deleted because it is used as a top banner'
					);
					dispatch(getMedia({ page }));
				} else {
					toast.success('Media has been deleted!');
					handleClose();
					//setting a timeout for getting post after delete.
					dispatch(getMedia({ page }));
				}
			}
		} catch (e) {
			toast.error('Failed to delete media!');
			setDeleteBtnStatus(false);
			console.log(e);
		}
	};

	const handleChangeExtraLabel = (e) => {
		setExtraLabel(e.target.value.toUpperCase());
	};

	const uploadMedia = async (id, payload) => {
		let media_type = form.mainCategory?.id;
		// setMediaButtonStatus(true);
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/media/create-media`,
				isEdit
					? { media_id: id, ...payload }
					: {
							main_category_id: media_type,
							sub_category_id: form.subCategory?.id,
							duration: Math.round(fileDuration),
							save_draft: false,
							width: fileWidth,
							height: fileHeight,
							title: form.title,
							description: form.description,
							...(form.media_dropbox_url
								? { media_dropbox_url: form.media_dropbox_url }
								: {}),
							...(form.image_dropbox_url
								? { image_dropbox_url: form.image_dropbox_url }
								: {}),
							...(form.labels.length ? { labels: [...form.labels] } : {}),

							data: {
								video_data: payload?.data?.Keys?.VideoKey,
								image_data: payload?.data?.Keys?.ImageKey,
								audio_data: payload?.data?.Keys?.AudioKey
							},
							user_data: {
								id: `${getLocalStorageDetails()?.id}`,
								first_name: `${getLocalStorageDetails()?.first_name}`,
								last_name: `${getLocalStorageDetails()?.last_name}`
							},
							...payload
					  },
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			if (result?.data?.status_code === 200) {
				toast.success(
					isEdit
						? 'Media has been updated!'
						: payload?.save_draft
						? 'Draft has been saved'
						: 'Media has been uploaded!'
				);
				setIsLoadingUploadMedia(false);

				dispatch(getMedia({ page }));
				handleClose();
			}
		} catch (e) {
			toast.error(
				isEdit ? 'Failed to update media!' : 'Failed to create media!'
			);
			setIsLoadingUploadMedia(false);

			console.log(e);
		}
	};

	const uploadFileToServer = async (file, type) => {
		try {
			const result = await axios.post(
				`${process.env.REACT_APP_API_ENDPOINT}/media-upload/get-signed-url`,
				{
					file_type:
						file.fileExtension === '.mpeg' ? '.mp3' : file.fileExtension,
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

	const handleTitleDuplicate = async (givenTitle) => {
		try {
			const result = await axios.get(
				`${process.env.REACT_APP_API_ENDPOINT}/media/check/${givenTitle}`,
				{
					headers: {
						Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
					}
				}
			);
			return result?.data?.status_code;
		} catch (error) {
			console.log('Error');
			return null;
		}
	};

	const handlePreviewEscape = () => {
		setPreviewBool(false);
		setPreviewFile(null);
	};

	useEffect(() => {
		if (specificMedia) {
			setEditBtnDisabled(
				!form.uploadedFiles.length ||
					!form.uploadedCoverImage.length ||
					!form.title ||
					!form.description ||
					(specificMedia?.file_name_media ===
						form.uploadedFiles[0]?.file_name &&
						specificMedia?.file_name_image ===
							form.uploadedCoverImage[0]?.file_name &&
						specificMedia?.media_dropbox_url ===
							form.media_dropbox_url.trim() &&
						specificMedia?.image_dropbox_url ===
							form.image_dropbox_url.trim() &&
						specificMedia?.title.replace(/\s+/g, '')?.trim() ===
							form.title?.replace(/\s+/g, '')?.trim() &&
						specificMedia?.description?.replace(/\s+/g, '')?.trim() ===
							form.description?.replace(/\s+/g, '')?.trim())
			);
		}
	}, [specificMedia, form]);

	const checkDuplicateLabel = () => {
		let formLabels = form?.labels?.map((formL) => {
			if (specificMedia?.labels?.includes(formL.name)) {
				return true;
			} else {
				return false;
			}
		});
		return formLabels.some((label) => label === false);
	};

	useEffect(() => {
		if (specificMedia) {
			setDraftBtnDisabled(
				// specificMedia?.file_name_media === form?.uploadedFiles[0]?.file_name &&
				// 	specificMedia?.file_name_image ===
				// 		form?.uploadedCoverImage[0]?.file_name &&

				specificMedia?.media_dropbox_url === form?.media_dropbox_url?.trim() &&
					specificMedia?.image_dropbox_url ===
						form?.image_dropbox_url?.trim() &&
					specificMedia?.title?.replace(/\s+/g, '')?.trim() ===
						form?.title?.replace(/\s+/g, '')?.trim() &&
					specificMedia?.description?.replace(/\s+/g, '')?.trim() ===
						form?.description?.replace(/\s+/g, '')?.trim() &&
					(specificMedia?.labels?.length === form?.labels?.length ||
						!form.labels.length) &&
					!checkDuplicateLabel()
			);
		}
	}, [specificMedia, form]);

	const MainCategoryId = (e) => {
		//find name and will return whole object  isEdit ? subCategory : subCategory.name
		let setData = mainCategories.find((u) => u.name === e);
		setForm((prev) => {
			return { ...prev, mainCategory: setData };
		});
	};

	useEffect(() => {
		//only empty it when its on new one , not on edit / specific media
		if (!isEdit) {
			// setSubCategory({ id: null, name: '' });
			setForm((prev) => {
				return { ...prev, subCategory: '' };
			});
		}
	}, [form.mainCategory]);

	const SubCategoryId = (e) => {
		//e -- name
		//find name and will return whole object
		let setData = subCategories.find((u) => u.name === e);
		setForm((prev) => {
			return { ...prev, subCategory: setData };
		});
	};
	useEffect(() => {
		validateForm(form);
	}, [form]);

	const addSaveMediaBtn = async () => {
		if (!validateForm(form)) {
			validatePostBtn();
		} else {
			setIsLoadingUploadMedia(true);
			loadingRef.current.scrollIntoView({ behavior: 'smooth' });
			if (isEdit) {
				if (specificMedia?.title?.trim() !== form.title?.trim()) {
					if (
						(await handleTitleDuplicate(form.title)) === 200 &&
						form.title !== specificMedia.title
					) {
						setIsError((prev) => {
							return {
								...prev,
								titleMedia: { message: 'This title already exists' }
							};
						});
						setTimeout(() => {
							setIsError({});
						}, [5000]);
						setIsLoadingUploadMedia(false);
						// setMediaButtonStatus(false);
						return;
					}
				}

				let uploadFilesPromiseArray = [
					form.uploadedFiles[0],
					form.uploadedCoverImage[0]
				].map(async (_file) => {
					if (_file.file) {
						return await uploadFileToServer(_file, _file.type);
					} else {
						return _file;
					}
				});

				Promise.all([...uploadFilesPromiseArray])
					.then(async (mediaFiles) => {
						const completedUpload = mediaFiles.map(async (file) => {
							if (file?.signed_response) {
								return await axios.post(
									`${process.env.REACT_APP_API_ENDPOINT}/media-upload/complete-upload`,
									{
										file_name:
											file.fileType === 'image'
												? form.uploadedCoverImage[0].file_name
												: form.uploadedFiles[0].file_name,
										type: 'medialibrary',
										data: {
											bucket: 'media',
											multipart_upload:
												form.uploadedFiles[0]?.mime_type == 'video/mp4'
													? [
															{
																e_tag:
																	file?.signed_response?.headers?.etag.replace(
																		/['"]+/g,
																		''
																	),
																part_number: 1
															}
													  ]
													: ['image'],
											keys: {
												image_key: file?.keys?.image_key,
												...(form.mainCategory.name === 'Watch' ||
												specificMedia?.media_type === 'Watch'
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
												form.mainCategory.name === 'Watch' ||
												specificMedia?.media_type === 'Watch'
													? file.upload_id || 'image'
													: file.fileType === 'image'
													? 'image'
													: 'audio'
										}
									},
									{
										headers: {
											Authorization: `Bearer ${
												getLocalStorageDetails()?.access_token
											}`
										}
									}
								);
							}
						});
						await uploadMedia(specificMedia?.id, {
							title: form.title,
							description: form.description,
							type: 'medialibrary',
							save_draft: false,
							...(form.media_dropbox_url
								? { media_dropbox_url: form.media_dropbox_url }
								: {}),
							...(form.image_dropbox_url
								? { image_dropbox_url: form.image_dropbox_url }
								: {}),
							data: {
								file_name_media: form.uploadedFiles[0].file_name,
								file_name_image: form.uploadedCoverImage[0].file_name,
								image_data: mediaFiles[1]?.keys?.image_key,
								audio_data: mediaFiles[0]?.keys?.audio_key,
								video_data: mediaFiles[0]?.keys?.video_key,
								...completedUpload?.data?.data
							}
						});
					})
					.catch(() => {
						setIsLoadingUploadMedia(false);
					});
			} else {
				if (
					(await handleTitleDuplicate(form.title)) === 200 &&
					form.title !== specificMedia.title
				) {
					setIsError((prev) => {
						return {
							...prev,
							titleMedia: { message: 'This title already exists' }
						};
					});
					setTimeout(() => {
						setIsError({});
					}, [5000]);
					setIsLoadingUploadMedia(false);

					return;
				}
				let uploadFilesPromiseArray = [
					form.uploadedFiles[0],
					form.uploadedCoverImage[0]
				].map(async (_file) => {
					return uploadFileToServer(_file);
				});

				Promise.all([...uploadFilesPromiseArray])
					.then(async (mediaFiles) => {
						const completeUpload = await axios.post(
							`${process.env.REACT_APP_API_ENDPOINT}/media-upload/complete-upload`,
							{
								file_name: form.uploadedFiles[0].file_name,
								type: 'medialibrary',
								data: {
									bucket: 'media',
									multipart_upload:
										form.uploadedFiles[0]?.mime_type == 'video/mp4'
											? [
													{
														e_tag:
															mediaFiles[0]?.signed_response?.headers?.etag.replace(
																/['"]+/g,
																''
															),
														part_number: 1
													}
											  ]
											: ['image'],
									keys: {
										image_key: mediaFiles[1]?.keys?.image_key,
										...(form.mainCategory.name === 'Watch' ||
										specificMedia?.media_type === 'Watch'
											? {
													video_key: mediaFiles[0]?.keys?.video_key,
													audio_key: ''
											  }
											: {
													audio_key: mediaFiles[0]?.keys?.audio_key,
													video_key: ''
											  })
									},
									upload_id:
										form.mainCategory?.name === 'Watch' ||
										specificMedia?.media_type === 'Watch'
											? mediaFiles[0].upload_id
											: 'audio'
								}
							},
							{
								headers: {
									Authorization: `Bearer ${
										getLocalStorageDetails()?.access_token
									}`
								}
							}
						);
						await uploadMedia(null, {
							type: 'medialibrary',
							data: {
								file_name_media: form.uploadedFiles[0].file_name,
								file_name_image: form.uploadedCoverImage[0].file_name,
								...completeUpload?.data?.data
							}
						});
					})
					.catch(() => {
						setIsLoadingUploadMedia(false);
					});
			}
		}
	};

	console.log(form?.uploadedFiles[0], 'upldF');
	console.log(form?.uploadedCoverImage[0], 'Cover');
	const saveDraftBtn = async () => {
		if (!validateDraft(form)) {
			validateDraftBtn();
		} else {
			setIsLoadingUploadMedia(true);
			loadingRef.current.scrollIntoView({ behavior: 'smooth' });

			if (isEdit) {
				let uploadedFile;
				let uploadedCoverImage;
				if (form.uploadedFiles[0] && form?.uploadedFiles[0]?.file) {
					// let promiseFile;
					// if (form?.uploadedFiles[0]?.file) {
					// 	promiseFile = await uploadFileToServer(
					// 		form.uploadedFiles[0],
					// 		form.uploadedFiles[0].type
					// 	);
					// } else {
					// 	return form?.uploadedFiles[0];
					// }
					let promiseFile = await uploadFileToServer(
						form.uploadedFiles[0],
						form.uploadedFiles[0].type
					);

					uploadedFile = await axios.post(
						`${process.env.REACT_APP_API_ENDPOINT}/media-upload/complete-upload`,
						{
							file_name: form.uploadedFiles[0].file_name,
							type: 'medialibrary',
							data: {
								bucket: 'media',
								multipart_upload:
									form.uploadedFiles[0]?.mime_type == 'video/mp4'
										? [
												{
													e_tag:
														promiseFile?.signed_response?.headers?.etag.replace(
															/['"]+/g,
															''
														),
													part_number: 1
												}
										  ]
										: ['image'],
								keys: {
									image_key: form.uploadedCoverImage[0]?.keys?.image_key || '',
									...(form.mainCategory.name === 'Watch' ||
									specificMedia?.media_type === 'Watch'
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
									form.mainCategory?.name === 'Watch' ||
									specificMedia?.media_type === 'Watch'
										? promiseFile?.upload_id
										: 'audio'
							}
						},
						{
							headers: {
								Authorization: `Bearer ${
									getLocalStorageDetails()?.access_token
								}`
							}
						}
					);
				}

				if (form.uploadedCoverImage[0] && form.uploadedCoverImage[0]?.file) {
					// let promiseFile;
					// if (form.uploadedCoverImage[0]?.file) {
					// 	promiseFile = await uploadFileToServer(
					// 		form.uploadedCoverImage[0],
					// 		form.uploadedCoverImage[0].type
					// 	);
					// } else {
					// 	return form.uploadedCoverImage[0];
					// }
					let promiseFile = await uploadFileToServer(
						form.uploadedCoverImage[0],
						form.uploadedCoverImage[0].type
					);

					uploadedCoverImage = await axios.post(
						`${process.env.REACT_APP_API_ENDPOINT}/media-upload/complete-upload`,
						{
							file_name: form.uploadedCoverImage[0].file_name,
							type: 'medialibrary',
							data: {
								bucket: 'media',
								multipart_upload:
									form.uploadedCoverImage[0]?.mime_type == 'video/mp4'
										? [
												{
													e_tag:
														promiseFile?.signed_response?.headers?.etag.replace(
															/['"]+/g,
															''
														),
													part_number: 1
												}
										  ]
										: ['image'],
								keys: {
									image_key: promiseFile?.keys?.image_key || '',
									...(form.mainCategory.name === 'Watch' ||
									specificMedia?.media_type === 'Watch'
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
									form.mainCategory?.name === 'Watch' ||
									specificMedia?.media_type === 'Watch'
										? promiseFile?.upload_id || 'image'
										: 'audio'
							}
						},
						{
							headers: {
								Authorization: `Bearer ${
									getLocalStorageDetails()?.access_token
								}`
							}
						}
					);
				}

				await uploadMedia(specificMedia?.id, {
					save_draft: true,
					type: 'medialibrary',
					title: form.title,
					description: form.description,
					...(form.media_dropbox_url
						? { media_dropbox_url: form.media_dropbox_url }
						: {}),
					...(form.image_dropbox_url
						? { image_dropbox_url: form.image_dropbox_url }
						: {}),
					...(form.labels.length ? { labels: [...form.labels] } : {}),
					data: {
						...(uploadedFile &&
							(form?.uploadedFiles[0]?.file || form?.uploadedFiles[0]) && {
								file_name_media: form.uploadedFiles[0].file_name,
								...uploadedFile?.data?.data
							}),
						...(uploadedCoverImage &&
							(form?.uploadedCoverImage[0]?.file ||
								form?.uploadedCoverImage[0]) && {
								file_name_image: form.uploadedCoverImage[0].file_name,
								...uploadedCoverImage?.data?.data
							})
					}
				});
			} else {
				let uploadedFile;
				let uploadedCoverImage;
				if (form.uploadedFiles[0]) {
					let promiseFile = await uploadFileToServer(
						form.uploadedFiles[0],
						form.uploadedFiles[0].type
					);

					uploadedFile = await axios.post(
						`${process.env.REACT_APP_API_ENDPOINT}/media-upload/complete-upload`,
						{
							file_name: form.uploadedFiles[0].file_name,
							type: 'medialibrary',
							data: {
								bucket: 'media',
								multipart_upload:
									form.uploadedFiles[0]?.mime_type == 'video/mp4'
										? [
												{
													e_tag:
														promiseFile?.signed_response?.headers?.etag.replace(
															/['"]+/g,
															''
														),
													part_number: 1
												}
										  ]
										: ['image'],
								keys: {
									image_key: '',
									...(form.mainCategory.name === 'Watch' ||
									specificMedia?.media_type === 'Watch'
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
									form.mainCategory?.name === 'Watch' ||
									specificMedia?.media_type === 'Watch'
										? promiseFile?.upload_id
										: 'audio'
							}
						},
						{
							headers: {
								Authorization: `Bearer ${
									getLocalStorageDetails()?.access_token
								}`
							}
						}
					);
				}

				if (form.uploadedCoverImage[0]) {
					let promiseFile = await uploadFileToServer(
						form.uploadedCoverImage[0],
						form.uploadedCoverImage[0].type
					);

					uploadedCoverImage = await axios.post(
						`${process.env.REACT_APP_API_ENDPOINT}/media-upload/complete-upload`,
						{
							file_name: form.uploadedCoverImage[0].file_name,
							type: 'medialibrary',
							data: {
								bucket: 'media',
								multipart_upload:
									form.uploadedCoverImage[0]?.mime_type == 'video/mp4'
										? [
												{
													e_tag:
														promiseFile?.signed_response?.headers?.etag.replace(
															/['"]+/g,
															''
														),
													part_number: 1
												}
										  ]
										: ['image'],
								keys: {
									image_key: promiseFile?.keys?.image_key || '',
									video_key: '',
									audio_key: ''
								},
								upload_id:
									form.mainCategory?.name === 'Watch' ||
									specificMedia?.media_type === 'Watch'
										? promiseFile?.upload_id || 'image'
										: 'audio'
							}
						},
						{
							headers: {
								Authorization: `Bearer ${
									getLocalStorageDetails()?.access_token
								}`
							}
						}
					);
				}

				await uploadMedia(null, {
					save_draft: true,
					type: 'medialibrary',

					data: {
						...(uploadedFile && {
							file_name_media: form.uploadedFiles[0].file_name,
							...uploadedFile?.data?.data
						}),
						...(uploadedCoverImage && {
							file_name_image: form.uploadedCoverImage[0].file_name,
							...uploadedCoverImage?.data?.data
						})
						// file_name_media: form.uploadedFiles[0].file_name,
						// file_name_image: form.uploadedCoverImage[0].file_name,
						// ...completeUpload?.data?.data
					}
				});
			}
		}
	};

	return (
		<Slider
			open={open}
			handleClose={() => {
				handleClose();
				if (form.uploadedFiles.length && !isEdit) {
					form.uploadedFiles.map((file) => handleDeleteFile(file.id));
				}
				if (form.uploadedCoverImage.length && !isEdit) {
					form.uploadedCoverImage.map((file) => handleDeleteFile2(file.id));
				}
			}}
			title={title}
			disableDropdown={disableDropdown}
			handlePreview={() => {
				handlePreviewEscape();
			}}
			preview={previewBool}
			previewRef={previewRef}
			media={true}
		>
			<LoadingOverlay active={isLoadingUploadMedia} spinner={<PrimaryLoader />}>
				<Slide in={true} direction='up' {...{ timeout: 400 }}>
					<div
						ref={loadingRef}
						className={`${
							previewFile != null
								? classes.previewContentWrapper
								: classes.contentWrapper
						}`}
					>
						{specificMediaStatus.specificMediaStatus === 'loading' ? (
							<PrimaryLoader />
						) : (
							<></>
						)}
						<div
							className={classes.contentWrapperNoPreview}
							style={{ width: previewFile != null ? '60%' : 'auto' }}
						>
							<div>
								<h5>{heading1}</h5>
								<div className={classes.categoryContainer}>
									<div className={classes.mainCategory}>
										<h6
											className={[
												isError.mainCategory
													? classes.errorState
													: classes.noErrorState
											].join(' ')}
										>
											MAIN CATEGORY
										</h6>
										<Select
											onOpen={() => {
												setDisableDropdown(false);
											}}
											onClose={() => {
												setDisableDropdown(true);
											}}
											disabled={isEdit ? true : false}
											style={{
												backgroundColor: isEdit ? '#404040' : '#000000'
											}}
											value={
												isEdit ? form.mainCategory : form.mainCategory?.name
											}
											onChange={(e) => {
												setDisableDropdown(true);
												MainCategoryId(e.target.value);
												if (form.uploadedFiles.length) {
													form.uploadedFiles.map((file) =>
														handleDeleteFile(file.id)
													);
												}
											}}
											className={`${classes.select} ${
												isEdit ? `${classes.isEditSelect}` : ''
											}`}
											disableUnderline={true}
											IconComponent={(props) => (
												<KeyboardArrowDownIcon
													{...props}
													style={{
														display: isEdit ? 'none' : 'block',
														top: '4'
													}}
												/>
											)}
											MenuProps={{
												anchorOrigin: {
													vertical: 'bottom',
													horizontal: 'left'
												},
												transformOrigin: {
													vertical: 'top',
													horizontal: 'left'
												},
												getContentAnchorEl: null
											}}
											displayEmpty={true}
											renderValue={(value) =>
												value?.length
													? Array.isArray(value)
														? value.join(', ')
														: value
													: 'Please Select'
											}
										>
											{/* <MenuItem disabled value=''>
											Please Select
										</MenuItem> */}
											{mainCategories.map((category, index) => {
												return (
													<MenuItem key={index} value={category.name}>
														{category.name}
													</MenuItem>
												);
											})}
										</Select>
										<div className={classes.catergoryErrorContainer}>
											<p className={classes.uploadMediaError}>
												{isError.mainCategory
													? 'You need to select main category'
													: ''}
											</p>
										</div>
									</div>
									<div className={classes.subCategory}>
										<h6
											style={{
												color: form.mainCategory?.name
													? subCategoryLabelColor
													: ''
											}}
										>
											SUB CATEGORY
										</h6>
										<Select
											onOpen={() => {
												setDisableDropdown(false);
											}}
											onClose={() => {
												setDisableDropdown(true);
											}}
											disabled={!form.mainCategory || isEdit ? true : false}
											style={{
												backgroundColor: isEdit ? '#404040' : '#000000'
											}}
											value={isEdit ? form.subCategory : form.subCategory?.name}
											onChange={(e) => {
												setDisableDropdown(true);
												SubCategoryId(e.target.value);
											}}
											className={`${classes.select} ${
												isEdit ? `${classes.isEditSelect}` : ''
											}`}
											disableUnderline={true}
											IconComponent={(props) => (
												<KeyboardArrowDownIcon
													{...props}
													style={{
														display: isEdit ? 'none' : 'block',
														top: '4'
													}}
												/>
											)}
											MenuProps={{
												anchorOrigin: {
													vertical: 'bottom',
													horizontal: 'left'
												},
												transformOrigin: {
													vertical: 'top',
													horizontal: 'left'
												},
												getContentAnchorEl: null
											}}
											displayEmpty={form.mainCategory ? true : false}
											renderValue={(value) =>
												value?.length
													? Array.isArray(value)
														? value.join(', ')
														: value
													: 'Please Select'
											}
										>
											{subCategories.map((category, index) => {
												return (
													<MenuItem key={index} value={category.name}>
														{category.name}
													</MenuItem>
												);
											})}
										</Select>
										<p className={classes.uploadMediaError2}>
											{isEdit
												? ' '
												: form.mainCategory?.name || form.mainCategory
												? isError.subCategory &&
												  'You need to select sub category'
												: ''}
											{/* {} */}
										</p>
									</div>
								</div>

								{(form.mainCategory && form.subCategory?.name) || isEdit ? (
									<>
										{form.mainCategory.name === 'Watch' ? (
											<div className={classes.explanationWrapper}>
												<h5>{isEdit ? 'Media File' : 'Add Media File'}</h5>
												<Tooltip
													TransitionComponent={Fade}
													TransitionProps={{ timeout: 800 }}
													title='Default encoding for videos should be H.264'
													arrow
													componentsProps={{
														tooltip: { className: classes.toolTip },
														arrow: { className: classes.toolTipArrow }
													}}
													placement='bottom-start'
												>
													<Info
														style={{ cursor: 'pointer', marginLeft: '1rem' }}
													/>
												</Tooltip>
											</div>
										) : (
											<h5>{isEdit ? 'Media File' : 'Add Media File'}</h5>
										)}

										<DragAndDropField
											uploadedFiles={form.uploadedFiles}
											isEdit={isEdit}
											handleDeleteFile={handleDeleteFile}
											setPreviewBool={setPreviewBool}
											setPreviewFile={setPreviewFile}
											isMedia
											videoRef={videoRef}
											onLoadedVideodata={() => {
												setFileWidth(videoRef?.current?.videoWidth);
												setFileHeight(videoRef?.current?.videoHeight);
												setFileDuration(videoRef?.current?.duration);
											}}
											onLoadedAudiodata={() => {
												setFileDuration(videoRef?.current?.duration);
											}}
										/>
										{!form.uploadedFiles.length && (
											<section
												className={[
													classes.dropZoneContainer,
													isError.uploadedFiles
														? classes.errorState
														: classes.noErrorState
												].join(' ')}
												style={{
													borderColor: isError.uploadedFiles
														? '#ff355a'
														: 'yellow'
												}}
											>
												<div {...getRootProps({ className: classes.dropzone })}>
													<input {...getInputProps()} />
													<AddCircleOutlineIcon
														className={classes.addFilesIcon}
													/>
													<p className={classes.dragMsg}>
														Click or drag file to this area to upload
													</p>
													<p className={classes.formatMsg}>
														{form.mainCategory?.name === 'Watch' ||
														specificMedia?.media_type === 'Watch'
															? 'Supported format is mp4'
															: 'Supported format is mp3'}
													</p>
													<p className={classes.uploadMediaError}>
														{isError.uploadedFiles
															? 'You need to upload a media in order to post'
															: ''}
													</p>
												</div>
											</section>
										)}

										<p className={classes.fileRejectionError}>
											{fileRejectionError}
										</p>
										<div className={classes.dropBoxUrlContainer}>
											<h6>DROPBOX URL</h6>
											<TextField
												value={form.media_dropbox_url}
												onChange={(e) =>
													setForm((prev) => {
														return {
															...prev,
															media_dropbox_url: e.target.value
														};
													})
												}
												multiline
												maxRows={2}
												placeholder={'Please drop the dropbox URL here'}
												className={classes.textField}
												InputProps={{
													disableUnderline: true,
													className: classes.textFieldInput,
													style: {
														borderRadius: form.media_dropbox_url
															? '16px'
															: '40px'
													}
												}}
											/>
										</div>

										<h5>{isEdit ? 'Cover Image' : 'Add Cover Image'}</h5>
										<DragAndDropField
											uploadedFiles={form.uploadedCoverImage}
											isEdit={isEdit}
											handleDeleteFile={handleDeleteFile2}
											setPreviewBool={setPreviewBool}
											setPreviewFile={setPreviewFile}
											isArticle
											imgEl={imgRef}
											imageOnload={() => {
												setFileWidth(imgRef.current.naturalWidth);
												setFileHeight(imgRef.current.naturalHeight);
											}}
										/>
										{!form.uploadedCoverImage.length && (
											<section
												className={[
													classes.dropZoneContainer,
													isError.uploadedCoverImage
														? classes.errorState
														: classes.noErrorState
												].join(' ')}
												style={{
													borderColor: isError.uploadedCoverImage
														? '#ff355a'
														: 'yellow'
												}}
											>
												<div
													{...getRootProps2({ className: classes.dropzone })}
												>
													<input {...getInputProps2()} />
													<AddCircleOutlineIcon
														className={classes.addFilesIcon}
													/>
													<p className={classes.dragMsg}>
														Click or drag file to this area to upload
													</p>
													<p className={classes.formatMsg}>
														Supported formats are jpeg, png
													</p>
													<p className={classes.uploadMediaError}>
														{isError.uploadedCoverImage
															? 'You need to upload a cover image in order to post'
															: ''}
													</p>
												</div>
											</section>
										)}

										<p className={classes.fileRejectionError}>
											{fileRejectionError2}
										</p>
										<div className={classes.dropBoxUrlContainer}>
											<h6>DROPBOX URL</h6>
											<TextField
												value={form.image_dropbox_url}
												onChange={(e) =>
													setForm((prev) => {
														return {
															...prev,
															image_dropbox_url: e.target.value
														};
													})
												}
												placeholder={'Please drop the dropbox URL here'}
												className={classes.textField}
												InputProps={{
													disableUnderline: true,
													className: classes.textFieldInput,
													style: {
														borderRadius: form.image_dropbox_url
															? '16px'
															: '40px'
													}
												}}
											/>
										</div>

										<div className={classes.titleContainer}>
											<div className={classes.characterCount}>
												<h6
													className={[
														isError.titleMedia
															? classes.errorState
															: classes.noErrorState
													].join(' ')}
												>
													TITLE
												</h6>
												<h6
													style={{
														color:
															form.title?.length >= 25 &&
															form.title?.length <= 27
																? 'pink'
																: form.title?.length === 28
																? 'red'
																: 'white'
													}}
												>
													{form.title?.length}/28
												</h6>
											</div>
											<TextField
												value={form.title}
												onChange={(e) =>
													setForm((prev) => {
														return {
															...prev,
															title: e.target.value
														};
													})
												}
												placeholder={'Please write your title here'}
												className={classes.textField}
												InputProps={{
													disableUnderline: true,
													className: classes.textFieldInput
												}}
												inputProps={{ maxLength: 28 }}
												multiline
												maxRows={2}
											/>
										</div>
										<p className={classes.mediaError}>
											{isError.titleMedia ? isError.titleMedia.message : ''}
										</p>

										<div className={classes.titleContainer}>
											<h6
												className={[
													isError.selectedLabels
														? classes.errorState
														: classes.noErrorState
												].join(' ')}
											>
												LABELS
											</h6>
											<Labels
												isEdit={isEdit}
												setDisableDropdown={setDisableDropdown}
												LabelsOptions={mediaLabels}
												extraLabel={extraLabel}
												handleChangeExtraLabel={handleChangeExtraLabel}
												selectedLabels={form.labels}
												setSelectedLabels={(newVal) => {
													setForm((prev) => {
														return { ...prev, labels: [...newVal] };
													});
												}}
												draftStatus={status}
											/>
										</div>
										<p className={classes.mediaError}>
											{isError.selectedLabels
												? `You need to add ${
														7 - form.labels.length
												  } more labels in order to upload media`
												: isError.selectedLabelsDraft
												? 'You need to select atleast 1 label to save as draft'
												: ''}
										</p>

										<div className={classes.titleContainer}>
											<h6
												className={[
													isError.description
														? classes.errorState
														: classes.noErrorState
												].join(' ')}
											>
												DESCRIPTION
											</h6>
											<TextField
												value={form.description}
												onChange={(e) =>
													setForm((prev) => {
														return {
															...prev,
															description: e.target.value
														};
													})
												}
												placeholder={'Please write your description here'}
												className={classes.textField}
												InputProps={{
													disableUnderline: true,
													className: classes.textFieldInput,
													style: {
														borderRadius: form.description ? '16px' : '40px'
													}
												}}
												multiline
												maxRows={4}
											/>
										</div>
										<p className={classes.mediaError}>
											{isError.description
												? 'You need to enter a Description'
												: ''}
										</p>
									</>
								) : (
									<></>
								)}
							</div>
							<div className={classes.buttonDiv}>
								{isEdit || (status === 'draft' && isEdit) ? (
									<div className={classes.editBtn}>
										<Button
											disabled={false}
											button2={isEdit ? true : false}
											onClick={() => {
												if (!deleteBtnStatus) {
													deleteMedia(specificMedia?.id, status);
												}
											}}
											text={'DELETE MEDIA'}
										/>
									</div>
								) : (
									<></>
								)}

								<div className={classes.publishDraftDiv}>
									{status === 'draft' || !isEdit ? (
										<div
											className={
												isEdit ? classes.draftBtnEdit : classes.draftBtn
											}
										>
											<Button
												disabledDraft={
													isEdit ? draftBtnDisabled : !validateDraft(form)
												}
												onClick={() => saveDraftBtn()}
												button3={true}
												text={
													status === 'draft' && isEdit
														? 'SAVE DRAFT'
														: 'SAVE AS DRAFT'
												}
											/>
										</div>
									) : (
										<></>
									)}

									<div
										className={
											isEdit ? classes.addMediaBtnEdit : classes.addMediaBtn
										}
									>
										<Button
											disabled={isEdit ? editBtnDisabled : !validateForm(form)}
											onClick={() => addSaveMediaBtn()}
											button2AddSave={true}
											text={buttonText}
										/>
									</div>
								</div>
							</div>
						</div>
						{previewFile != null && (
							<div ref={previewRef} className={classes.previewComponent}>
								<div className={classes.previewHeader}>
									<Close
										onClick={() => {
											setPreviewBool(false);
											setPreviewFile(null);
										}}
										className={classes.closeIcon}
									/>
									<h5>Preview</h5>
								</div>
								<div>
									<img
										src={previewFile.media_url}
										className={classes.previewFile}
										style={{
											width: `100%`,
											height: `${8 * 4}rem`,
											objectFit: 'contain',
											objectPosition: 'center'
										}}
									/>
								</div>
							</div>
						)}
					</div>
				</Slide>
			</LoadingOverlay>
		</Slider>
	);
};

UploadOrEditMedia.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	isEdit: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	heading1: PropTypes.string.isRequired,
	buttonText: PropTypes.string.isRequired,
	page: PropTypes.string,
	status: PropTypes.string.isRequired
};

export default UploadOrEditMedia;
