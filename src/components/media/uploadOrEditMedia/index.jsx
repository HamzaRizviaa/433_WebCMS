/* eslint-disable no-debugger */
import React, { useState, useEffect, useRef } from 'react';
//import classes from './_uploadOrEditMedia.module.scss';
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
import ToggleSwitch from '../../switch';
import completeUplaod from '../../../utils/completeUploadDraft';
//import uploadFileToServer from '../../../utils/uploadFileToServer';
import { getMainCategories } from './../../../pages/MediaLibrary/mediaLibrarySlice';
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
import { useStyles } from './index.style';
import { useStyles as globalUseStyles } from '../../../styles/global.style';
import DeleteModal from '../../DeleteModal';
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
	const [fileRejectionError3, setFileRejectionError3] = useState('');
	const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
	const [previewFile, setPreviewFile] = useState(null);
	const [previewBool, setPreviewBool] = useState(false);
	const [isLoadingUploadMedia, setIsLoadingUploadMedia] = useState(false);
	const [extraLabel, setExtraLabel] = useState('');
	const [disableDropdown, setDisableDropdown] = useState(true);
	const [fileWidth, setFileWidth] = useState(0); // media image
	const [fileHeight, setFileHeight] = useState(0);
	const [fileDuration, setFileDuration] = useState(0);
	const [portraitFileWidth, setPortraitFileWidth] = useState(0); // cover portrait
	const [portraitFileHeight, setPortraitFileHeight] = useState(0);
	const [landscapeFileWidth, setLandscapeFileWidth] = useState(0); // cover landscape
	const [landscapeFileHeight, setLandscapeFileHeight] = useState(0);
	const [editBtnDisabled, setEditBtnDisabled] = useState(false);
	const [draftBtnDisabled, setDraftBtnDisabled] = useState(false);
	const [openDeletePopup, setOpenDeletePopup] = useState(false);
	const [isError, setIsError] = useState({});
	const videoRef = useRef(null);
	const imgRef = useRef(null);
	const previewRef = useRef(null);
	const loadingRef = useRef(null);
	const dialogWrapper = useRef(null);
	const [notifID, setNotifID] = useState('');
	const [form, setForm] = useState({
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
	});

	const classes = useStyles();
	const globalClasses = globalUseStyles();

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
				form.mainCategory?.name === 'Watch' || form.mainCategory === 'Watch'
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
	const toggleDeleteModal = () => {
		setOpenDeletePopup(!openDeletePopup);
	};

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
			setNotifID(specificMedia?.id);
			if (specificMedia?.labels) {
				let _labels = [];
				specificMedia.labels.map((label) => {
					//let labelId = labels.find((l) => l.name === label)?.id;
					return _labels.push({ id: -1, name: label });
				});

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
					media_dropbox_url: specificMedia?.dropbox_url?.media,
					landscape_image_dropbox_url:
						specificMedia?.dropbox_url?.landscape_cover_image,
					image_dropbox_url: specificMedia?.dropbox_url?.portrait_cover_image,
					mainCategory: specificMedia.media_type,
					subCategory: specificMedia.sub_category,
					show_likes: specificMedia?.show_likes,
					show_comments: specificMedia?.show_comments,
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
					uploadedCoverImage: specificMedia?.cover_image?.portrait?.image_url
						? [
								{
									id: makeid(10),
									file_name: specificMedia?.file_name_portrait_image,
									media_url: specificMedia?.cover_image
										? `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificMedia?.cover_image?.portrait?.image_url}`
										: '',
									type: 'image'
								}
						  ]
						: [],
					uploadedLandscapeCoverImage: specificMedia?.cover_image?.landscape
						?.image_url
						? [
								{
									id: makeid(10),
									file_name: specificMedia?.file_name_landscape_image,
									media_url: specificMedia?.cover_image
										? `${process.env.REACT_APP_MEDIA_ENDPOINT}/${specificMedia?.cover_image?.landscape?.image_url}`
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
		// dispatch(getMediaLabels());
		return () => {
			resetState();
		};
	}, []);

	//potrait
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

	//landscape
	const {
		acceptedFiles: acceptedFiles3,
		fileRejections: fileRejections3,
		getRootProps: getRootProps3,
		getInputProps: getInputProps3
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
		} else if (form.mainCategory?.name && isEdit) {
			let setData = mainCategories.find(
				(u) => u.name === form.mainCategory?.name
			);
			updateSubCategories(setData);
		} else {
			let setData = mainCategories.find((u) => u.name === form.mainCategory);
			updateSubCategories(setData);
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

	useEffect(() => {
		if (fileRejections3.length) {
			fileRejections3.forEach(({ errors }) => {
				return errors.forEach((e) => setFileRejectionError3(e.message));
			});
			setTimeout(() => {
				setFileRejectionError3('');
			}, [5000]);
		}
	}, [fileRejections3]);

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

	useEffect(() => {
		if (acceptedFiles3?.length) {
			let newFiles = acceptedFiles3.map((file) => {
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
					uploadedLandscapeCoverImage: [
						...form.uploadedLandscapeCoverImage,
						...newFiles
					]
				};
			});
		}
	}, [acceptedFiles3]);

	const resetState = () => {
		setFileRejectionError2('');
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
		setNotifID('');
		setForm({
			title: '',
			description: '',
			media_dropbox_url: '',
			image_dropbox_url: '',
			mainCategory: '',
			subCategory: '',
			labels: [],
			uploadedFiles: [],
			uploadedCoverImage: [],
			uploadedLandscapeCoverImage: [],
			show_likes: true,
			show_comments: true
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

	const handleDeleteFile3 = (id) => {
		setForm((prev) => {
			return {
				...prev,
				uploadedLandscapeCoverImage: form.uploadedLandscapeCoverImage.filter(
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
			uploadedLandscapeCoverImage: form.uploadedLandscapeCoverImage.length < 1,
			mainCategory: !form.mainCategory,
			subCategory: form?.subCategory?.name
				? !form?.subCategory?.name
				: !form?.subCategory,
			titleMedia: !form.title && { message: 'You need to enter a Title' },
			description: !form.description
		});

		setTimeout(() => {
			setIsError({});
		}, 5000);
	};

	const validateDraftBtn = () => {
		if (isEdit) {
			setIsError({
				draftError: draftBtnDisabled,
				subCategory: form?.subCategory?.name
					? !form?.subCategory?.name
					: !form?.subCategory
			});

			setTimeout(() => {
				setIsError({});
			}, 5000);
		} else {
			setIsError({
				uploadedFiles: form.uploadedFiles.length < 1,
				selectedLabelsDraft: form.labels.length < 1,
				uploadedCoverImage: form.uploadedCoverImage.length < 1,
				uploadedLandscapeCoverImage:
					form.uploadedLandscapeCoverImage.length < 1,
				titleMedia: !form.title && { message: 'You need to enter a Title' },
				description: !form.description,
				mainCategory: !form?.mainCategory,
				subCategory: !form?.subCategory.name
			});

			setTimeout(() => {
				setIsError({});
			}, 5000);
		}
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
						'This item cannot be deleted because it is inside the top banners.'
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
		setOpenDeletePopup(false);
	};

	const handleChangeExtraLabel = (e) => {
		setExtraLabel(e.target.value.toUpperCase());
	};

	const uploadMedia = async (id, payload) => {
		let media_type = form.mainCategory?.id;

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
							labels: [...form.labels],
							dropbox_url: {
								media: form.media_dropbox_url ? form.media_dropbox_url : '',
								portrait_cover_image: form.image_dropbox_url
									? form.image_dropbox_url
									: '',
								landscape_cover_image: form.landscape_image_dropbox_url
									? form.landscape_image_dropbox_url
									: ''
							},

							show_likes: form.show_likes ? true : undefined,
							show_comments: form.show_comments ? true : undefined,
							...payload,

							user_data: {
								id: `${getLocalStorageDetails()?.id}`,
								first_name: `${getLocalStorageDetails()?.first_name}`,
								last_name: `${getLocalStorageDetails()?.last_name}`
							}
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
					!form.uploadedLandscapeCoverImage.length ||
					!form.title ||
					!form.description ||
					form.labels.length < 7 ||
					(specificMedia?.file_name_media ===
						form.uploadedFiles[0]?.file_name &&
						specificMedia?.file_name_portrait_image ===
							form.uploadedCoverImage[0]?.file_name &&
						specificMedia?.file_name_landscape_image ===
							form.uploadedLandscapeCoverImage[0]?.file_name &&
						specificMedia?.dropbox_url?.media ===
							form?.media_dropbox_url?.trim() &&
						specificMedia?.dropbox_url?.portrait_cover_image ===
							form?.image_dropbox_url?.trim() &&
						specificMedia?.dropbox_url?.landscape_cover_image ===
							form?.landscape_image_dropbox_url?.trim() &&
						specificMedia?.title.replace(/\s+/g, '')?.trim() ===
							form?.title?.replace(/\s+/g, '')?.trim() &&
						specificMedia?.description?.replace(/\s+/g, '')?.trim() ===
							form.description?.replace(/\s+/g, '')?.trim() &&
						specificMedia?.show_likes === form.show_likes &&
						specificMedia?.show_comments === form.show_comments)
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
				!validateDraft(form) ||
					!form.subCategory ||
					((specificMedia?.media_url || form?.uploadedFiles[0]
						? specificMedia?.file_name_media ===
						  form?.uploadedFiles[0]?.file_name
						: true) &&
						(specificMedia?.cover_image?.portrait?.image_url ||
						form?.uploadedCoverImage[0]
							? specificMedia?.file_name_portrait_image ===
							  form?.uploadedCoverImage[0]?.file_name
							: true) &&
						(specificMedia?.cover_image?.landscape?.image_url ||
						form?.uploadedLandscapeCoverImage[0]
							? specificMedia?.file_name_landscape_image ===
							  form?.uploadedLandscapeCoverImage[0]?.file_name
							: true) &&
						specificMedia?.media_type ===
							(form?.mainCategory?.name || form?.mainCategory) &&
						specificMedia?.sub_category ===
							(form?.subCategory?.name || form?.subCategory) &&
						specificMedia?.dropbox_url?.media ===
							form?.media_dropbox_url?.trim() &&
						specificMedia?.dropbox_url?.portrait_cover_image ===
							form?.image_dropbox_url?.trim() &&
						specificMedia?.dropbox_url?.landscape_cover_image ===
							form?.landscape_image_dropbox_url?.trim() &&
						specificMedia?.title?.replace(/\s+/g, '')?.trim() ===
							form?.title?.replace(/\s+/g, '')?.trim() &&
						specificMedia?.description?.replace(/\s+/g, '')?.trim() ===
							form?.description?.replace(/\s+/g, '')?.trim() &&
						specificMedia?.labels?.length === form?.labels?.length &&
						!checkDuplicateLabel() &&
						specificMedia?.show_likes === form.show_likes &&
						specificMedia?.show_comments === form.show_comments)
			);
		}
	}, [specificMedia, form]);

	const mainCategoryId = (e) => {
		//find name and will return whole object  isEdit ? subCategory : subCategory.name
		let setData = mainCategories.find((u) => u.name === e);
		setForm((prev) => {
			return { ...prev, mainCategory: setData, subCategory: '' };
		});
	};

	// useEffect(() => {
	// 	// //only empty it when its on new one , not on edit / specific media
	// 	if (!isEdit) {
	// 		// setSubCategory({ id: null, name: '' });
	// 		setForm((prev) => {
	// 			return { ...prev, subCategory: '' };
	// 		});
	// 	}
	// }, [form.mainCategory]);

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

	console.log(
		!validateForm(form),
		editBtnDisabled && status === 'published',
		'SSSSSshoi'
	);

	console.log(form, 'form');

	const addSaveMediaBtn = async () => {
		if (!validateForm(form) || (editBtnDisabled && status === 'published')) {
			validatePostBtn();
		} else {
			setIsLoadingUploadMedia(true);
			loadingRef.current.scrollIntoView({ behavior: 'smooth' });
			if (isEdit) {
				console.log(isEdit);
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
				let media_type = mainCategories.find(
					(u) => u.name === form?.mainCategory
				)?.id;
				let subId =
					subCategories.length &&
					subCategories.find((u) => u.name === form?.subCategory)?.id;

				let uploadFilesPromiseArray = [
					form.uploadedFiles[0], //audio/video
					form.uploadedCoverImage[0], //portrait
					form.uploadedLandscapeCoverImage[0] //landscape
				].map(async (_file) => {
					if (_file.file) {
						return await uploadFileToServer(_file, _file.type);
					} else {
						return _file;
					}
				});

				console.log(uploadFilesPromiseArray, 'uploadFilesPromiseArray');

				Promise.all([...uploadFilesPromiseArray])
					.then(async (mediaFiles) => {
						const completedUpload = mediaFiles.map(async (file, index) => {
							if (file?.signed_response) {
								const newFileUpload = await axios.post(
									`${process.env.REACT_APP_API_ENDPOINT}/media-upload/complete-upload`,
									{
										file_name:
											index === 1
												? form.uploadedCoverImage[0].file_name
												: index === 2
												? form.uploadedLandscapeCoverImage[0]?.file_name
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
								return newFileUpload;
							} else {
								Promise.resolve();
							}
						});

						console.log(completedUpload, 'completedUpload');
						Promise.all([...completedUpload]).then(async (mediaFiles2) => {
							console.log('mediaFiles2', mediaFiles2);
							await uploadMedia(specificMedia?.id, {
								title: form.title,
								description: form.description,
								type: 'medialibrary',
								save_draft: false,
								main_category_id: media_type,
								sub_category_id: subId,
								show_likes: form.show_likes ? true : false,
								show_comments: form.show_comments ? true : false,
								dropbox_url: {
									media: form.media_dropbox_url // audio video
										? form.media_dropbox_url
										: '',
									portrait_cover_image: form.image_dropbox_url //portrait
										? form.image_dropbox_url
										: '',
									landscape_cover_image: form.landscape_image_dropbox_url //landscape
										? form.landscape_image_dropbox_url
										: ''
								},
								...(form.labels.length ? { labels: [...form.labels] } : {}),
								media_url:
									mediaFiles[0]?.keys?.video_key ||
									mediaFiles[0]?.keys?.audio_key,
								// uploadedFile1?.data?.data?.video_data ||
								// uploadedFile1?.data?.data?.audio_data,

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
													...form?.uploadedCoverImage[0],
													image_url:
														form?.uploadedCoverImage[0]?.media_url.split(
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
													...form?.uploadedLandscapeCoverImage[0],
													image_url:
														form?.uploadedLandscapeCoverImage[0]?.media_url.split(
															'cloudfront.net/'
														)[1]
												}
										  })
								},
								file_name_media: form?.uploadedFiles[0]?.file_name,
								file_name_portrait_image:
									form?.uploadedCoverImage[0]?.file_name,
								file_name_landscape_image:
									form?.uploadedLandscapeCoverImage[0]?.file_name
								// data: {
								// 	file_name_media: form.uploadedFiles[0].file_name,
								// 	file_name_image: form.uploadedCoverImage[0].file_name,
								// 	image_data: mediaFiles[1]?.keys?.image_key,
								// 	audio_data: mediaFiles[0]?.keys?.audio_key,
								// 	video_data: mediaFiles[0]?.keys?.video_key,

								// }
							});
						});
					})
					.catch(() => {
						setIsLoadingUploadMedia(false);
					});
			} else {
				// new file to publish
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

				let uploadedFile1;
				let promiseFile1;

				if (form.uploadedFiles[0]) {
					promiseFile1 = await uploadFileToServer(
						form.uploadedFiles[0],
						form.uploadedFiles[0].type
					);
				}

				uploadedFile1 = await axios.post(
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
													promiseFile1?.signed_response?.headers?.etag.replace(
														/['"]+/g,
														''
													),
												part_number: 1
											}
									  ]
									: ['image'],
							keys: {
								image_key: promiseFile1?.keys?.image_key,

								...(form.mainCategory.name === 'Watch' ||
								specificMedia?.media_type === 'Watch'
									? {
											video_key: promiseFile1?.keys?.video_key,
											audio_key: ''
									  }
									: {
											audio_key: promiseFile1?.keys?.audio_key,
											video_key: ''
									  })
							},
							upload_id:
								form.mainCategory?.name === 'Watch' ||
								specificMedia?.media_type === 'Watch'
									? promiseFile1.upload_id
									: 'audio'
						}
					},
					{
						headers: {
							Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
						}
					}
				);

				//portrait
				let promiseFile2;
				let portraitImageData;

				if (form.uploadedCoverImage[0]) {
					promiseFile2 = await uploadFileToServer(
						form.uploadedCoverImage[0],
						form.uploadedCoverImage[0].type
					);
				}
				portraitImageData = await CompleteUploadMedia(
					promiseFile2,
					form.uploadedCoverImage[0]?.file_name
				);

				//landscape
				let promiseFile3;
				let landscapeImageData;

				if (form.uploadedLandscapeCoverImage[0]) {
					promiseFile3 = await uploadFileToServer(
						form.uploadedLandscapeCoverImage[0],
						form.uploadedLandscapeCoverImage[0].type
					);
				}
				landscapeImageData = await CompleteUploadMedia(
					promiseFile3,
					form.uploadedLandscapeCoverImage[0]?.file_name
				);

				await uploadMedia(null, {
					type: 'medialibrary',

					media_url:
						uploadedFile1?.data?.data?.video_data ||
						uploadedFile1?.data?.data?.audio_data,

					cover_image: {
						portrait: {
							width: portraitFileWidth,
							height: portraitFileHeight,
							image_url:
								portraitImageData && portraitImageData?.data?.data?.image_data
						},
						landscape: {
							width: landscapeFileWidth,
							height: landscapeFileHeight,
							image_url:
								landscapeImageData && landscapeImageData?.data?.data?.image_data
						}
					},
					file_name_media: form?.uploadedFiles[0]?.file_name,
					file_name_portrait_image: form?.uploadedCoverImage[0]?.file_name,
					file_name_landscape_image:
						form?.uploadedLandscapeCoverImage[0]?.file_name
				});
			}
		}
	};

	const CompleteUploadMedia = async (mediaFiles, filename) => {
		console.log(mediaFiles, filename, 'filename', 'mediaFiles');
		console.log(
			form.uploadedLandscapeCoverImage[0]?.file_name,
			'form.uploadedLandscapeCoverImage[0]?.file_name'
		);
		let completeUpload = await axios.post(
			`${process.env.REACT_APP_API_ENDPOINT}/media-upload/complete-upload`,
			{
				file_name: filename,
				type: 'medialibrary',
				data: {
					bucket: 'media',
					multipart_upload:
						form.uploadedFiles[0]?.mime_type == 'video/mp4'
							? [
									{
										e_tag: mediaFiles?.signed_response?.headers?.etag.replace(
											/['"]+/g,
											''
										),
										part_number: 1
									}
							  ]
							: ['image'],
					keys: {
						image_key: mediaFiles?.keys?.image_key,

						...(form.mainCategory.name === 'Watch' ||
						specificMedia?.media_type === 'Watch'
							? {
									video_key: mediaFiles?.keys?.video_key,
									audio_key: ''
							  }
							: {
									audio_key: mediaFiles?.keys?.audio_key,
									video_key: ''
							  })
					},
					upload_id: 'image'
				}
			},
			{
				headers: {
					Authorization: `Bearer ${getLocalStorageDetails()?.access_token}`
				}
			}
		);

		return completeUpload;
	};

	const saveDraftBtn = async () => {
		if (!validateDraft(form) || draftBtnDisabled) {
			validateDraftBtn();
		} else {
			setIsLoadingUploadMedia(true);
			loadingRef.current.scrollIntoView({ behavior: 'smooth' });

			if (isEdit) {
				let uploadedFile; // audio / video
				let uploadedCoverImage; //portrait
				let uploadedLandscapeCoverImage; //landscape
				let media_type = mainCategories.find(
					(u) => u.name === form?.mainCategory || form?.mainCategory?.name
				)?.id;
				let subId =
					subCategories.length &&
					subCategories.find(
						(u) => u.name === form?.subCategory || form?.subCategory?.name
					)?.id;

				if (form.uploadedFiles[0] && form?.uploadedFiles[0]?.file) {
					let promiseFile = await uploadFileToServer(
						form.uploadedFiles[0],
						form.uploadedFiles[0].type
					);

					uploadedFile = await completeUplaod(
						form,
						promiseFile,
						'medialibrary'
					);
				}

				if (form.uploadedCoverImage[0] && form.uploadedCoverImage[0]?.file) {
					let promiseFile = await uploadFileToServer(
						form.uploadedCoverImage[0],
						form.uploadedCoverImage[0].type
					);

					uploadedCoverImage = await completeUplaod(
						form,
						promiseFile,
						'medialibrary',
						true
					);
				}

				if (
					form.uploadedLandscapeCoverImage[0] &&
					form.uploadedLandscapeCoverImage[0]?.file
				) {
					let promiseFile = await uploadFileToServer(
						form.uploadedLandscapeCoverImage[0],
						form.uploadedLandscapeCoverImage[0].type
					);

					uploadedLandscapeCoverImage = await completeUplaod(
						form,
						promiseFile,
						'medialibrary',
						true
					);
				}
				await uploadMedia(specificMedia?.id, {
					save_draft: true,
					type: 'medialibrary',
					title: form.title,
					description: form.description,
					main_category_id: media_type,
					sub_category_id: subId,
					dropbox_url: {
						media: form.media_dropbox_url // audio video
							? form.media_dropbox_url
							: '',
						portrait_cover_image: form.image_dropbox_url //portrait
							? form.image_dropbox_url
							: '',
						landscape_cover_image: form.landscape_image_dropbox_url //landscape
							? form.landscape_image_dropbox_url
							: ''
					},

					labels: [...form.labels],
					show_likes: form.show_likes ? true : false,
					show_comments: form.show_comments ? true : false,
					cover_image: {
						...(form?.uploadedCoverImage[0]?.file
							? {
									portrait: {
										width: portraitFileWidth,
										height: portraitFileHeight,
										image_url: uploadedCoverImage?.data?.data?.image_data
									}
							  }
							: {
									portrait: {
										...form?.uploadedCoverImage[0],
										image_url:
											form?.uploadedCoverImage[0]?.media_url.split(
												'cloudfront.net/'
											)[1]
									}
							  }),

						...(form?.uploadedLandscapeCoverImage[0]?.file
							? {
									landscape: {
										width: landscapeFileWidth,
										height: landscapeFileHeight,
										image_url:
											uploadedLandscapeCoverImage?.data?.data?.image_data
									}
							  }
							: {
									landscape: {
										...form?.uploadedLandscapeCoverImage[0],
										image_url:
											form?.uploadedLandscapeCoverImage[0]?.media_url.split(
												'cloudfront.net/'
											)[1]
									}
							  })
					},
					//audio / video
					...(uploadedFile && {
						...uploadedFile?.data?.data,
						media_url:
							uploadedFile?.data?.data?.video_data === null
								? uploadedFile?.data?.data?.audio_data
								: uploadedFile?.data?.data?.video_data
					}),

					//file names
					file_name_media: form?.uploadedFiles[0]?.file_name,
					file_name_portrait_image: form?.uploadedCoverImage[0]?.file_name,
					file_name_landscape_image:
						form?.uploadedLandscapeCoverImage[0]?.file_name

					// data: {
					// 	...(!form.uploadedCoverImage[0] && { image_data: null }),
					// 	...(!form.uploadedFiles[0] && {
					// 		audio_data: null,
					// 		video_data: null
					// 	}),
					// 	...(!form.uploadedLandscapeCoverImage[0] && {
					// 		audio_data: null,
					// 		video_data: null
					// 	}),
					// 	...(uploadedFile &&
					// 		(form?.uploadedFiles[0]?.file || form?.uploadedFiles[0]) && {
					// 			...uploadedFile?.data?.data,
					// 			image_data: uploadedCoverImage?.data?.data?.image_data
					// 		}),

					// ...(uploadedCoverImage && //portrait
					// 	(form?.uploadedCoverImage[0]?.file ||
					// 		form?.uploadedCoverImage[0]) && {
					// 		...uploadedCoverImage?.data?.data,
					// 		audio_data: uploadedFile?.data?.data?.audio_data,
					// 		video_data: uploadedFile?.data?.data?.video_data
					// 	}),

					// 	...(uploadedLandscapeCoverImage && //landscape
					// 		(form?.uploadedLandscapeCoverImage[0]?.file ||
					// 			form?.uploadedCoverImage[0]) && {
					// 			...uploadedLandscapeCoverImage?.data?.data,
					// 			image_data: uploadedLandscapeCoverImage?.data?.data?.image_data
					// 		}),

					// 	file_name_portrait_image: form?.uploadedCoverImage[0]?.file_name,
					// 	file_name_media: form?.uploadedFiles[0]?.file_name,
					// 	file_name_landscape_image:
					// 		form?.uploadedLandscapeCoverImage[0]?.file_name
					// }
				});
			} else {
				//new draft
				let uploadedFile;
				let uploadedCoverImage; //portrait cover
				let uploadedLandscapeCoverImage; //landscape cover

				if (form.uploadedFiles[0]) {
					let promiseFile = await uploadFileToServer(
						form.uploadedFiles[0],
						form.uploadedFiles[0].type
					);

					uploadedFile = await completeUplaod(
						form,
						promiseFile,
						'medialibrary'
					);
				}

				if (form.uploadedCoverImage[0]) {
					let promiseFile = await uploadFileToServer(
						form.uploadedCoverImage[0],
						form.uploadedCoverImage[0].type
					);

					uploadedCoverImage = await completeUplaod(
						form,
						promiseFile,
						'medialibrary',
						true // image/video exists - true
					);
				}

				if (form.uploadedLandscapeCoverImage[0]) {
					let promiseFile = await uploadFileToServer(
						form.uploadedLandscapeCoverImage[0],
						form.uploadedLandscapeCoverImage[0].type
					);

					uploadedLandscapeCoverImage = await completeUplaod(
						form,
						promiseFile,
						'medialibrary',
						true // image/video exists - true
					);
				}

				await uploadMedia(null, {
					save_draft: true,
					type: 'medialibrary',

					...(uploadedFile && {
						...uploadedFile?.data?.data,
						// audio_data: uploadedFile?.data?.data?.audio_data,
						// video_data: uploadedFile?.data?.data?.video_data,
						// image_data: null
						media_url:
							uploadedFile?.data?.data?.video_data === null
								? uploadedFile?.data?.data?.audio_data
								: uploadedFile?.data?.data?.video_data
					}),

					cover_image: {
						portrait: {
							width: portraitFileWidth,
							height: portraitFileHeight,
							image_url:
								uploadedCoverImage && uploadedCoverImage?.data?.data?.image_data
						},
						landscape: {
							width: landscapeFileWidth,
							height: landscapeFileHeight,
							image_url:
								uploadedLandscapeCoverImage &&
								uploadedLandscapeCoverImage?.data?.data?.image_data
						}
					},
					file_name_media: form?.uploadedFiles[0]?.file_name,
					file_name_portrait_image: form?.uploadedCoverImage[0]?.file_name,
					file_name_landscape_image:
						form?.uploadedLandscapeCoverImage[0]?.file_name
					// ...completeUpload?.data?.data
				});
			}
		}
	};

	return (
		<>
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
					if (form.uploadedLandscapeCoverImage.length && !isEdit) {
						form.uploadedLandscapeCoverImage.map((file) =>
							handleDeleteFile3(file.id)
						);
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
				dialogRef={dialogWrapper}
				notifID={notifID}
			>
				<LoadingOverlay
					active={isLoadingUploadMedia}
					spinner={<PrimaryLoader />}
				>
					<Slide in={true} direction='up' {...{ timeout: 400 }}>
						<div
							ref={loadingRef}
							className={`${
								previewFile != null
									? globalClasses.previewContentWrapper
									: globalClasses.contentWrapper
							}`}
						>
							{specificMediaStatus.specificMediaStatus === 'loading' ? (
								<PrimaryLoader />
							) : (
								<></>
							)}
							<div
								className={globalClasses.contentWrapperNoPreview}
								style={{ width: previewFile != null ? '60%' : 'auto' }}
							>
								<div>
									<h5>{heading1}</h5>
									<div className={classes.categoryContainer}>
										<div className={classes.mainCategory}>
											<h6
												className={[
													isError.mainCategory
														? globalClasses.errorState
														: globalClasses.noErrorState
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
												disabled={
													isEdit && status === 'published' ? true : false
												}
												style={{
													backgroundColor:
														isEdit && status === 'published'
															? '#404040'
															: '#000000'
												}}
												value={
													isEdit ? form.mainCategory : form.mainCategory?.name
												}
												onChange={(e) => {
													setDisableDropdown(true);
													mainCategoryId(e.target.value);
													if (form.uploadedFiles.length) {
														form.uploadedFiles.map((file) =>
															handleDeleteFile(file.id)
														);
													}
													if (isEdit) {
														setForm((prev) => {
															return { ...prev, subCategory: '' };
														});
													}
												}}
												className={`${classes.select} ${
													isEdit && status === 'published'
														? `${classes.isEditSelect}`
														: ''
												}`}
												disableUnderline={true}
												IconComponent={(props) => (
													<KeyboardArrowDownIcon
														{...props}
														style={{
															display:
																isEdit && status === 'published'
																	? 'none'
																	: 'block',
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
												renderValue={(value) => {
													return value ? value?.name || value : 'Please Select';
												}}
											>
												{mainCategories.map((category, index) => {
													return (
														<MenuItem key={index} value={category.name}>
															{category.name}
														</MenuItem>
													);
												})}
											</Select>
											<div className={classes.catergoryErrorContainer}>
												<p className={globalClasses.uploadMediaError}>
													{isError.mainCategory
														? 'You need to select main category'
														: ''}
												</p>
											</div>
										</div>
										<div className={classes.subCategory}>
											<h6
												className={[
													isError.subCategory && form.mainCategory
														? globalClasses.errorState
														: globalClasses.noErrorState
												].join(' ')}
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
												disabled={
													!form.mainCategory ||
													(isEdit && status === 'published')
														? true
														: false
												}
												style={{
													backgroundColor:
														isEdit && status === 'published'
															? '#404040'
															: '#000000'
												}}
												value={
													isEdit
														? form.subCategory
														: form.subCategory?.name || form.subCategory
												}
												onChange={(e) => {
													setDisableDropdown(true);
													SubCategoryId(e.target.value);
												}}
												className={`${classes.select} ${
													isEdit && status === 'published'
														? `${classes.isEditSelect}`
														: ''
												}`}
												disableUnderline={true}
												IconComponent={(props) => (
													<KeyboardArrowDownIcon
														{...props}
														style={{
															display:
																isEdit && status === 'published'
																	? 'none'
																	: 'block',
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
												renderValue={
													(value) => {
														return value
															? value?.name || value
															: 'Please Select';
													}
													// value?.length
													// 	? Array.isArray(value)
													// 		? value.join(', ')
													// 		: value?.name || value
													// 	: 'Please Select'
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
											<p className={globalClasses.uploadMediaError}>
												{isEdit && status === 'published'
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
												<div className={globalClasses.explanationWrapper}>
													<h5>{isEdit ? 'Media File' : 'Add Media File'}</h5>
													<Tooltip
														TransitionComponent={Fade}
														TransitionProps={{ timeout: 800 }}
														title='Default encoding for videos should be H.264'
														arrow
														componentsProps={{
															tooltip: { className: globalClasses.toolTip },
															arrow: { className: globalClasses.toolTipArrow }
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
														globalClasses.dropZoneContainer,
														isError.uploadedFiles
															? globalClasses.errorState
															: globalClasses.noErrorState
													].join(' ')}
													style={{
														borderColor: isError.uploadedFiles
															? '#ff355a'
															: 'yellow'
													}}
												>
													<div
														{...getRootProps({
															className: globalClasses.dropzone
														})}
													>
														<input {...getInputProps()} />
														<AddCircleOutlineIcon
															className={globalClasses.addFilesIcon}
														/>
														<p className={globalClasses.dragMsg}>
															Click or drag file to this area to upload
														</p>
														<p className={globalClasses.formatMsg}>
															{form.mainCategory?.name === 'Watch' ||
															form.mainCategory === 'Watch'
																? 'Supported format is mp4'
																: 'Supported format is mp3'}
														</p>
														<p className={globalClasses.uploadMediaError}>
															{isError.uploadedFiles
																? 'You need to upload a media in order to post'
																: ''}
														</p>
													</div>
												</section>
											)}
											<p className={globalClasses.fileRejectionError}>
												{fileRejectionError}
											</p>
											<div className={globalClasses.dropBoxUrlContainer}>
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
													className={globalClasses.textField}
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
											<br />
											<h6 className={classes.PotraitImage}>PORTRAIT IMAGE</h6>
											<DragAndDropField
												uploadedFiles={form.uploadedCoverImage}
												isEdit={isEdit}
												handleDeleteFile={handleDeleteFile2}
												setPreviewBool={setPreviewBool}
												setPreviewFile={setPreviewFile}
												isArticle
												imgEl={imgRef}
												imageOnload={() => {
													setPortraitFileWidth(imgRef.current.naturalWidth);
													setPortraitFileHeight(imgRef.current.naturalHeight);
												}}
											/>
											{!form.uploadedCoverImage.length && (
												<section
													className={[
														globalClasses.dropZoneContainer,
														isError.uploadedCoverImage
															? globalClasses.errorState
															: globalClasses.noErrorState
													].join(' ')}
													style={{
														borderColor: isError.uploadedCoverImage
															? '#ff355a'
															: 'yellow'
													}}
												>
													<div
														{...getRootProps2({
															className: globalClasses.dropzone
														})}
													>
														<input {...getInputProps2()} />
														<AddCircleOutlineIcon
															className={globalClasses.addFilesIcon}
														/>
														<p className={globalClasses.dragMsg}>
															Click or drag file to this area to upload
														</p>
														<p className={globalClasses.formatMsg}>
															Supported formats are <strong>jpeg</strong> and
															<strong> png</strong>.
														</p>
														<p className={globalClasses.formatMsg}>
															Required size <strong>720x900</strong>
														</p>
														<p className={globalClasses.uploadMediaError}>
															{isError.uploadedCoverImage
																? 'You need to upload a cover image in order to post'
																: ''}
														</p>

														<p className={globalClasses.uploadMediaError}>
															{isError.portraitDimensions
																? 'please upload image with proper dimensions'
																: ''}
														</p>
													</div>
												</section>
											)}
											<p className={globalClasses.fileRejectionError}>
												{fileRejectionError2}
											</p>
											<div className={globalClasses.dropBoxUrlContainer}>
												<h6>PORTRAIT DROPBOX URL</h6>
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
													className={globalClasses.textField}
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
											{/* landscape image  */}
											<h6 className={classes.PotraitImage}>LANDSCAPE IMAGE</h6>
											<DragAndDropField
												uploadedFiles={form.uploadedLandscapeCoverImage}
												isEdit={isEdit}
												handleDeleteFile={handleDeleteFile3}
												setPreviewBool={setPreviewBool}
												setPreviewFile={setPreviewFile}
												isArticle
												imgEl={imgRef}
												imageOnload={() => {
													setLandscapeFileWidth(imgRef.current.naturalWidth);
													setLandscapeFileHeight(imgRef.current.naturalHeight);
												}}
											/>
											{/* !form.uploadedLandscapeCoverImage.length && */}
											{!form.uploadedLandscapeCoverImage.length && (
												<section
													className={[
														globalClasses.dropZoneContainer,
														isError.uploadedLandscapeCoverImage
															? globalClasses.errorState
															: globalClasses.noErrorState
													].join(' ')}
													style={{
														borderColor: isError.uploadedLandscapeCoverImage
															? '#ff355a'
															: 'yellow'
													}}
												>
													<div
														{...getRootProps3({
															className: globalClasses.dropzone
														})}
													>
														<input {...getInputProps3()} />
														<AddCircleOutlineIcon
															className={globalClasses.addFilesIcon}
														/>
														<p className={globalClasses.dragMsg}>
															Click or drag file to this area to upload
														</p>
														<p className={globalClasses.formatMsg}>
															Supported formats are <strong>jpeg</strong> and
															<strong> png</strong>.
														</p>
														<p className={globalClasses.formatMsg}>
															Required size <strong>1920x1080</strong>
														</p>
														<p className={globalClasses.uploadMediaError}>
															{isError.uploadedLandscapeCoverImage
																? 'You need to upload a cover image in order to post'
																: ''}
														</p>
													</div>
												</section>
											)}
											<p className={globalClasses.fileRejectionError}>
												{fileRejectionError3}
											</p>
											<div className={globalClasses.dropBoxUrlContainer}>
												<h6>LANDSCAPE DROPBOX URL</h6>
												<TextField
													value={form.landscape_image_dropbox_url}
													onChange={(e) =>
														setForm((prev) => {
															return {
																...prev,
																landscape_image_dropbox_url: e.target.value
															};
														})
													}
													placeholder={'Please drop the dropbox URL here'}
													className={globalClasses.textField}
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
											{/* landscape image  */}
											<div className={classes.titleContainer}>
												<div className={globalClasses.characterCount}>
													<h6
														className={[
															isError.titleMedia
																? globalClasses.errorState
																: globalClasses.noErrorState
														].join(' ')}
													>
														TITLE
													</h6>
													<h6
														style={{
															color:
																form.title?.length >= 38 &&
																form.title?.length <= 42
																	? 'pink'
																	: form.title?.length === 43
																	? 'red'
																	: 'white'
														}}
													>
														{form.title?.length}/43
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
													className={globalClasses.textField}
													InputProps={{
														disableUnderline: true,
														className: classes.textFieldInput
													}}
													inputProps={{ maxLength: 43 }}
													multiline
													maxRows={2}
												/>
											</div>
											<p className={globalClasses.mediaError}>
												{isError.titleMedia ? isError.titleMedia.message : ''}
											</p>
											<div className={classes.titleContainer}>
												<h6
													className={[
														isError.selectedLabels
															? globalClasses.errorState
															: globalClasses.noErrorState
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
													setExtraLabel={setExtraLabel}
												/>
											</div>
											<p className={globalClasses.mediaError}>
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
															? globalClasses.errorState
															: globalClasses.noErrorState
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
													className={globalClasses.textField}
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
											<p className={globalClasses.mediaError}>
												{isError.description
													? 'You need to enter a Description'
													: ''}
											</p>
											<div className={classes.postMediaContainer}>
												<div className={classes.postMediaHeader}>
													<h5>Show comments</h5>
													<ToggleSwitch
														id={1}
														checked={form.show_comments}
														onChange={(checked) =>
															setForm((prev) => {
																return { ...prev, show_comments: checked };
															})
														}
													/>
												</div>
											</div>
											<div
												className={classes.postMediaContainer}
												style={{ marginBottom: '1rem' }}
											>
												<div className={classes.postMediaHeader}>
													<h5>Show likes</h5>
													<ToggleSwitch
														id={2}
														checked={form.show_likes}
														onChange={(checked) =>
															setForm((prev) => {
																return { ...prev, show_likes: checked };
															})
														}
													/>
												</div>
											</div>
										</>
									) : (
										<></>
									)}
								</div>

								<p className={globalClasses.mediaError}>
									{isError.draftError
										? 'Something needs to be changed to save a draft'
										: ''}
								</p>

								<div className={classes.buttonDiv}>
									{isEdit || (status === 'draft' && isEdit) ? (
										<div className={classes.editBtn}>
											<Button
												disabled={false}
												button2={isEdit ? true : false}
												onClick={() => {
													if (!deleteBtnStatus) {
														toggleDeleteModal();
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
												isEdit && validateForm(form)
													? classes.addMediaBtn
													: isEdit
													? classes.addMediaBtnEdit
													: classes.addMediaBtn
											}
										>
											<Button
												disabled={
													isEdit && validateForm(form) && status === 'draft'
														? false
														: isEdit
														? editBtnDisabled
														: !validateForm(form)
												}
												onClick={() => addSaveMediaBtn()}
												button2AddSave={true}
												text={buttonText}
											/>
										</div>
									</div>
								</div>
							</div>
							{previewFile != null && (
								<div
									ref={previewRef}
									className={globalClasses.previewComponent}
								>
									<div className={globalClasses.previewHeader}>
										<Close
											onClick={() => {
												setPreviewBool(false);
												setPreviewFile(null);
											}}
											className={globalClasses.closeIcon}
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
			<DeleteModal
				open={openDeletePopup}
				toggle={toggleDeleteModal}
				deleteBtn={() => {
					deleteMedia(specificMedia?.id, status);
				}}
				text={'Media'}
				wrapperRef={dialogWrapper}
			/>
		</>
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
